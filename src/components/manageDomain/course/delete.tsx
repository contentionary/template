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
  refetch?: Function;
}

const DeleteCentre = ({ id, centreId, refetch }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const router = useRouter();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(`/centre/${centreId}/course/${id}`);
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
      refetch ? refetch() : router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem
        onClick={() => openDialog()}
        disableRipple
        sx={{ color: "red" }}
      >
        <DeleteOutline style={{ color: "red" }} />
        Delete
      </MenuItem>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this course will no longer exist. Are you sure you want to delete this course?"
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
