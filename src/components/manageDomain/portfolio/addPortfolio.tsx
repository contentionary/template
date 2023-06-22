import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import TextArea from "@src/components/shared/textArea";
import { PortfolioInt } from "@src/utils/interface";

const AddPortfolio = ({
  toggleToast,
  setPortfolio,
  centreId,
  portfolios,
}: {
  toggleToast: Function;
  setPortfolio: Function;
  centreId: string;
  portfolios: PortfolioInt[];
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const { data } = await request.post({
        url: `/centre/${centreId}/portfolio`,
        data: values,
      });
      setPortfolio([data, ...portfolios]);
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ButtonComponent
        variant="contained"
        onClick={() => openDialog()}
        sx={{ fontSize: 18 }}
      >
        <>
          <AddCircleOutlineOutlined /> &nbsp; Add Portfolio
        </>
      </ButtonComponent>

      <Dialog
        title="Add New Portfolio"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <Typography variant="h5" component="div">
                Add Portfolio
              </Typography>
              <TextFields
                type="text"
                label="Title"
                name="title"
                onChange={getData}
                required
              />
              <div style={{ width: "100%" }}>
                <Typography variant="subtitle1" component="div">
                  description (not more than 350 letters)
                </Typography>
                <TextArea
                  name="description"
                  maxRows={3}
                  maxLength={350}
                  onChange={getData}
                  required
                  style={{
                    padding: "20px 10px",
                    borderRadius: 5,
                    height: 120,
                    width: "100%",
                  }}
                />
              </div>

              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Add
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

export default AddPortfolio;
