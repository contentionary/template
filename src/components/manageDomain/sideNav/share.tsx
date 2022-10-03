import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import TextFields from "@src/components/shared/input/textField";
import { copy } from "@src/utils";
import { useState } from "react";
import ShareContent from "@src/components/shared/shareContentOnMedia";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

interface Props {
  contentToShare: string;
  userId: string;
}

const ShareCentreLink = ({ contentToShare, userId }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const [url, setUrl] = useState("");

  return (
    <>
      <ListItem
        disablePadding
        onClick={() => {
          setUrl(window.location.href);
          openDialog();
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <ShareOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#333333",
              fontWeight: 500,
              fontSize: 16,
              fontStyle: "normal",
            }}
            primary="Share Centre"
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        title="Share content "
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Copy link or Click media icon to share"
        content={
          <Box>
            <ShareContent shareUrl={`${url}?referralCode=${userId}`} />
            <TextFields
              type="text"
              label="Copy Centre "
              defaultValue={contentToShare}
              sx={{ width: "100%", marginTop: 3 }}
            />
          </Box>
        }
        btns={[
          {
            text: "Copy",
            action: () => {
              copy(contentToShare);
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
