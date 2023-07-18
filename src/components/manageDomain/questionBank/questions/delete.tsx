import MenuItem from "@mui/material/MenuItem";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "@src/components/shared/confirmationModal";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/utils/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";

interface Props {
  id?: string | any;
  centreId: string;
  questionBankId: string;
  refetch: Function;
}

const DeleteCentre = ({ id, centreId, questionBankId, refetch }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${centreId}/question-bank/${questionBankId}/question/${id}`,
        method: "DELETE",
      });
      toggleToast(data.message);
      refetch();
      closeDialog();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem onClick={() => openDialog()} disableRipple>
        <DeleteOutline />
        Delete Question Bank
      </MenuItem>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this question will no longer exist. Are you sure you want to delete this question?"
      />
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default DeleteCentre;
