import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
// styles, interface and config
import useButtonStyle from "@src/styles/button";
import { ReaderToolbarInt } from "./interfaceType";
import usePdfReaderStyle from "@src/styles/pdfReader";

type ReaderToolbarMobileInt = Omit<
  ReaderToolbarInt,
  | "share"
  | "download"
  | "closeBook"
  | "allowDownload"
  | "zoomIn"
  | "zoomOut"
  | "scale"
  | "setScale"
>;

const ReaderToolbarMobile = ({
  previousPage,
  pageNumber,
  nextPage,
  numPages,
}: ReaderToolbarMobileInt) => {
  const buttonStyle = useButtonStyle();
  const pdfStyle = usePdfReaderStyle();

  return (
    <Box
      component="nav"
      bgcolor="white !important"
      sx={{ py: 1, px: { md: 6 } }}
      display={{ xs: "block", md: "none" }}
      className={`${pdfStyle.pdfNav} nav-bottom`}
    >
      <Container maxWidth="xl">
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="text"
            color="secondary"
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className={buttonStyle.iconTextButton}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <ArrowBackOutlinedIcon fontSize="small" />
              <Typography
                variant="body1"
                display={{ xs: "none", md: "inline" }}
              >
                Previous
              </Typography>
            </Stack>
          </Button>
          <Typography paragraph mb={0} color="secondary">
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            variant="text"
            color="secondary"
            onClick={nextPage}
            disabled={pageNumber === numPages}
            className={buttonStyle.iconTextButton}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body1"
                display={{ xs: "none", md: "inline" }}
              >
                Next
              </Typography>
              <ArrowForwardOutlinedIcon fontSize="small" />
            </Stack>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ReaderToolbarMobile;
