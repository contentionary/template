import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { CurrencyType } from "@src/components/wallet/interface";

const UpdatePaymentPlan = ({
  toggleToast,
  refetch,
  amount,
  name,
  productId,
  id,
  centreId,
  durationInDays,
  currency,
}: {
  toggleToast: Function;
  refetch: Function;
  amount: string;
  name: string;
  productId: string;
  id: string;
  centreId: string;
  durationInDays: number;
  currency: string;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.patch({
        url: `/centre/${centreId}/product/${productId}/pricing/${id}`,
        data: values,
      });
      refetch();
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
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
      <MenuItem onClick={() => getSupportedCurrency()} sx={{ fontSize: 18 }}>
        Update
      </MenuItem>

      <Dialog
        title="Update Payment Plan"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="Name"
                name="name"
                defaultValue={name}
                onChange={getData}
              />
              <TextFields
                type="number"
                label="Amount"
                name="amount"
                defaultValue={amount}
                onChange={getData}
              />
              <TextFields
                type="number"
                label="Duration In Days"
                name="durationInDays"
                defaultValue={durationInDays}
                onChange={getData}
                required
              />
              <Select
                name="currency"
                value={values.currency || currency}
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
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Update Payment Plan
                    {isLoading && <Loading size={15} />}
                  </>
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => closeDialog()}
                  sx={{ fontSize: 18 }}
                >
                  Cancel
                </ButtonComponent>
              </Typography>
            </Stack>
          </form>
        }
      />
    </>
  );
};

export default UpdatePaymentPlan;
