import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// icons
import ShareIcon from "@mui/icons-material/ShareOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
// styles, interface and config
import useButtonStyle from "@src/styles/button";
import { ReaderToolbarInt } from "./interfaceType";
import usePdfReaderStyle from "@src/styles/pdfReader";

const ReaderToolbar = ({
  share,
  download,
  closeBook,
  allowDownload,
  previousPage,
  pageNumber,
  nextPage,
  numPages,
  zoomIn,
  zoomOut,
  scale,
  setScale,
}: ReaderToolbarInt & {
  // eslint-disable-next-line no-unused-vars
  setScale: (value: React.SetStateAction<number>) => void;
}) => {
  const buttonStyle = useButtonStyle();
  const pdfStyle = usePdfReaderStyle();

  const handleChange = (event: SelectChangeEvent) => {
    setScale(Number(event.target.value));
  };

  return (
    <Box
      component="nav"
      display="block"
      className={pdfStyle.pdfNav}
      bgcolor="white !important"
      sx={{ py: 1, px: { md: 6 } }}
    >
      <Container maxWidth="xl">
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              color="secondary"
              onClick={zoomIn}
              disabled={scale >= 3}
              className={buttonStyle.iconTextButton}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={zoomOut}
              disabled={scale <= 0.2}
              className={buttonStyle.iconTextButton}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={scale.toString()}
                displayEmpty
                id="select-scale"
                onChange={handleChange}
                inputProps={{ "aria-label": "select scale" }}
              >
                {Array.from({ length: 15 }).map((_, index) => (
                  <MenuItem
                    key={`${index}-scale`}
                    value={Number(((index + 1) * 0.2).toFixed(2))}
                  >
                    {Math.round((index + 1) * 0.2 * 100)}%
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider orientation="vertical" flexItem />
            <Button
              variant="text"
              color="secondary"
              onClick={share}
              className={buttonStyle.iconTextButton}
            >
              <Stack direction="row" alignItems="center">
                <ShareIcon fontSize="small" /> &nbsp; Share
              </Stack>
            </Button>
          </Stack>
          <Typography paragraph mb={0} color="secondary">
            Page {pageNumber} of {numPages}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {allowDownload && (
              <>
                <IconButton
                  title="Download book"
                  onClick={download}
                  className={buttonStyle.iconTextButton}
                >
                  <FileDownloadOutlinedIcon fontSize="medium" />
                </IconButton>
                <Divider orientation="vertical" flexItem />
              </>
            )}
            <Button
              variant="text"
              color="secondary"
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className={buttonStyle.iconTextButton}
            >
              <Stack direction="row" alignItems="center">
                <ArrowBackOutlinedIcon fontSize="small" /> &nbsp; Previous
              </Stack>
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={nextPage}
              disabled={pageNumber === numPages}
              className={buttonStyle.iconTextButton}
            >
              <Stack direction="row" alignItems="center">
                Next &nbsp; <ArrowForwardOutlinedIcon fontSize="small" />
              </Stack>
            </Button>
            <Divider orientation="vertical" flexItem />
            <IconButton
              title="Close book"
              onClick={closeBook}
              sx={{ color: "error.main" }}
              className={buttonStyle.iconTextButton}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ReaderToolbar;
