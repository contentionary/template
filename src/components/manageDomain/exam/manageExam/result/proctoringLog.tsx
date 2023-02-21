import Box from "@mui/material/Box";
import Image from "next/image";
import Dialog from "@src/components/shared/dialog";
import Close from "@mui/icons-material/Close";

export default function ProctoredLog({
  image,
  isOpen,
  closeDialog,
}: {
  image: string;
  isOpen: boolean;
  closeDialog: Function;
}) {
  return (
    <>
      <Dialog
        title="proctored log"
        isOpen={isOpen}
        closeDialog={closeDialog}
        width="md"
        icon={
          <Close
            onClick={() => closeDialog()}
            htmlColor="red"
            sx={{ cursor: "pointer" }}
          />
        }
        content={
          <Box>
            <Image
              width="100%"
              height="100%"
              objectFit="contain"
              layout="responsive"
              alt="proctored log"
              src={image}
            />
          </Box>
        }
      />
    </>
  );
}
