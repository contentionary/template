import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// icons
import PushPinIcon from "@mui/icons-material/PushPinOutlined";
// utils, interface and styles
// import { ExamFunc } from "./interfaceType";
import useButtonStyle from "@src/styles/button";

const ExamQuestion = () => {
  const buttonStyle = useButtonStyle();
  //
  const [view, setView] = React.useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setView(nextView);
  };

  return (
    <Box p={3}>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" color="primary">
          Question 6 of 50
        </Typography>
        <Button
          size="large"
          color="secondary"
          className={`${buttonStyle.iconTextButton} row`}
        >
          <PushPinIcon fontSize="small" color="primary" />
          &nbsp; Pin this question
        </Button>
      </Stack>
      <Typography paragraph>
        Choose the image that completes the pattern.
      </Typography>
      <Box>
        <ToggleButtonGroup
          exclusive
          value={view}
          orientation="vertical"
          onChange={handleChange}
          className={buttonStyle.examButtonGroup}
        >
          <ToggleButton value="a" aria-label="option a">
            Option 1 is the answer
          </ToggleButton>
          <ToggleButton value="b" aria-label="option a">
            Option 2 serves as the answer
          </ToggleButton>
          <ToggleButton value="c" aria-label="option a">
            Option 1 and 2 are the answers
          </ToggleButton>
          <ToggleButton value="d" aria-label="option a">
            None of the above
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};
export default ExamQuestion;
