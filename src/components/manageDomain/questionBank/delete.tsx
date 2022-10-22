import MenuItem from "@mui/material/MenuItem";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "@src/components/shared/confirmationModal";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  id?: string | any;
  centreId: string;
}

const DeleteCentre = ({ centreId, id }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const router = useRouter();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(
        `/centre/${centreId}/question-bank/${id}`
      );
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem onClick={() => openDialog()} disableRipple>
        <DeleteOutline />
        Delete
      </MenuItem>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this will no longer exist. Are you sure you want to delete this?"
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
