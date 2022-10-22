import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
//
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// app components
import ExamNav from "./ExamNav";
import ExamQuestion from "./ExamQuestion";
// icons
// utils, interface and styles
import useGlobalStyle from "@src/styles";
import { ExamFunc } from "./interfaceType";

const StartExam: ExamFunc = (props) => {
  const theme = useTheme();
  const { exam /* auth */ } = props;
  const globalStyle = useGlobalStyle();

  return (
    <Box pt={0} component="main" minHeight="100vh">
      <ExamNav />
      <Box component="section" sx={{ pt: 4, pb: 8, px: { md: 6 } }}>
        <Container maxWidth="xl" sx={{ display: "grid", placeItems: "center" }}>
          <Box maxWidth={620} width="100%">
            <Typography mb={3} variant="h5" component="h1" textAlign="center">
              {exam.name}
            </Typography>
            <Box
              className={
                useMediaQuery(theme.breakpoints.down("sm"))
                  ? ""
                  : globalStyle.paperShadowSm
              }
            >
              <Box
                maxWidth="86vw"
                borderBottom={1}
                borderColor="divider"
                sx={{ overflowX: "scroll" }}
                className={globalStyle.hiddenScrollbar}
              >
                <RadioGroup
                  row
                  sx={{
                    px: 3,
                    py: 1,
                    minWidth: 560,
                    flexShrink: 0,
                    flexWrap: "nowrap",
                  }}
                  name="exam-category-group"
                  defaultValue="general_section"
                  aria-labelledby="exam category group"
                  className={globalStyle.hiddenScrollbar}
                >
                  <FormControlLabel
                    value="general_section"
                    control={<Radio />}
                    label="General Section"
                  />
                  <FormControlLabel
                    value="section_b"
                    control={<Radio />}
                    label="Section B"
                  />
                  <FormControlLabel
                    value="section_c"
                    control={<Radio />}
                    label="Section C"
                  />
                  <FormControlLabel
                    value="theory"
                    control={<Radio />}
                    label="Theory"
                  />
                </RadioGroup>
              </Box>
              <ExamQuestion />
              <Box p={3}>
                <Stack
                  mt={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography mb={0} paragraph>
                    Question mark: 1
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button disableElevation size="large" variant="contained">
                      Previous
                    </Button>
                    <Button disableElevation size="large" variant="contained">
                      Next
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default StartExam;
