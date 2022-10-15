import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
// styles, interface and config
import useButtonStyle from "@src/styles/button";
import { ReaderToolbarInt } from "./interfaceType";
import usePdfReaderStyle from "@src/styles/pdfReader";
import useTextFieldStyle from "@src/styles/textField";

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
  setPageNumber,
  previousPage,
  pageNumber,
  nextPage,
  numPages,
}: ReaderToolbarMobileInt) => {
  const buttonStyle = useButtonStyle();
  const pdfStyle = usePdfReaderStyle();
  const { textField } = useTextFieldStyle();
  //
  const handlePageNumber = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPageNumber(Number(event.target.value));
  };
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
                color="inherit"
                variant="body1"
                display={{ xs: "none", md: "inline" }}
              >
                Previous
              </Typography>
            </Stack>
          </Button>
          <Stack
            key={`select-doc-page${pageNumber}`}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Typography paragraph mb={0} color="secondary">
              Page
            </Typography>
            <TextField
              hiddenLabel
              size="small"
              type="number"
              variant="standard"
              id="select-doc-page"
              defaultValue={pageNumber}
              onChange={handlePageNumber}
              className={`${textField} no-scroll pdfPageNum`}
              inputProps={{ max: numPages, min: 1 }}
              sx={{
                width: "40px",
              }}
            />
            <Typography mb={0} paragraph color="secondary">
              of {numPages}
            </Typography>
          </Stack>
          <Button
            variant="text"
            color="secondary"
            onClick={nextPage}
            disabled={pageNumber === numPages}
            className={buttonStyle.iconTextButton}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                color="inherit"
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
