import React, { FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "../styles";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CreateCourse = ({ toggleToast }: { toggleToast: Function }) => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const styles = useStyles();
  const { exam, publicationCategories } = pageData;
  const { getData, values, submit, check, resetValues } = useForm(create);
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();
  const router = useRouter();
  const { type, folderId } = router.query;
  const ImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  async function create() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setProgress);
        values.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (folderId) values.folderId = folderId;
      values.type = type;
      convertedImage && (values.imageUrl = convertedImage);
      await request.patch({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}`,
        data: values,
      });
      toggleToast("Update successfull");
      resetValues(formEvent);
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <form
        onSubmit={(e) => {
          submit(e);
          setFormEvent(e);
        }}
        style={{ marginTop: 40 }}
      >
        <Stack spacing={4} mt={3}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            General Exam Settings
          </Typography>
          <Box>
            <TextFields
              type="text"
              label="Name"
              name="name"
              defaultValue={exam.name}
              onChange={getData}
              inputProps={{ maxLength: 60 }}
              sx={{ width: "100%" }}
              required
            />
            <Typography variant="body2" component="div">
              (Not more than 60 characters)
            </Typography>
          </Box>
          <Stack direction="row" spacing={3}>
            <Box sx={{ width: "33%" }}>
              <TextFields
                type="number"
                label="Exam duration"
                name="duration"
                defaultValue={exam.duration}
                onChange={getData}
                sx={{ width: "100%" }}
              />
              <Typography variant="body2" component="div">
                Duration is in Minutes
              </Typography>
            </Box>
            <Box sx={{ width: "32%" }}>
              <TextFields
                type="datetime-local"
                label="Exam start date"
                name="startDate"
                onChange={getData}
                sx={{ width: "100%" }}
              />
              <Typography variant="body2" component="div">
                Exam start date and time
              </Typography>
            </Box>
            <Box sx={{ width: "32%" }}>
              <TextFields
                type="datetime-local"
                label="Exam end date"
                name="endDate"
                onChange={getData}
                sx={{ width: "100%" }}
              />
              <Typography variant="body2" component="div">
                Exam end date and time
              </Typography>
            </Box>
          </Stack>
          <FormControl fullWidth>
            <InputLabel>Publication category</InputLabel>
            <Select
              name="publicationCategoryId"
              value={values.publicationCategoryId || exam.publicationCategoryId}
              onChange={(e) => getData(e)}
            >
              {publicationCategories?.map(
                ({ name, id }: { name: string; id: string }, index: number) => (
                  <MenuItem key={`${index}-catygory`} value={id} id={id}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
            <Typography variant="body2" component="div">
              Click the dropdown to select a category for your exam (None
              category goes to Others)
            </Typography>
          </FormControl>

          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>
            <TextArea
              required
              placeholder="Type in description here ..."
              name="description"
              defaultValue={exam.description}
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
          <Box>
            <Typography variant="subtitle1" component="div">
              Instructions *
            </Typography>
            <TextArea
              required
              placeholder="Type in instructions here ..."
              name="instruction"
              defaultValue={exam.instruction}
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
          <Box>
            <Typography variant="subtitle1" component="div">
              Completion message *
            </Typography>
            <TextArea
              required
              placeholder="Type in completion message here ..."
              name="completionMessage"
              defaultValue={exam.completionMessage}
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
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <CheckBox
              label={
                <Typography variant="h6" className={styles.checkbox}>
                  Show in Search Result
                </Typography>
              }
              checked={exam.allowSearch}
              value={values.allowSearch}
              name="isSearchable"
              onChange={check}
              className={styles.checkbox}
            />
            <CheckBox
              label={
                <Typography variant="h6" className={styles.checkbox}>
                  Allow Review
                </Typography>
              }
              onChange={check}
              name="allowReview"
              className={styles.checkbox}
            />
            <CheckBox
              label={
                <Typography variant="h6" className={styles.checkbox}>
                  Show Correction
                </Typography>
              }
              onChange={check}
              name="showCorrection"
              className={styles.checkbox}
            />
          </Stack>
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload exam logo"
            defaultImage={exam.imageUrl}
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            Update Exam
          </ButtonComponent>
        </Typography>
      </form>

     
      <Loading
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        color="primary"
        size={100}
        value={progress}
      />
    </Box>
  );
};

export default CreateCourse;
