import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
}

const DeleteCentre = ({ id }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const router = useRouter();

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(`/centre/${id}`);
      toggleToast(data.message);
      setIsLoading(false);
      router.push("/dashboard/learner");
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ListItem disablePadding onClick={() => openDialog()}>
        <ListItemButton sx={{ pl: 5 }}>
          <ListItemIcon>
            <DeleteOutline />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#616161",
              fontWeight: 400,
              fontSize: 14,
              fontStyle: "normal",
            }}
            primary="Delete Centre"
          />
        </ListItemButton>
      </ListItem>
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this centre will no longer exist. Are you sure you want to delete this centre?"
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
