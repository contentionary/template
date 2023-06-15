import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { BasePageProps, LeagueInt } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Editor from "@src/components/shared/editor";

const UpdateLeague = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const styles = useStyles();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, getEditor } = useForm(Update);
  const { league } = pageData as {
    league: LeagueInt;
  };
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [convertedFile, setConvertedFile] = useState<any>();
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const LeagueMenu = dynamic(() => import("./leagueMenu"));
  const router = useRouter();
  const { type, folderId } = router.query;
  async function Update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const image = await uploadFiles(img.base64, setImageLoadingProgress);
        values.image = image;
        setConvertedImage(image);
      }
      if (folderId) values.folderId = folderId;
      values.type = type;
      if (values.tags) values.tags = values.tags.split(",");
      convertedFile && (values.fileUrl = convertedFile);
      convertedImage && (values.image = convertedImage);
      delete values.type;
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/league/${league.id}`,
        data: values,
      });
      toggleToast(data.message);
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
        </Typography>
        <LeagueMenu centreId={cachedData.centre.id} id={league.id} />
      </Box>

      <Typography
        variant="h4"
        component="div"
        style={{
          textTransform: "uppercase",
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Update {type}
      </Typography>
      <form onSubmit={(e) => submit(e)} style={{ marginTop: 40 }}>
        <Stack spacing={3} mt={3}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            defaultValue={league.name}
            onChange={getData}
            inputProps={{ maxLength: 35 }}
            required
          />
          {type != "FOLDER" && (
            <>
              {cachedData.centre.subscriptionModel != "SUBSCRIPTION" && (
                <TextFields
                  type="number"
                  label="league Price"
                  defaultValue={league.price}
                  name="price"
                  onChange={getData}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ width: "49%" }}>
                  <TextFields
                    type="datetime-local"
                    name="startDate"
                    onChange={getData}
                    fullWidth
                  />
                  <Typography variant="body2" component="div">
                    Exam start date and time
                  </Typography>
                </Box>
                <Box sx={{ width: "49%" }}>
                  <TextFields
                    type="datetime-local"
                    name="endDate"
                    onChange={getData}
                    fullWidth
                  />
                  <Typography variant="body2" component="div">
                    Exam end date and time
                  </Typography>
                </Box>
              </Box>
              <Box>
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Show in search result
                    </Typography>
                  }
                  checked={league.isSearchable}
                  value={values.isSearchable}
                  name="isSearchable"
                  onChange={(e: ChangeEvent<any>) => {
                    league.isSearchable = e.target.checked;
                    check(e);
                  }}
                  className={styles.checkbox}
                />
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Allow review
                    </Typography>
                  }
                  checked={league.allowReview}
                  value={values.allowReview}
                  onChange={(e: ChangeEvent<any>) => {
                    league.allowReview = e.target.checked;
                    check(e);
                  }}
                  name="allowReview"
                  className={styles.checkbox}
                />
              </Box>
            </>
          )}

          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>
            <Editor
              data={league.description}
              onChange={(event: any, editor: any) =>
                getEditor(event, editor, "description")
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" component="div">
              Summary (Not more than 250 characters)*
            </Typography>
            <TextArea
              required
              placeholder="Type in summary here ..."
              name="summary"
              onChange={getData}
              defaultValue={league.summary}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={250}
            />
          </Box>

          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload exam logo"
            defaultImage={league.image}
            aspect={2 / 3}
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 25 }}>
          <ButtonComponent
            type="submit"
            sx={{ fontSize: 18 }}
            variant="contained"
          >
            {type === "FOLDER" ? "Update folder" : "Update league"}
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
      <Loading
        open={isLoading}
        color="primary"
        size={100}
        sx={{ marginLeft: 2 }}
        value={fileLoadingProgres || imageLoadingProgres}
      />
    </Box>
  );
};

export default UpdateLeague;
