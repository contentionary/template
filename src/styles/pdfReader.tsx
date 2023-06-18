import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

const pdfStyle = makeStyles({
  pdfPage: {
    margin: 0,
    "& .react-pdf__innerWrapper": {
      margin: 0,
      "& .react-pdf__Document": {
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        background: grey[200],
      },
      "& .react-pdf__Page": {
        // maxWidth: "calc(100% - 2em)",
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "inline-grid",
        placeItems: "center",
        userSelect: "none",
        "& canvas": {
          width: "auto",
          height: "auto",
          margin: "2rem 2rem",
          display: "inline-block",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.06)",
        },
        "&.prevPage": {
          position: "absolute !important",
          zIndex: 1,
        },
      },
    },
    "@media print": {
      display: "none",
    },
  },
  pdfNav: {
    top: 0,
    zIndex: 2,
    width: "100%",
    position: "sticky",
    "&.nav-bottom": { top: "calc(100% - 48px)", bottom: 0, position: "fixed" },
  },
});
export default pdfStyle;
