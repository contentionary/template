import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "@src/components/shared/confirmationModal";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  id: string;
  centreId: string;
}

const DeleteCentre = ({ id, centreId }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const router = useRouter();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(
        `/centre/${centreId}/publication/${id}`
      );
      toggleToast(data.message);
      closeDialog();
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <IconButton onClick={() => openDialog()}>
        <DeleteOutline htmlColor="red" />
      </IconButton>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this publication will no longer exist. Are you sure you want to delete this publication?"
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
