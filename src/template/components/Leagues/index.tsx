import React from "react";
// mui components
import Box from "@mui/material/Box";
// app components
import LeaguesLayout from "./LeaguesLayout";
// interface
import { LeaguesPageFunc } from "./interfaceType";

const LeaguesPage: LeaguesPageFunc = () => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <LeaguesLayout />
    </Box>
  );
};

export default LeaguesPage;
