import React, { Fragment, useState } from "react";
// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//React-pdf
import { Document, Page, pdfjs } from "react-pdf";
// styles, interface and config
import { DocumentFunc } from "./interfaceType";
// app components

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReaderSection: DocumentFunc = ({ fileUrl = "#" }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Fragment>
      <Box
        component="section"
        className="reader-section"
        sx={{ px: { md: 6 } }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexFlow: "column",
            userSelect: "none",
          }}
          maxWidth="xl"
        >
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </Container>
      </Box>
    </Fragment>
  );
};
export default ReaderSection;
