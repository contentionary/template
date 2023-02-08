import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import CheckBox from "@src/components/shared/checkInput";
import Toast from "@src/components/shared/toast";
import useForm from "@src/hooks/useForm";
import useStyles from "./styles";
import { useToast } from "@src/utils/hooks";
import { handleError, request, uploadFiles } from "@src/utils";
import { ChangeEvent, useEffect, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import TextFields from "@src/components/shared/input/textField";
import { QuestionOptionInt, QuestionsInt } from "@src/utils/interface";
import Editor from "@src/components/shared/editor";
import { useRouter } from "next/router";

interface Props {
  centreId: string;
  questionBankId: string;
  question: QuestionsInt;
}

const UpdateQuestion = ({
  questionBankId,
  centreId,
  question,
}: Props): JSX.Element => {
  const ImageUpload = dynamic(() => import("./imageUpload"));
  const OptionImageUpload = dynamic(() => import("./optionImgUpload"));
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const styles = useStyles();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, setData, setDefault, getEditor } =
    useForm(create);
  const [solution, setSolution] = useState(false);
  const [img, setImg] = useState<Record<string, any>>({});
  const [solutionImg, setSolutionImg] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [convertedSolutionImage, setConvertedSolutionImage] = useState<any>();
  const [options, setOptions] = useState<QuestionOptionInt[]>(
    question?.question?.options
  );

  useEffect(() => {
    setDefault({ ...question.question });
  }, [question]);

  async function getImage() {
    let resolvedOption = [];

    for (let option of options) {
      if ("image" in option && option.image.length) {
        option.image = await uploadFiles(option.image[0], setProgress);
      }
      delete option.id;
      resolvedOption.push(option);
    }

    return resolvedOption;
  }
  async function create() {
    try {
      setIsLoading(true);
      let questions: any = {
        question: { question: values.question, type: values.type },
      };
      if (values.type === "objective" || values.type === "multichoice") {
        questions.question.options = await getImage();
      }

      if (img.rawImg && !convertedImage) {
        const imageUrl = await uploadFiles(img.rawImg, setProgress);
        questions.question.image = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (solutionImg.rawImg && !convertedSolutionImage) {
        const imageUrl = await uploadFiles(solutionImg.rawImg, setProgress);
        questions.solution.imageUrl = imageUrl;
        setConvertedSolutionImage(imageUrl);
      }
      if (values.type === "boolean") questions.question.answer = values.answer;
      if (values.type === "range") {
        questions.question.max = values.max;
        questions.question.min = values.min;
      }
      if (solution) questions.solution.text = values.solution;
      await request.post({
        url: `/centre/${centreId}/question-bank/${questionBankId}/question/${question?.id}`,
        data: questions,
        method: "PATCH",
      });
      toggleToast("Question add");
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography
          component="span"
          sx={{ cursor: "pointer", color: "red" }}
          onClick={() => router.back()}
        >
          Go back
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
          Update Question
        </Typography>

        <form onSubmit={(e) => submit(e)}>
          <Stack spacing={3} mt={3}>
            <FormControl fullWidth>
              <InputLabel>Question Type</InputLabel>
              <Select
                label="Question Type"
                name="type"
                value={values.type || question?.question?.type || ""}
                onChange={(e) => getData(e)}
              >
                <MenuItem value="objective">OBJECTIVE</MenuItem>
                <MenuItem value="theory">THEORY</MenuItem>
                <MenuItem value="boolean">BOOLEAN</MenuItem>
                <MenuItem value="range">RANGE</MenuItem>
                <MenuItem value="multichoice">MULTI-CHOICE</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography variant="h6" component="div">
                Question
              </Typography>
              <Editor
                data={question?.question.question}
                onChange={(event: any, editor: any) =>
                  getEditor(event, editor, "question")
                }
              />
              <Box sx={{ mt: 4 }}>
                <ImageUpload
                  setImg={setImg}
                  img={img}
                  uploadText=" Add image to question"
                />
              </Box>
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
            {values.type === "range" && (
              <Box>
                <TextFields
                  onChange={(e) => getData(e)}
                  name="min"
                  label="Minium"
                  sx={{ mr: 4 }}
                />
                <TextFields
                  onChange={(e) => getData(e)}
                  name="max"
                  label="Maxium"
                />
              </Box>
            )}
            {(values.type === "objective" || values.type === "multichoice") && (
              <Box>
                {options.map((option, index) => (
                  <Box key={`${index}-add-option`}>
                    <Box>
                      <CheckBox
                        label={
                          <Typography variant="subtitle1" component="div">
                            Option &nbsp;
                            {String.fromCharCode("A".charCodeAt(0) + index)}
                          </Typography>
                        }
                        checked={options[index].isCorrect ? true : false}
                        onChange={(e: ChangeEvent<any>) => {
                          if (values.type === "objective") {
                            options.map((item) => (item.isCorrect = false));
                          }
                          option.isCorrect = e.target.checked;
                          setOptions([...options]);
                        }}
                      />
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "100%" }}>
                          <Editor
                            data={option.value}
                            onChange={(event: any, editor: any) => {
                              options[index].value = editor.getData();
                              setOptions(options);
                            }}
                          />
                          <Box sx={{ mt: 4 }}>
                            <OptionImageUpload
                              setOptions={setOptions}
                              options={options}
                              index={index}
                              uploadText=" Add image to option"
                            />
                          </Box>
                        </Box>
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
                  </Box>
                ))}
                <ButtonComponent
                  onClick={() => {
                    options.push({
                      value: "",
                      isCorrect: false,
                    });
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
                  data={question?.solution?.text}
                  onChange={(event: any, editor: any) =>
                    getEditor(event, editor, "solution")
                  }
                />
                <Box sx={{ mt: 4 }}>
                  <ImageUpload
                    setImg={setSolutionImg}
                    img={solutionImg}
                    uploadText=" Add image to solution"
                  />
                </Box>
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
                <>Update question</>
              </ButtonComponent>
            </Typography>
          </Stack>
        </form>

        {toastMessage && (
          <Toast
            status={Boolean(toastMessage)}
            message={toastMessage}
            showToast={toggleToast}
          />
        )}
      </Container>
      <Loading open={isLoading} value={progress} size={100} />
    </>
  );
};

export default UpdateQuestion;
