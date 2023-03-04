import AddCardIcon from "@mui/icons-material/AddCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";

import { useState } from "react";
import { handleError, isServerSide, request } from "@src/utils";
import { useDialog } from "@src/hooks";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import dynamic from "next/dynamic";
import ButtonComponent from "@src/components/shared/button";
import useForm from "@src/hooks/useForm";
import { CurrencyType } from "./interface";

const CreditWallet = ({
  itemId,
  toggleToast,
}: {
  itemId: string;
  toggleToast: Function;
}) => {
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const [isLoading, setIsLoading] = useState(false);
  const { values, getData, submit } = useForm(CreditWallet);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const router = useRouter();

  async function CreditWallet() {
    setIsLoading(true);
    router.push({
      pathname: "/payment",
      query: {
        amount: values.amount,
        redirectUrl: isServerSide ? "" : window.location.href,
        currency: "NGN",
        purpose: "FUND_WALLET",
        paymentMethod: "CARD",
        itemId,
        transactionkey: uuid(),
      },
    });
  }
  async function getSupportedCurrency() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: "/wallet/supported-currencies",
      });
      setCurrencies([...(data as CurrencyType[])]);
      setIsLoading(false);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <ButtonComponent
        sx={{
          border: "solid 1px #dbdbdb ",
          color: "#fff",
          paddingY: 1.8,
          paddingX: 3,
          mb: { xs: 3, md: 0 },
        }}
        onClick={() => {
          getSupportedCurrency();
        }}
      >
        <>
          <AddCardIcon />
          <Typography
            variant="h5"
            component="p"
            style={{ color: "#fff", marginLeft: 10, fontSize: 16 }}
          >
            Credit Wallet
          </Typography>
        </>
      </ButtonComponent>
      <Dialog
        title="Credit wallet "
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Kindly enter amount to be credited"
        content={
          <Box>
            <form onSubmit={(e) => submit(e)}>
              <Select
                name="currency"
                value={values.currency || "none"}
                onChange={(e) => getData(e)}
                sx={{ width: "100%", mt: 3 }}
                required
              >
                <MenuItem value="none">Select currency</MenuItem>
                {currencies.map(({ abbr, name }, index) => (
                  <MenuItem key={index} value={abbr}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <TextFields
                type="number"
                label="Amount"
                name="amount"
                onChange={getData}
                sx={{ width: "100%", marginTop: 3 }}
                required
              />
              <div style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit">
                  <>
                    Credit wallet{" "}
                    {isLoading && <Loading sx={{ ml: 1 }} size={15} />}
                  </>
                </ButtonComponent>
                <ButtonComponent onClick={() => closeDialog()}>
                  Cancel
                </ButtonComponent>
              </div>
            </form>
          </Box>
        }
      />
    </>
  );
};

export default CreditWallet;
