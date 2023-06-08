import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useStyles } from "./style";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Language from "@mui/icons-material/Language";
import Card from "./card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@src/components/shared/button";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { handleError, isServerSide, queryClient, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";
import { Currency } from "./interface";
import Loader from "@src/components/shared/loading/loadingWithValue";
import { BasePageProps } from "@src/utils/interface";

export default function Payment(): JSX.Element {
  const router = useRouter();
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isConvertingCurrency, setIsConvertingCurrency] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const {
    purpose,
    itemId,
    currency: incomingCurrency,
    redirectUrl: resourceRedirectUrl,
    transactionkey,
    amount: price,
    metaData,
  } = router.query;
  const [currency, setCurrency] = useState<Currency>(
    incomingCurrency as Currency
  );
  const [amount, setAmount] = useState<number>(Number(price));
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "WALLET">("CARD");
  const [confirmedPrice, setConfirmedPrice] = useState<boolean | number>(false);
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [paymentPlan, setPaymentPlan] = useState(pageData.paymentPlan);
  const [pricingId, setPricingId] = useState();
  const primary = cachedData?.centre?.primaryColor || "#DD6E20";

  const preTransactionDetails = useCallback(async () => {
    try {
      let standardAmount = 0;
      if (purpose === "FUND_WALLET") {
        standardAmount = parseInt(router.query.amount as string);
      } else {
        const payLoad = {
          itemId,
          purpose,
          currency,
        } as {
          itemId: string;
          purpose: string;
          currency: string;
          metaData?: Record<string, string>;
        };
        if (pricingId) payLoad.metaData = { pricingId };
        const { data } = await request.post({
          url: "/transaction/pre-details",
          data: payLoad,
        });
        standardAmount = data.amount / 100;
      }
      setAmount(standardAmount);
      setConfirmedPrice(standardAmount);
    } catch (err) {}
  }, [itemId, purpose, pricingId]);

  const makePayment = async () => {
    try {
      const redirectUrl = `${resourceRedirectUrl}?verifyValue=true&price=${amount}`;
      const paymentData: any = {
        amount: parseInt((amount * 100).toFixed(0)),
        paymentMethod,
        currency,
        redirectUrl,
        purpose,
        itemId,
      };
      if (metaData) {
        paymentData.metaData = JSON.parse(metaData as string);
        if (pricingId) {
          paymentData.metaData.pricingId = pricingId;
        }
      }
      if (pricingId && !metaData) {
        paymentData.metaData = { pricingId };
      }
      setIsLoading(true);
      const { data } = await request.post({
        url: "/transaction",
        data: paymentData,
        headers: { transactionkey },
      });
      if (!isServerSide) {
        window.location.href = data.redirect ? data.redirectUrl : redirectUrl;
      }
    } catch (err) {
      toggleToast(handleError(err).message);
      setIsLoading(false);
    }
  };
  const freePayment = useCallback(makePayment, [
    amount,
    paymentMethod,
    currency,
    purpose,
    itemId,
    // toggleToast,
    resourceRedirectUrl,
    transactionkey,
    metaData,
  ]);

  useEffect(() => {
    if (router.isReady) {
      if (typeof confirmedPrice === "number") {
        if (amount === 0) {
          freePayment();
        }
      } else {
        for (let i = 0; i < pageData.paymentPlan.length; i++) {
          if (pageData.paymentPlan[i].isDefault) {
            setPricingId(pageData.paymentPlan[i].id);
          }
        }
        preTransactionDetails();
      }
    }
  }, [
    currency,
    amount,
    router.isReady,
    freePayment,
    preTransactionDetails,
    confirmedPrice,
  ]);

  const currencyConverter = async (newCurrency: Currency) => {
    try {
      setIsConvertingCurrency(true);
      const { data } = await request.get({
        url: `/wallet/convert-currency?fromCurrency=${incomingCurrency}&toCurrency=${newCurrency}&amount=${confirmedPrice}`,
      });

      setAmount(data.amount);
      setIsConvertingCurrency(false);
    } catch (err) {
      setIsConvertingCurrency(false);
      toggleToast(handleError(err).message);
    }
  };

  const handleChange = (newCurrency: Currency) => {
    currencyConverter(newCurrency);
    setCurrency(newCurrency);
  };
  return (
    <Container className={styles.container}>
      {amount === 0 ? (
        <Loader size={100} open={true} value={10} />
      ) : (
        <>
          {paymentPlan.length > 0 && (
            <>
              <Stack spacing={2} direction="row">
                <Avatar sx={{ background: primary }}>1</Avatar>
                <Stack>
                  <Typography variant="h6">
                    Complete your Payment Plan
                  </Typography>
                  <Typography variant="body2">
                    Select Anually to allow plan active for 1 year
                  </Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  my: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {paymentPlan.map(
                  (
                    {
                      name,
                      amount,
                      isDefault,
                      symbol,
                    }: {
                      name: string;
                      amount: number;
                      isDefault: boolean;
                      symbol: string;
                    },
                    index: number
                  ) => (
                    <Paper
                      key={index}
                      onClick={() => {
                        paymentPlan.map(
                          (plan: { isDefault: boolean }) =>
                            (plan.isDefault = false)
                        );
                        paymentPlan[index].isDefault = true;
                        setPaymentPlan([...paymentPlan]);
                        setPricingId(paymentPlan[index].id);
                      }}
                      className={styles.paymentPlanCard}
                      sx={{
                        borderBottom: isDefault ? `solid 4px ${primary}` : "",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body2">
                          Pay {symbol}
                          {amount} / {name}
                        </Typography>
                      </Box>
                    </Paper>
                  )
                )}
              </Box>
            </>
          )}
          <Stack spacing={2} direction="row" mt={5}>
            <Avatar sx={{ background: primary }}>
              {paymentPlan.length ? 2 : 1}
            </Avatar>
            <Stack>
              <Typography variant="h6">Payment</Typography>
              <Typography variant="body2">
                Choose your best payment method below
              </Typography>
            </Stack>
          </Stack>
          <Paper className={styles.paper}>
            <div
              style={{
                textAlign: "center",
                padding: "25px 20px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                component="p"
                className={styles.price}
              >
                Complete transaction of {currency}{" "}
                {isConvertingCurrency ? <Loading size={10} /> : amount}
              </Typography>
            </div>
            <div className={styles.contentContainer}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  paddingTop: 20,
                }}
              >
                <div style={{ maxWidth: 307 }}>
                  <div style={{ display: "flex" }}>
                    <span className={styles.inputIcon}>
                      <Language style={{}} />
                    </span>
                    <TextField
                      className={styles.select}
                      id="outlined-select-currency"
                      select
                      label={`Pay with ${currency}`}
                      value={currency}
                      onChange={(e) => handleChange(e.target.value as Currency)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        classes: {
                          notchedOutline: styles.input,
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Currency</em>
                      </MenuItem>
                      {pageData.currencySupported.map(
                        ({ name, abbr }: { name: string; abbr: string }) => (
                          <MenuItem key={name} value={abbr}>
                            {name}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </div>
                  <Typography
                    variant="body2"
                    component="span"
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontFamily: "Open Sans",
                      fontSize: 10,
                      fontStyle: "normal",
                      lineHeight: 1,
                    }}
                  >
                    Select your preferred currency (Naira or dollar) to change
                    the amount of transaction
                  </Typography>
                </div>
              </div>
              <div style={{ marginTop: 40 }}>
                <Grid container spacing={4}>
                  {pageData.currencySupported.map(
                    ({
                      abbr,
                      paymentService,
                    }: {
                      abbr: string;
                      paymentService: { CARD: []; WALLET: string };
                    }) =>
                      abbr === currency && (
                        <>
                          {paymentService.CARD.map(
                            (
                              {
                                processor,
                                logo,
                              }: { processor: string; logo: string },
                              index
                            ) => (
                              <Grid
                                key={index}
                                onClick={() => setPaymentMethod("CARD")}
                                item
                                xs={12}
                                md={4}
                                style={{
                                  position: "relative",
                                }}
                              >
                                {paymentMethod === "CARD" && (
                                  <CheckCircle
                                    fontSize="large"
                                    color="primary"
                                    style={{
                                      position: "absolute",
                                      right: -7,
                                      top: 10,
                                    }}
                                  />
                                )}
                                <Card
                                  contentClass={styles.contentClass}
                                  className={`${styles.general} ${
                                    styles.cardHeight
                                  } 
                            ${
                              paymentMethod === "CARD"
                                ? styles.activeCard
                                : styles.inActive
                            } 
                            `}
                                  key={index}
                                  processor={processor}
                                  logo={logo}
                                />
                                <Typography
                                  style={{
                                    textAlign: "center",
                                    color: "#555555",
                                    marginTop: 10,
                                    fontWeight: 400,
                                    fontSize: 14,
                                    fontStyle: "normal",
                                    fontFamily: "Open Sans",
                                  }}
                                  variant="subtitle1"
                                  component="div"
                                >
                                  Secured by {processor}
                                </Typography>
                              </Grid>
                            )
                          )}
                          {paymentService.WALLET && purpose != "FUND_WALLET" && (
                            <Grid
                              onClick={() => setPaymentMethod("WALLET")}
                              item
                              xs={12}
                              md={4}
                              style={{
                                position: "relative",
                              }}
                            >
                              {paymentMethod === "WALLET" && (
                                <CheckCircle
                                  fontSize="large"
                                  color="primary"
                                  style={{
                                    position: "absolute",
                                    right: -7,
                                    top: 10,
                                  }}
                                />
                              )}
                              <Card
                                contentClass={styles.contentClass}
                                className={`${styles.general} ${
                                  styles.cardHeight
                                } 
                            ${
                              paymentMethod === "WALLET"
                                ? styles.activeCard
                                : styles.inActive
                            } 
                            `}
                                processor={paymentService.WALLET}
                              />
                              <Typography
                                style={{
                                  textAlign: "center",
                                  color: "#555555",
                                  marginTop: 10,
                                  fontWeight: 400,
                                  fontSize: 14,
                                  fontStyle: "normal",
                                  fontFamily: "Open Sans",
                                }}
                                variant="subtitle1"
                                component="div"
                              >
                                Secured by {paymentService.WALLET}
                              </Typography>
                            </Grid>
                          )}
                        </>
                      )
                  )}
                </Grid>
              </div>

              <Divider
                style={{
                  marginTop: 30,
                  borderTop: "1px solid #f0f0f0",
                }}
              />
              <div style={{ textAlign: "center", marginTop: 30 }}>
                <Typography
                  variant="subtitle2"
                  component="p"
                  style={{
                    marginBottom: 40,
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    color: "#000000",
                  }}
                >
                  Click the button below to redirect you to the payment gateway
                  to complete with your transaction
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={makePayment}
                  size="large"
                  sx={{ width: 176, height: 50 }}
                >
                  <>
                    Continue
                    {isLoading && (
                      <Loading
                        sx={{ color: "#fff", marginLeft: 1 }}
                        size={10}
                      />
                    )}
                  </>
                </Button>
              </div>
            </div>

            {toastMessage && (
              <Toast
                message={toastMessage}
                status={Boolean(toastMessage)}
                showToast={toggleToast}
              />
            )}
          </Paper>
        </>
      )}
    </Container>
  );
}
