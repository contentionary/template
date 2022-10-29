import React from "react";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
//
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// interface styles and configs
import { TempAnswerInt } from ".";
import useButtonStyle from "@src/styles/button";
import { QuestionInt } from "@src/utils/interface";
import useTextFieldStyle from "@src/styles/textField";

interface QuestionSelectorInt {
  questionId: string;
  question: QuestionInt;
  answers: Record<string, TempAnswerInt>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Record<string, TempAnswerInt>>
  >;
}

export const ObjectiveQuestionSelector = (props: QuestionSelectorInt) => {
  const buttonStyle = useButtonStyle();
  // selected option
  const [value, setValue] = React.useState<number>();

  // set option if in cache
  React.useEffect(() => {
    if (props.answers[props.questionId]) {
      setValue(Number(props.answers[props.questionId]?.optionId));
    }
  }, [props.questionId, props.answers]);

  // set answer
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ) => {
    setValue(value);
    props.setAnswers((prevState) => ({
      ...prevState,
      [`${props.questionId}`]: {
        questionId: props.questionId,
        optionId: Number(value),
      },
    }));
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      orientation="vertical"
      onChange={handleChange}
      className={buttonStyle.examButtonGroup}
    >
      {props?.question?.options?.map((option, index) => (
        <ToggleButton
          key={`objective-option-${option.id}`}
          value={option?.id}
          aria-label={`option ${index + 1}`}
        >
          <Stack direction="row" spacing={2}>
            <Typography color="inherit" mb={0} paragraph>
              {index + 1}). &nbsp;
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: option.value }}
              sx={{
                "& p": { margin: 0 },
                "& > :first-of-type": { marginBottom: 0 },
              }}
            />
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const BooleanQuestionSelector = (props: QuestionSelectorInt) => {
  const buttonStyle = useButtonStyle();
  //
  const [option, setOption] = React.useState<string>();
  // set option if in cache
  React.useEffect(() => {
    if (props.answers[props.questionId]) {
      setOption(String(props.answers[props.questionId]?.answer));
    }
  }, [props.questionId, props.answers]);
  // set answer
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setOption(value);
    props.setAnswers((prevState) => ({
      ...prevState,
      [`${props.questionId}`]: {
        questionId: props.questionId,
        answer: value === "true",
      },
    }));
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={option}
      orientation="vertical"
      onChange={handleChange}
      className={buttonStyle.examButtonGroup}
    >
      <ToggleButton value={"true"} aria-label="option true">
        A). True
      </ToggleButton>
      <ToggleButton value={"false"} aria-label="option false">
        B). False
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const TheoryQuestionSelector = (props: QuestionSelectorInt) => {
  const { textField } = useTextFieldStyle();
  const [value, setValue] = React.useState("");
  // set answer if in cache
  React.useEffect(() => {
    if (props.answers[props.questionId]) {
      setValue(String(props.answers[props.questionId]?.answer));
    } else {
      setValue("");
    }
  }, [props.questionId, props.answers]);
  //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.setAnswers((prevState) => ({
      ...prevState,
      [`${props.questionId}`]: {
        questionId: props.questionId,
        answer: String(event.target.value),
      },
    }));
  };

  return (
    <OutlinedInput
      rows={4}
      fullWidth
      multiline
      value={value}
      className={textField}
      onChange={handleChange}
      id={`theory-question-input-${props.questionId}`}
    />
  );
};

export const MultichoiceQuestionSelector = (props: QuestionSelectorInt) => {
  const [choice, setChoice] = React.useState<Array<number>>([]);

  // set option if in cache
  React.useEffect(() => {
    if (props.answers[props.questionId]) {
      setChoice([...(props.answers[props.questionId]?.optionIds ?? [])]);
    }
  }, [props.questionId, props.answers]);

  // set choice
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newChoice: Array<number> = [];
    if (event.target.checked) {
      newChoice = [...choice, Number(event.target.name)];
    } else {
      newChoice = [...choice.filter((x) => x !== Number(event.target.name))];
    }
    setChoice([...newChoice]);
    props.setAnswers((prevState) => ({
      ...prevState,
      [`${props.questionId}`]: {
        questionId: props.questionId,
        optionIds: newChoice,
      },
    }));
  };

  return (
    <FormGroup>
      {props?.question?.options?.map((option) => (
        <FormControlLabel
          key={`multichoice-option-${option.id}`}
          control={
            <Checkbox
              onChange={handleChange}
              name={String(option.id)}
              checked={choice.includes(option.id)}
            />
          }
          label={
            <Box
              dangerouslySetInnerHTML={{ __html: option.value }}
              sx={{ "& > :first-of-type": { marginTop: 0, paddingTop: 0 } }}
            />
          }
        />
      ))}
    </FormGroup>
  );
};

export const RangeQuestionSelector = (props: QuestionSelectorInt) => {
  const { textField } = useTextFieldStyle();
  const [minValue, setMinValue] = React.useState<string>("");
  const [maxValue, setMaxValue] = React.useState<string>("");
  //
  React.useEffect(() => {
    if (props.answers[props.questionId]) {
      setMinValue(String(props.answers[props.questionId]?.min ?? ""));
      setMaxValue(String(props.answers[props.questionId]?.max ?? ""));
    }
  }, [props.questionId, props.answers]);
  //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "min") setMinValue(event.target.value);
    else setMaxValue(event.target.value);
    props.setAnswers((prevState) => ({
      ...prevState,
      [`${props.questionId}`]: {
        ...prevState[props.questionId],
        questionId: props.questionId,
        [event.target.name]: String(event.target.value),
      },
    }));
  };

  return (
    <>
      <Typography mt={1} fontWeight="light" variant="subtitle2">
        Minimum value:
      </Typography>
      <OutlinedInput
        name="min"
        fullWidth
        value={minValue}
        className={textField}
        onChange={handleChange}
        id={`min-range-question-input-${props.questionId}`}
      />
      <Typography mt={1} fontWeight="light" variant="subtitle2">
        Maximum Value:
      </Typography>
      <OutlinedInput
        name="max"
        fullWidth
        value={maxValue}
        className={textField}
        onChange={handleChange}
        id={`max-range-question-input-${props.questionId}`}
      />
    </>
  );
};
