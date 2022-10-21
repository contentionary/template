import React from "react";
// next components
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
// icons
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// utils, interface and styles
import useGlobalStyle from "@src/styles";
import { ExamFunc } from "./interfaceType";
import { dateTimeFormat } from "@src/utils";
import useButtonStyle from "@src/styles/button";

const Exam: ExamFunc = (props) => {
  const buttonStyle = useButtonStyle();
  const globalStyle = useGlobalStyle();
  const { exam, auth } = props;

  return (
    <Box
      display="flex"
      component="main"
      flexDirection="column"
      justifyContent="center"
      sx={{ pt: 8, minHeight: "100vh" }}
      className={globalStyle.bgDustyPrimary}
    >
      <Box component="section" sx={{ pt: 4, pb: 8, px: { md: 6 } }}>
        <Container maxWidth="xl"></Container>
      </Box>
    </Box>
  );
};
export default Exam;
