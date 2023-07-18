import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/utils/hooks/useForm";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CheckBox from "@src/components/shared/checkInput";
import { useDialog } from "@src/utils/hooks";
import { handleError, queryClient, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { BasePageProps, ExamInt } from "@src/utils/interface";

const AddExam = ({
  toggleToast,
  leagueId,
  refetch,
}: {
  toggleToast: Function;
  refetch: Function;
  leagueId: string;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit, check } = useForm(create);
  const [exams, setExams] = useState<Array<ExamInt>>([]);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${cachedData.centre.id}/league/${leagueId}/exam`,
        data: values,
      });
      refetch();
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  async function getExams() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: `/centre/${cachedData.centre.id}/exams?limit=1000`,
      });
      setExams([...(data.exams as ExamInt[])]);
      setIsLoading(false);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <ButtonComponent
        variant="contained"
        onClick={() => getExams()}
        sx={{ fontSize: 18 }}
      >
        <>
          <AddCircleOutlineOutlined /> &nbsp; Add Exam
        </>
      </ButtonComponent>

      <Dialog
        title="Add Exam"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <Select
                name="examId"
                value={values.examId || "none"}
                onChange={(e) => getData(e)}
                sx={{ width: "100%", mt: 3 }}
                required
              >
                <MenuItem value="none">Select Exam</MenuItem>
                {exams.map(({ name, id }, index) => (
                  <MenuItem key={index} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <TextFields
                type="number"
                label="Question Limit"
                name="questionLimit"
                onChange={getData}
                required
              />
              <TextFields
                type="number"
                label="Duration (in minutes)"
                name="duration"
                onChange={getData}
                required
              />
              <Box>
                <CheckBox
                  name="randomiseQuestion"
                  label={
                    <Typography variant="h6">Randomize Questions</Typography>
                  }
                  onChange={check}
                />
                <CheckBox
                  name="randomiseOption"
                  label={
                    <Typography variant="h6">Randomize Options</Typography>
                  }
                  onChange={check}
                />
              </Box>
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Add Exam
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
    </>
  );
};

export default AddExam;
