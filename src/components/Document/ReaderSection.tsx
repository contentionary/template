import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// styles, interface and config
import { DocumentFunc } from "./interfaceType";
// app components
// icons

const ReaderSection: DocumentFunc = ({ fileUrl = "#" }) => {
  // const docs = [{ uri: fileUrl }];
  return (
    <Fragment>
      <Box
        component="section"
        className="reader-section"
        sx={{ px: { md: 6 } }}
      >
        <Container maxWidth="xl">
          <embed
            style={{
              width: "100%",
              height: "300%",
              minHeight: 800,
            }}
            type="application/pdf"
            src={fileUrl}
          />
        </Container>
      </Box>
    </Fragment>
  );
};
export default ReaderSection;
