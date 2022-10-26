import ShareOutlined from "@mui/icons-material/ShareOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";

import { useDialog } from "@src/hooks";
import { handleError, queryClient, request } from "@src/utils";
import { useState } from "react";
import { useToast } from "@src/utils/hooks";

import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import ButtonComponent from "@src/components/shared/button";
import useForm from "@src/hooks/useForm";
import { BasePageProps } from "@src/utils/interface";

interface Props {
  questionBankId: string;
}

const ShareCentreLink = ({ questionBankId }: Props) => {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { values, getData, submit } = useForm(share);
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function share() {
    try {
      setIsLoading(true);
      await request.post({
        url: `/centre/${cachedData.centre.id}/question-bank/${questionBankId}/share`,
        data: values,
      });
      toggleToast("Share successful");
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <IconButton
        onClick={() => openDialog()}
        sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 5 }}
      >
        <ShareOutlined fontSize="small" />
      </IconButton>

      <Dialog
        title="Share question bank and it's content "
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Kindly entre the receiver's id"
        content={
          <Box>
            <form onSubmit={(e) => submit(e)}>
              <TextFields
                type="text"
                label="Receiver Centre Id"
                sx={{ width: "100%", marginTop: 3 }}
                name="receiverCentreId"
                onChange={getData}
                required
              />
              <Typography component="div" sx={{ textAlign: "right", mt: 2 }}>
                <ButtonComponent type="submit">
                  <>Share &nbsp; {isLoading && <Loading size={15} />}</>
                </ButtonComponent>
                <ButtonComponent onClick={() => closeDialog}>
                  Cancel
                </ButtonComponent>
              </Typography>
            </form>
          </Box>
        }
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toastMessage)}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default ShareCentreLink;
