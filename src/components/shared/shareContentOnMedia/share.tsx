import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import { cache, copy, isServerSide } from "@src/utils";
import ShareContent from "@src/components/shared/shareContentOnMedia";
import { useToast } from "@src/utils/hooks/hooks";
import Toast from "@src/components/shared/toast";

interface Props {
  isOpen: boolean;
  closeDialog: Function;
}

const ShareCentreLink = ({ isOpen, closeDialog }: Props) => {
  const { toastMessage, toggleToast } = useToast();
  const user = cache.get("user");
  const path = isServerSide
    ? ""
    : `${window.location.href}?referralCode=${user?.id}`;
  return (
    <>
      <Dialog
        title="Share content "
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Copy link or Click media icon to share"
        content={
          <Box>
            <ShareContent shareUrl={path} />
            <TextFields
              type="text"
              label="Copy link "
              defaultValue={path}
              sx={{ width: "100%", marginTop: 3 }}
            />
          </Box>
        }
        btns={[
          {
            text: "Copy",
            action: () => {
              copy(path);
              toggleToast("Copied!");
            },
          },
          { text: "Cancel", action: closeDialog },
        ]}
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
