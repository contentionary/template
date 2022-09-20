import React, { Fragment } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// styles, interface and config
import { DocumentFunc } from "./interfaceType";
// app components
// icons

const ReaderSection: DocumentFunc = () => {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf" },
    // { uri: "/documents/count-sort.pdf" },
  ];

  return (
    <Fragment>
      <Box
        component="section"
        className="reader-section"
        sx={{ px: { md: 6 } }}
      >
        <Container maxWidth="xl">
          {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
          <embed
            style={{
              width: "100%",
              height: "300%",
              minHeight: 800,
            }}
            type="application/pdf"
            src="/documents/count-sort.pdf"
          />
        </Container>
      </Box>
    </Fragment>
  );
};
export default ReaderSection;
