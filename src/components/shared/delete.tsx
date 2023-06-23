import ConfirmDialog from "@src/components/shared/confirmationModal";
import MenuItem from "@mui/material/MenuItem";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useDialog } from "@src/hooks";

interface Props {
  url: string;
  toggleToast: Function;
  updateData?: Function;
  text?: boolean;
  index?: number;
  setPortfolio?: Function;
  portfolios?: [];
}

const Delete = ({
  url,
  toggleToast,
  updateData,
  text,
  setPortfolio,
  portfolios,
  index,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, openDialog, closeDialog } = useDialog();
  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(url);
      toggleToast(data.message);
      if (index && setPortfolio && portfolios) {
        portfolios.splice(index, 1);
        setPortfolio([...portfolios]);
      } else {
        updateData && updateData();
      }
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {text ? (
        <MenuItem onClick={() => openDialog()} sx={{ fontSize: 18 }}>
          Delete
        </MenuItem>
      ) : (
        <IconButton onClick={() => openDialog()}>
          <DeleteOutline htmlColor="red" />
        </IconButton>
      )}
      <ConfirmDialog
        isLoading={isLoading}
        isOpen={isOpen}
        closeDialog={closeDialog}
        action={deleteCentre}
        message="This action means this will no longer exist. Are you sure you want to delete this?"
      />
    </>
  );
};

export default Delete;
