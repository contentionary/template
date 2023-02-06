import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { handleError, queryClient, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import { BasePageProps } from "@src/utils/interface";
import dynamic from "next/dynamic";

const MonitorExam = ({ toggleToast }: { toggleToast: Function }) => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { exam } = pageData;
  const [isLoading, setIsLoading] = useState(false);
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function update(key: any, value: any) {
    try {
      setIsLoading(true);
      let data: Record<string, any> = {};
      data[key] = value;
      await request.patch({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}`,
        data,
      });
      exam[key] = value;
      toggleToast("Update successful");
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  async function activateProctoring() {
    try {
      setIsLoading(true);
      await request.post({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}/activate-proctoring`,
      });
      exam.hasProctor = true;
      toggleToast("Update successful");
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
        Secure and Monitor Exam
      </Typography>
      <Stack spacing={3}>
        <Typography variant="body2">
          Activate the question and question’s options randomization to allow
          your exam shuffle the exam question numbers and options when
          candidates are taking your exam.
        </Typography>
        <Box>
          <CheckBox
            label={<Typography variant="h6">Randomize Questions</Typography>}
            defaultChecked={exam.randomiseQuestion}
            onChange={(e: ChangeEvent<any>) =>
              update("randomiseQuestion", e.target.checked)
            }
          />
          <CheckBox
            label={<Typography variant="h6">Randomize Options</Typography>}
            defaultChecked={exam.randomiseOption}
            onChange={(e: ChangeEvent<any>) =>
              update("randomiseOption", e.target.checked)
            }
          />
        </Box>

        <Typography variant="body2">
          Activate the resumption of exams if candidates put off their device to
          allow candidate continue from where they stopped if their mistakenly
          leave the exam environment.
        </Typography>
        <CheckBox
          label={
            <Typography variant="h6">
              Activate resumption of exams if candidates put off their device
            </Typography>
          }
          defaultChecked={exam.allowResume}
          onChange={(e: ChangeEvent<any>) =>
            update("allowResume", e.target.checked)
          }
        />
      </Stack>

      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "center", mb: 3, mt: 5 }}
      >
        Activate Proctoring Technology
      </Typography>
      <Stack spacing={3}>
        <Typography>
          When you activate proctored technology, the system will randomly take
          shots of candidates taking the exam.
        </Typography>
        <Box>
          <ButtonComponent
            variant="outlined"
            onClick={() =>
              exam.hasProctor
                ? toggleToast("Proctoring has been activated")
                : activateProctoring()
            }
          >
            {!exam.hasProctor
              ? "Activate Proctored Supervision"
              : "Proctored Supervision Activated"}
          </ButtonComponent>
        </Box>

        <Typography>
          Note: Activating Proctored Technology requires a ₦100 per exam
          candidate charge.
        </Typography>
      </Stack>
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {isLoading && <Loading />}
      </Typography>
    </Box>
  );
};

export default MonitorExam;
