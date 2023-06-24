import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditOutlined from "@mui/icons-material/EditOutlined";
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

const UpdatePortfolio = ({
  toggleToast,
  setPortfolio,
  centreId,
  portfolios,
  index,
  portfolio,
}: {
  toggleToast: Function;
  setPortfolio: Function;
  centreId: string;
  portfolios: PortfolioInt[];
  index: number;
  portfolio: PortfolioInt;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const { data } = await request.patch({
        url: `/centre/${centreId}/portfolio/${portfolio.id}`,
        data: values,
      });
      portfolios.splice(index, 1, data as PortfolioInt);
      setPortfolio([...portfolios]);
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
      <IconButton onClick={() => openDialog()}>
        <>
          <EditOutlined /> &nbsp;
        </>
      </IconButton>

      <Dialog
        title="Update Portfolio"
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
                defaultValue={portfolio.title}
                onChange={getData}
                required
              />
              <div style={{ width: "100%" }}>
                <Typography variant="subtitle1" component="div">
                  description
                </Typography>
                <TextArea
                  name="description"
                  defaultValue={portfolio.description}
                  maxRows={3}
                  maxLength={350}
                  onChange={getData}
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
                    Update
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

export default UpdatePortfolio;
