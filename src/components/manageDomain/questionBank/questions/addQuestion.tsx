import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CheckBox from "@mui/material/Checkbox";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import Toast from "@src/components/shared/toast";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/editor";

import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

interface Props {
  id?: string;
  centreId: string;
  CourseId: string;
}

const AddModules = ({ CourseId, centreId, id }: Props): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(create);
  const [solution, setSolution] = useState(false);
  // const [file, setFile] = useState<Record<string, any>>();
  // const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  // const [convertedFile, setConvertedFile] = useState<any>();
  // const pageProps = queryClient.getQueryData("pageProps") as BasePageProps;
  const [options, setOptions] = useState<Array<Record<string, any>>>([
    {
      value: "",
      isCorrect: false,
    },
  ]);
  // const getFile = (e: ChangeEvent<any>) => {
  //   setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  // };
  const Loading = dynamic(() => import("@src/components/shared/loading"));
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
        questions.question.options = options;
      if (solution) questions.solution = { text: values.solution };
      await request.post({
        url: `/centre/${centreId}/question-bank/${CourseId}/question`,
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
        <AddCircleOutlineOutlined />
        Add Question
      </MenuItem>
      <Dialog
        title={`Add course ${id ? "content" : "modules"} `}
        isOpen={isOpen}
        closeDialog={closeDialog}
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
                <TextArea
                  required
                  placeholder="Type in question here ..."
                  name="question"
                  onChange={getData}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 5,
                    padding: 15,
                  }}
                  maxLength={200}
                />
              </Box>
              {values.type === "boolean" && (
                <>
                  <Typography
                    variant="body1"
                    onClick={() => (values.answer = true)}
                    sx={{
                      border: "solid 1px #dbdbdb",
                      padding: 2,
                      background: values.answer === true ? "red" : "",
                    }}
                  >
                    True
                  </Typography>
                  <Typography
                    variant="body1"
                    onClick={() => (values.answer = false)}
                    sx={{
                      border: "solid 1px #dbdbdb",
                      padding: 2,
                      background: values.answer === false ? "red" : "",
                    }}
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
                      <Typography variant="subtitle1" component="div">
                        Option &nbsp;
                        {String.fromCharCode("A".charCodeAt(0) + index)}
                      </Typography>
                      <Box>
                        <CheckBox
                          checked={options[index].isCorrect ? true : false}
                          onChange={(e) => {
                            if (values.type === "objective") {
                              options.map((item) => (item.isCorrect = false));
                            }
                            option.isCorrect = e.target.checked;
                            setOptions([...options]);
                          }}
                          // className={styles.checkbox}
                        />
                        <TextArea
                          required
                          onChange={(e: ChangeEvent<any>) => {
                            options[index].value = e.target.value;
                            setOptions(options);
                          }}
                          style={{
                            width: "100%",
                            borderRadius: 5,
                            padding: 15,
                          }}
                          maxLength={200}
                        />
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
                  <TextArea
                    required
                    placeholder="Type in solution here ..."
                    name="solution"
                    onChange={getData}
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 5,
                      padding: 15,
                    }}
                    maxLength={200}
                  />
                </Box>
              )}
              <ButtonComponent onClick={() => setSolution(!solution)}>
                <>{!solution ? "Add" : "Remove"} solution</>
              </ButtonComponent>

              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent
                  variant="contained"
                  type="submit"
                  sx={{ fontSize: 18 }}
                >
                  <>
                    Add question &nbps;
                    {isLoading && <Loading size={15} />}
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
