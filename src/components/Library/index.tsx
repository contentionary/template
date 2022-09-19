import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import PublicationsLayout from "./PublicationsLayout";
// interface
import { LibraryPageFunc } from "./interfaceType";

const Library: LibraryPageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <PublicationsLayout />
    </Box>
  );
};

export default Library;
