import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// interface styles and configs
import useButtonStyle from "@src/styles/button";
import { QuestionInt } from "@src/utils/interface";

interface QuestionSelectorInt {
  question: QuestionInt;
}

export const ObjectiveQuestionSelector = ({
  question,
}: QuestionSelectorInt) => {
  const buttonStyle = useButtonStyle();
  //
  const [view, setView] = React.useState("");
  // set answer
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setView(nextView);
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={view}
      orientation="vertical"
      onChange={handleChange}
      className={buttonStyle.examButtonGroup}
    >
      {question.options.map((option, index) => (
        <ToggleButton
          key={`objective-option-${option.id}`}
          value={option.id}
          aria-label={`option ${index + 1}`}
        >
          <Stack direction="row" spacing={2}>
            <Typography mb={0} paragraph>
              {index + 1}). &nbsp;
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: option.value }}
              sx={{ "& p": { margin: 0 } }}
            />
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const BooleanQuestionSelector = () => {
  const buttonStyle = useButtonStyle();
  //
  const [view, setView] = React.useState("");

  // set answer
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setView(nextView);
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={view}
      orientation="vertical"
      onChange={handleChange}
      className={buttonStyle.examButtonGroup}
    >
      <ToggleButton value="true" aria-label="option true">
        A). True
      </ToggleButton>
      <ToggleButton value="false" aria-label="option false">
        B). False
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const TheoryQuestionSelector = () => {
  return <Typography paragraph>Theory</Typography>;
};

export const MultichoiceQuestionSelector = () => {
  return <Typography paragraph>Multichoice</Typography>;
};

export const RangeQuestionSelector = () => {
  return <Typography paragraph>Range</Typography>;
};
