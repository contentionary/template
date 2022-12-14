import ConfirmDialog from "@src/components/shared/confirmationModal";
import { handleError, request } from "@src/utils";
import { useState } from "react";

interface Props {
  url: string;
  children: JSX.Element;
  isOpen: boolean;
  closeDialog: Function;
  toggleToast: Function;
  updateData?: Function;
}

const Delete = ({
  url,
  children,
  closeDialog,
  isOpen,
  toggleToast,
  updateData,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteCentre() {
    try {
      setIsLoading(true);
      const data = await request.delete(url);
      toggleToast(data.message);
      updateData && updateData();
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {children}
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
