import React, { useState } from "react";
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
import { postContent } from "@src/utils";
import Loading from "@src/components/shared/loading";
// import Toast from "../../common/toast";
import { v4 as uuid } from "uuid";

// interface Props {
//   amount: number | string;
//   redirectUrl: string;
//   purpose: string;
//   itemId: string;
//   currency: string;
// }

export default function Payment(): JSX.Element {
  const [cards, setCards] = useState(data);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(cards[0].type);
  const {
    amount,
    purpose,
    itemId,
    currency: incomingCurrency,
    redirectUrl,
  } = router.query;
  const [currency, setCurrency] = React.useState(incomingCurrency);
  const amountToInt: any = amount;
  const styles = useStyles();

  const motto = (motto) => (
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
      {motto}
    </Typography>
  );

  const handleChange = (event) => {
    setCurrency(event.target.value);
    cards.map((item) => {
      item.active = false;
      if (item.currency == event.target.value) {
        item.active = true;
        setType(item.type);
      }
    });
    setCards([...cards]);
  };

  const selectedCard = (index, currency) => {
    cards.map((item) => (item.active = false));
    cards[index].active = true;
    setCards([...cards]);
    setType(cards[index].type);
    setCurrency(currency);
  };

  async function makePayment() {
    const paymentData = {
      amount: parseInt(amountToInt) * 100,
      paymentMethod: type,
      currency,
      redirectUrl: redirectUrl,
      purpose,
      itemId,
    };
    try {
      setIsLoading(true);
      const { data } = await postContent({
        url: "/transaction",
        data: paymentData,
        headers: { transactionkey: uuid() },
      });
      router.push(data.redirectUrl);
      setIsLoading(false);
    } catch ({ message }) {
      setMessage(message);
      setIsLoading(false);
    }
  }

  return (
    <Container className={styles.container}>
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
              <Typography variant="h5" component="p" className={styles.choose}>
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
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: {
                      notchedOutline: styles.input,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Pay with Naira</em>
                  </MenuItem>
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
                amount of transaction"
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <Grid container spacing={4}>
              {cards.map((item, index) =>
                item.type === "transfer" ? (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="p"
                        style={{
                          fontWeight: 700,
                          fontSize: 18,
                          fontStyle: "normal",
                          fontFamily: "Open Sans",
                          color: "#000000",
                        }}
                      >
                        Want to do a transfer instead?
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{
                          marginBottom: 40,
                          fontWeight: 400,
                          fontSize: 12,
                          fontStyle: "normal",
                          fontFamily: "Open Sans",
                          color: "#000000",
                        }}
                      >
                        (Transfer is only vailable for Naira payment.)
                      </Typography>

                      <div
                        onClick={() => selectedCard(index, item.currency)}
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
                              right: -12,
                              top: -12,
                            }}
                          />
                        )}
                        <Card
                          contentClass={styles.tansferContentClass}
                          className={`${styles.general} ${
                            styles.transferCardHeight
                          } ${
                            item.active ? styles.activeCard : styles.inActive
                          }`}
                          key={index}
                          item={item}
                        />
                        {motto(item.motto)}
                      </div>
                    </div>
                  </Grid>
                ) : (
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
                          right: 0,
                          top: 7,
                        }}
                      />
                    )}
                    <Card
                      contentClass={styles.contentClass}
                      className={`${styles.general} ${styles.cardHeight} ${
                        item.active ? styles.activeCard : styles.inActive
                      } `}
                      key={index}
                      item={item}
                    />
                    {motto(item.motto)}
                  </Grid>
                )
              )}
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
              <>Continue {isLoading && <Loading />}</>
            </Button>
          </div>
        </div>

        {/* {message && <Toast message={message} />} */}
      </Paper>
    </Container>
  );
}
