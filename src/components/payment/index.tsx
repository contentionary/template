import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
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
import { currencies, data } from "./data";
import { handleError, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import Toast from "@src/components/shared/toast";
import { v4 as uuid } from "uuid";
import { useToast } from "@src/utils/hooks";
import { Currency, PaymentMethod } from "./interface";
import Loader from "@src/components/shared/loading/loadingWithValue";

export default function Payment(): JSX.Element {
  const router = useRouter();
  const styles = useStyles();
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const {
    amount: price,
    purpose,
    itemId,
    currency: incomingCurrency,
    redirectUrl,
  } = router.query;
  const [currency, setCurrency] = useState<Currency>(
    incomingCurrency as Currency
  );
  const [amount, setAmount] = useState<number>(Number(price));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CARD
  );

  const makePayment = async () => {
    try {
      const paymentData = {
        amount: amount * 100,
        paymentMethod,
        currency,
        redirectUrl: redirectUrl,
        purpose,
        itemId,
      };
      setIsLoading(true);
      const { data } = await request.post({
        url: "/transaction",
        data: paymentData,
        headers: { transactionkey: uuid() },
      });
      router.push(data.redirect ? data.redirectUrl : redirectUrl);
    } catch (err) {
      toggleToast(handleError(err).message);
      setIsLoading(false);
    }
  };

  const freePayment = useCallback(makePayment, [
    amount,
    paymentMethod,
    currency,
    redirectUrl,
    purpose,
    itemId,
    router,
    toggleToast,
  ]);

  useEffect(() => {
    if (amount === 0) {
      freePayment();
    } else {
      const paymentGateways = data.filter(
        (item) => item.currency === currency || item.currency === "*"
      );
      setCards([...paymentGateways]);
    }
  }, [currency, amount, freePayment]);

  const currencyConverter = async (newCurrency: Currency) => {
    try {
      const { data } = await request.get({
        url: `/wallet/convert-currency?fromCurrency=${incomingCurrency}&toCurrency=${newCurrency}&amount=${price}`,
      });

      setAmount(data.amount);
    } catch (err) {
      toggleToast(handleError(err).message);
    }
  };

  const handleChange = (newCurrency: Currency) => {
    currencyConverter(newCurrency);
    setCurrency(newCurrency);
  };

  const selectedCard = (index: number) => {
    cards.map((item) => (item.active = false));
    cards[index].active = true;
    setCards([...cards]);
    setPaymentMethod(cards[index].method);
  };

  return (
    <Container className={styles.container}>
      {amount === 0 ? (
        <Loader size={100} open={true} value={10} />
      ) : (
        <Paper className={styles.paper}>
          <div
            style={{
              textAlign: "center",
              padding: "25px 20px",
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              component="p"
              className={styles.price}
            >
              Complete transaction of {currency + " " + amount}
            </Typography>
          </div>
          <Divider style={{ borderTop: "2px solid #CCCCCC" }} />
          <div className={styles.contentContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                paddingTop: 20,
              }}
            >
              <div>
                <Typography
                  variant="h5"
                  component="p"
                  className={styles.choose}
                >
                  Choose your best payment method below
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="p"
                  className={styles.clickOption}
                >
                  <i>(Click one of the options below)</i>
                </Typography>
              </div>
              <div style={{ maxWidth: 307 }}>
                <div style={{ display: "flex" }}>
                  <span className={styles.inputIcon}>
                    <Language style={{}} />
                  </span>
                  <TextField
                    className={styles.select}
                    id="outlined-select-currency"
                    select
                    label="Pay with Naira"
                    value={currency}
                    onChange={(e) => handleChange(e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      classes: {
                        notchedOutline: styles.input,
                      },
                    }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
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
                  Select your preferred currency (Naira or dollar) to change the
                  amount of transaction
                </Typography>
              </div>
            </div>
            <div style={{ marginTop: 40 }}>
              <Grid container spacing={4}>
                {cards.map((item, index) => (
                  <Grid
                    key={index}
                    onClick={() => selectedCard(index, item.currency)}
                    item
                    xs={12}
                    md={4}
                    style={{
                      position: "relative",
                    }}
                  >
                    {item.active && (
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
                      className={`${styles.general} ${styles.cardHeight} ${
                        item.active ? styles.activeCard : styles.inActive
                      } `}
                      key={index}
                      {...item}
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
                      {item.motto}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>

            <Divider
              style={{
                marginTop: 30,
                borderTop: "2px solid #BDBDBD",
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
                Click the button below to redirect you to the payment gateway to
                complete with your transaction
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
                    <Loading sx={{ color: "#fff", marginLeft: 1 }} size={10} />
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
      )}
    </Container>
  );
}
