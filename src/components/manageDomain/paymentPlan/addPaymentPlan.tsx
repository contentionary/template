import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/utils/hooks/useForm";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDialog } from "@src/utils/hooks";
import { handleError, queryClient, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";
import { CurrencyType } from "@src/components/wallet/interface";

const AddSubscriber = ({
  toggleToast,
  productId,
  refetch,
}: {
  toggleToast: Function;
  refetch: Function;
  productId: string;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${cachedData.centre.id}/product/${productId}/pricing`,
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
      <ButtonComponent
        variant="contained"
        onClick={() => getSupportedCurrency()}
        sx={{ fontSize: 18 }}
      >
        <>
          <AddCircleOutlineOutlined /> &nbsp; Add Payment Plan
        </>
      </ButtonComponent>

      <Dialog
        title="Add Payment Plan"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="Name"
                name="name"
                onChange={getData}
                required
              />
              <TextFields
                type="number"
                label="Amount"
                name="amount"
                onChange={getData}
                required
              />
              <TextFields
                type="number"
                label="Duration In Days"
                name="durationInDays"
                onChange={getData}
                required
              />{" "}
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
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Add Payment Plan
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

export default AddSubscriber;
