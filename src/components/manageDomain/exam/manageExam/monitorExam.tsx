import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useToast } from "@src/utils/hooks";
import { useState } from "react";
import { handleError, queryClient, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import { BasePageProps } from "@src/utils/interface";
import dynamic from "next/dynamic";

const MonitorExam = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { exam } = pageData;
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function update(value: {}) {
    try {
      setIsLoading(true);
      await request.patch({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}`,
        data: value,
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
            checked={exam.allowSearch}
            onChange={(e: ChangeEvent<any>) =>
              update({ randomiseQuestion: e.target.checked })
            }
          />
          <CheckBox
            label={<Typography variant="h6">Randomize Options</Typography>}
            onChange={(e: ChangeEvent<any>) =>
              update({ randomiseOptions: e.target.checked })
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
          onChange={(e: ChangeEvent<any>) =>
            update({ allowResume: e.target.checked })
          }
        />
      </Stack>

      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "center", mb: 3 }}
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
                : update({ hasProctor: true })
            }
          >
            <>Activate Proctored Supervision {isLoading && <Loading />}</>
          </ButtonComponent>
        </Box>

        <Typography>
          Note: Activating Proctored Technology requires a ₦100 per exam
          candidate charge.
        </Typography>
      </Stack>

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};

export default MonitorExam;
