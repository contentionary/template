import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import CheckBox from "@src/components/shared/checkInput";
import Dialog from "@src/components/shared/dialog";
import Toast from "@src/components/shared/toast";
import useForm from "@src/hooks/useForm";
import Editor from "@src/components/shared/editor";
import useStyles from "./styles";
import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { ChangeEvent, useEffect, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { QuestionsInt } from "@src/utils/interface";
import EditOutlined from "@mui/icons-material/EditOutlined";

interface Props {
  centreId: string;
  question: QuestionsInt;
  questionBankId: string;
}

const AddModules = ({
  question,
  questionBankId,
  centreId,
}: Props): JSX.Element => {
  const styles = useStyles();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, setData, setDefault } = useForm(create);
  const [solution, setSolution] = useState(
    question?.solution?.text ? true : false
  );
  // const [file, setFile] = useState<Record<string, any>>();
  // const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  // const [convertedFile, setConvertedFile] = useState<any>();
  // const pageProps = queryClient.getQueryData("pageProps") as BasePageProps;
  const [options, setOptions] = useState<Array<Record<string, any>>>(
    question?.question?.options
  );
  // const getFile = (e: ChangeEvent<any>) => {
  //   setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  // };
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  useEffect(() => {
    setDefault({
      type: question.question.type,
      question: question.question.question,
    });
  }, []);

  async function create() {
    try {
      setIsLoading(true);
      // if (file && !convertedFile) {
      //   const fileUrl = await uploadFiles(file.fileUrl, setFileLoadingProgress);
      //   values.fileUrl = fileUrl;
      //   setConvertedFile(fileUrl);
      // }

      let questions: any = {
        question: { question: values.question, type: values.type },
      };
      if (values.type === "objective" || values.type === "multichoice")
        questions.question.options = options.map(({ value, isCorrect }) => ({
          value,
          isCorrect,
        }));
      if (values.type === "boolean") questions.question.answer = values.answer;
      if (solution) questions.solution = { text: values.solution };
      await request.patch({
        url: `/centre/${centreId}/question-bank/${questionBankId}/question/${question.id}`,
        data: questions,
      });
      toggleToast("Question add");
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <MenuItem onClick={() => openDialog()} disableRipple>
        <EditOutlined />
        Update Question
      </MenuItem>
      <Dialog
        title="Add Question"
        isOpen={isOpen}
        closeDialog={closeDialog}
        width="xl"
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <FormControl fullWidth>
                <InputLabel>Question Type</InputLabel>
                <Select
                  name="type"
                  value={values.type}
                  onChange={(e) => getData(e)}
                >
                  <MenuItem value="objective">OBJECTIVE</MenuItem>
                  <MenuItem value="theory">THEORY</MenuItem>
                  <MenuItem value="boolean">BOOLEAN</MenuItem>
                  <MenuItem value="multichoice">MULTI-CHOICE</MenuItem>
                </Select>
              </FormControl>
              <Box>
                <Typography variant="subtitle1" component="div">
                  Question
                </Typography>
                <Editor
                  required
                  placeholder="Type in question here ..."
                  name="question"
                  defaultValue={question.question.question}
                  onChange={getData}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 5,
                    padding: 15,
                  }}
                />
              </Box>
              {values.type === "boolean" && (
                <>
                  <Typography
                    variant="body1"
                    onClick={() => setData("answer", true)}
                    className={`${styles.optionStyle} ${
                      values.answer === true ? styles.selected : ""
                    }`}
                  >
                    True
                  </Typography>
                  <Typography
                    variant="body1"
                    onClick={() => setData("answer", false)}
                    className={`${styles.optionStyle} ${
                      values.answer === false ? styles.selected : ""
                    }`}
                  >
                    False
                  </Typography>
                </>
              )}

              {(values.type === "objective" ||
                values.type === "multichoice") && (
                <Box>
                  {options.map((option, index) => (
                    <>
                      <Box key={`${index}-option`}>
                        <CheckBox
                          label={
                            <Typography variant="subtitle1" component="div">
                              Option &nbsp;
                              {String.fromCharCode("A".charCodeAt(0) + index)}
                            </Typography>
                          }
                          checked={options[index].isCorrect ? true : false}
                          onChange={(e: ChangeEvent<any>) => {
                            if (
                              values.type ||
                              question.question.type === "objective"
                            ) {
                              options.map((item) => (item.isCorrect = false));
                            }
                            option.isCorrect = e.target.checked;
                            setOptions([...options]);
                          }}
                        />
                        <Box sx={{ display: "flex" }}>
                          <Editor
                            required
                            defaultValue={option.value}
                            onChange={(e: ChangeEvent<any>) => {
                              options[index].value = e.target.value;
                              setOptions(options);
                            }}
                            style={{
                              width: "100%",
                              borderRadius: 5,
                              padding: 15,
                            }}
                          />
                          <IconButton
                            sx={{ marginLeft: 3 }}
                            onClick={() => {
                              options.splice(index, 1);
                              setOptions([...options]);
                            }}
                          >
                            <CloseOutlined htmlColor="red" />
                          </IconButton>
                        </Box>
                      </Box>
                    </>
                  ))}
                  <ButtonComponent
                    onClick={() => {
                      options.push({ value: "", isCorrect: false });
                      setOptions([...options]);
                    }}
                  >
                    Add option
                  </ButtonComponent>
                </Box>
              )}
              {solution && (
                <Box>
                  <Typography variant="subtitle1" component="div">
                    Solution
                  </Typography>
                  <Editor
                    required
                    defaultValue={question.solution.text}
                    placeholder="Type in solution here ..."
                    name="solution"
                    onChange={getData}
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 5,
                      padding: 15,
                    }}
                  />
                </Box>
              )}
              <Typography sx={{ textAlign: "right" }}>
                <ButtonComponent onClick={() => setSolution(!solution)}>
                  <>{!solution ? "Add" : "Remove"} solution</>
                </ButtonComponent>
              </Typography>

              <Typography sx={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent
                  variant="contained"
                  type="submit"
                  sx={{ fontSize: 18, mr: 2 }}
                >
                  <>
                    Update question
                    {isLoading && (
                      <Loading
                        size={15}
                        sx={{ color: "#fff", marginLeft: 1 }}
                      />
                    )}
                  </>
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => closeDialog()}
                  sx={{ fontSize: 18 }}
                >
                  Cancel
                </ButtonComponent>
              </Typography>
            </Stack>
          </form>
        }
      />
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default AddModules;
