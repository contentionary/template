import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import CheckBox from "@src/components/shared/checkInput";
import { useDialog } from "@src/hooks";
import { handleError, queryClient, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { BasePageProps, ExamInt } from "@src/utils/interface";

const AddExam = ({
  toggleToast,
  leagueId,
  refetch,
  exam,
}: {
  toggleToast: Function;
  refetch: Function;
  leagueId: string;
  exam: ExamInt;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit, check } = useForm(create);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/league/${leagueId}/exam/${exam.id}`,
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

  return (
    <>
      <IconButton onClick={() => openDialog()}>
        <EditOutlined htmlColor="white" />
      </IconButton>

      <Dialog
        title="Update League Exam"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="number"
                label="Question Limit"
                name="questionLimit"
                defaultValue={exam.questionLimit}
                onChange={getData}
                required
              />
              <TextFields
                type="number"
                label="Duration"
                name="duration"
                defaultValue={exam.duration}
                onChange={getData}
                required
              />
              <Box>
                <CheckBox
                  name="randomiseQuestion"
                  defaultChecked={exam.randomiseQuestion}
                  label={
                    <Typography variant="h6">Randomize Questions</Typography>
                  }
                  onChange={check}
                />
                <CheckBox
                  name="randomiseOption"
                  defaultChecked={exam.randomiseOption}
                  label={
                    <Typography variant="h6">Randomize Options</Typography>
                  }
                  onChange={check}
                />
              </Box>
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Update
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
