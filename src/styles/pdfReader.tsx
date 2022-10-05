import { makeStyles } from "@mui/styles";

const pdfStyle = makeStyles({
  pdfPage: {
    margin: 0,
    "& .react-pdf__innerWrapper": {
      margin: 0,
      "& .react-pdf__Document": {
        display: "flex",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
      },
      "& .react-pdf__Page": {
        maxWidth: "calc(100% - 2em)",
        marginTop: "1rem",
        userSelect: "none",
        "& canvas": {
          maxWidth: "100%",
          height: "auto !important",
        },
        "&.prevPage": {
          position: "absolute !important",
          zIndex: 1,
        },
      },
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
