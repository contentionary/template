import Modal from "../dialog";
import Loading from "../loading";

interface Props {
  isOpen: boolean;
  closeDialog: Function;
  message: string;
  action: Function;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  closeDialog,
  message,
  action,
  isLoading,
}: Props): JSX.Element => {
  const value = (
    <>
      Yes continue
      {isLoading && (
        <Loading size={12} color="primary" sx={{ marginLeft: 2 }} />
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      closeDialog={closeDialog}
      message={message}
      title="Confirm you want to continue this action"
      btns={[
        { text: value, action: action, sx: { color: "red" } },
        { text: "No, cancel", action: closeDialog },
      ]}
    />
  );
};
export default ConfirmationModal;
