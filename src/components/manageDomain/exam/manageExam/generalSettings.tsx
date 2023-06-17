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
import Editor from "@src/components/shared/editor";

const GeneralSettings = ({ toggleToast }: { toggleToast: Function }) => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const styles = useStyles();
  const { exam, publicationCategories } = pageData;
  const { getData, values, submit, check, resetValues, getEditor } =
    useForm(create);
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();
  const router = useRouter();
  const { folderId } = router.query;
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
        values.image = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (folderId) values.folderId = folderId;
      convertedImage && (values.image = convertedImage);
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

    const date = new Date();
    const futureDate = date.getDate() + 3;
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString("en-CA");
  return (
    <Box mb={10}>
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
          <h1>{exam.startDate.split("T")[0]}</h1>{defaultValue}
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
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Box sx={{ width: { xs: "100", md: "33%" } }}>
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
            <Box sx={{ width: { xs: "100", md: "33%" } }}>
              <TextFields
                type="datetime-local"
                // label="Exam start date"
                name="startDate"
                value={exam.startDate.split("T")[0]}
                onChange={getData}
                sx={{ width: "100%" }}
              />
              <Typography variant="body2" component="div">
                Exam start date and time
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "100", md: "33%" } }}>
              <TextFields
                type="datetime-local"
                // defaultValue={
                //   exam?.endDate ? exam.endDate.toISOString().split("T")[0] : ""
                // }
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
            <InputLabel id="publicCategoryId">Publication category</InputLabel>
            <Select
              labelId="publicCategoryId"
              name="publicCategoryId"
              label="Publication category"
              value={values.publicCategoryId || exam.publicCategoryId || ""}
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
              Summary *
            </Typography>
            <TextArea
              required
              placeholder="Type in summary here ..."
              name="summary"
              defaultValue={exam.summary}
              onChange={getData}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={300}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>

            <Editor
              data={exam.description}
              onChange={(event: any, editor: any) =>
                getEditor(event, editor, "description")
              }
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" component="div">
              Instructions
            </Typography>
            <Editor
              data={exam.instruction}
              onChange={(event: any, editor: any) =>
                getEditor(event, editor, "instruction")
              }
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" component="div">
              Completion message
            </Typography>
            <Editor
              data={exam.completionMessage}
              onChange={(event: any, editor: any) =>
                getEditor(event, editor, "completionMessage")
              }
            />
          </Box>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <CheckBox
              label={
                <Typography variant="h6" className={styles.checkbox}>
                  Show in Search Result
                </Typography>
              }
              defaultChecked={exam.isSearchable}
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
              defaultChecked={exam.allowReview}
              className={styles.checkbox}
            />
            <CheckBox
              label={
                <Typography variant="h6" className={styles.checkbox}>
                  Show Correction
                </Typography>
              }
              onChange={check}
              defaultChecked={exam.showCorrection}
              name="showCorrection"
              className={styles.checkbox}
            />
          </Stack>
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload exam logo"
            defaultImage={exam.image}
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

export default GeneralSettings;
