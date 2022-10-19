import React, { FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import { useState } from "react";
import { handleError, queryClient, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CreateCourse = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, resetValues } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();

  const router = useRouter();
  const { type, folderId } = router.query;
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function create() {
    try {
      setIsLoading(true);
      if (folderId) values.folderId = folderId;
      await request.post({
        url:
          type === "FOLDER"
            ? `/centre/${cachedData.centre.id}/question-bank-folder`
            : `/centre/${cachedData.centre.id}/question-bank`,
        data: values,
      });
      toggleToast("Created successfully");
      resetValues(formEvent);
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <Typography
        onClick={() => router.back()}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
      </Typography>
      <Typography
        variant="h4"
        component="p"
        style={{
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Create {type}
      </Typography>
      <form
        onSubmit={(e) => {
          submit(e);
          setFormEvent(e);
        }}
        style={{ marginTop: 40 }}
      >
        <Stack spacing={3} mt={3}>
          <Box>
            <TextFields
              type="text"
              label="Name"
              name="name"
              onChange={getData}
              inputProps={{ maxLength: 100 }}
              sx={{ width: "100%" }}
              required
            />
            <Typography variant="body2" component="div">
              (Not more than 100 characters)
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>
            <TextArea
              required
              placeholder="Type in description here ..."
              name="description"
              onChange={getData}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={10000}
            />
          </Box>
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            <>
              Create &nbsp;
              {isLoading && (
                <Loading
                  sx={{
                    color: "#fff",
                  }}
                  size={15}
                />
              )}
            </>
          </ButtonComponent>
        </Typography>
      </form>

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

export default CreateCourse;
