import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { handleError, queryClient, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import { BasePageProps } from "@src/utils/interface";
import dynamic from "next/dynamic";
import useForm from "@src/utils/hooks/useForm";
import TextFields from "@src/components/shared/input/textField";

const PreparatoryExamSettings = ({
  toggleToast,
}: {
  toggleToast: Function;
}) => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { exam } = pageData;
  const { values, check, getData, submit } = useForm(update);
  const [isLoading, setIsLoading] = useState(false);
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function update() {
    try {
      setIsLoading(true);
      await request.patch({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}`,
        data: values,
      });
      toggleToast("Update successfull");
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Preparatory Exam Mode
      </Typography>
      <form onSubmit={(e) => submit(e)}>
        <Stack spacing={3}>
          <Typography variant="body2">
            The Preparatory Exam Mode is made for practice and preparatory
            exams, where you allow your candidates to do any of the allowed
            configurations.
          </Typography>
          <Box>
            <CheckBox
              label={
                <Typography variant="h6">
                  Allow candidates to re-attempt preparatory exam
                </Typography>
              }
              name="allowReattempt"
              defaultChecked={exam.allowReattempt}
              onChange={check}
            />
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="h6">
                How many times do you want candidate to re-attempt the exam?
              </Typography>
              <TextFields
                name="maximumAttempt"
                onChange={getData}
                sx={{ width: 80 }}
                defaultValue={exam.maximumAttempt}
              />
            </Stack>
          </Box>
          <Box>
            <CheckBox
              label={
                <Typography variant="h6">
                  Allow candidates to pause time while taking practice exam
                </Typography>
              }
              name="allowTimerPause"
              defaultChecked={exam.allowTimerPause}
              onChange={check}
            />
          </Box>
          <Box>
            <CheckBox
              label={
                <Typography variant="h6">
                  Allow candidates to set exam duration before practice
                </Typography>
              }
              name="allowCustomDuration"
              defaultChecked={exam.allowCustomDuration}
              onChange={check}
            />
          </Box>
          <Box>
            <CheckBox
              label={
                <Typography variant="h6">
                  Allow candidates to set number of questions to practice with
                  per time
                </Typography>
              }
              name="allowCustomQuestionLength"
              defaultChecked={exam.allowCustomQuestionLength}
              onChange={check}
            />
          </Box>

          <Box>
            <CheckBox
              label={
                <Typography variant="h6">
                  Allow candidates to see correction after submission
                </Typography>
              }
              name="showCorrection"
              defaultChecked={exam.showCorrection}
              onChange={check}
            />
          </Box>

          {cachedData.centre.subscriptionModel != "SUBSCRIPTION" && (
            <>
              <Typography
                variant="h4"
                component="div"
                sx={{ textAlign: "center", mb: 3 }}
              >
                Add Exam Price
              </Typography>
              <Stack spacing={4}>
                <Typography>
                  Add the amount candidates will pay as subscription fee
                </Typography>
                <TextFields
                  sx={{ width: 400 }}
                  label="Enter Amount in Naira"
                  onChange={getData}
                  defaultValue={exam.price}
                  name="price"
                />
              </Stack>
            </>
          )}
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ padding: 1, fontSize: 20 }}
          >
            <>
              Update
              {isLoading && <Loading size={15} sx={{ color: "#fff", ml: 2 }} />}
            </>
          </ButtonComponent>
        </Stack>
      </form>
    </Box>
  );
};

export default PreparatoryExamSettings;
