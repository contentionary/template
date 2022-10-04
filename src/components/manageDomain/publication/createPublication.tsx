import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem, Select } from "@mui/material";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

import { useState } from "react";
import {
  getFileKey,
  handleError,
  queryClient,
  request,
  uploadFiles,
} from "@src/utils";
import Loading from "@src/components/shared/loading/loadingWithValue";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { BasePageProps, PublicationCategoryInt } from "@src/utils/interface";
import { ArrowBackIosNewOutlined, CloseOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import ImageUpload from "@src/components/shared/imageUpload";

const CreatePublication = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  const styles = useStyles();

  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, resetValues } = useForm(create);
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [convertedFile, setConvertedFile] = useState<any>();
  const [file, setFile] = useState<Record<string, any>>();
  const [tableOfContents, setTableOfContent] = useState([
    { title: "", pageNo: 0 },
  ]);
  const [authors, setAuthors] = useState([{ name: "", imageUrl: "" }]);

  const router = useRouter();
  const { type, folderId } = router.query;

  const getFile = (e: ChangeEvent<any>) => {
    setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  };

  async function create() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(
          getFileKey("png"),
          img.base64,
          setImageLoadingProgress
        );
        values.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (file && !convertedFile) {
        const fileUrl = await uploadFiles(
          getFileKey(file.fileUrl),
          file.fileUrl,
          setFileLoadingProgress
        );
        values.fileUrl = fileUrl;
        setConvertedFile(fileUrl);
      }

      if (authors.length && authors[0].name) {
        values.authors = authors;
      }
      if (values.learnings && typeof values.learnings === "string") {
        values.learnings = values.learnings.split(",");
      }
      if (tableOfContents && tableOfContents[0].title) {
        values.tableOfContents = tableOfContents;
      }
      if (folderId) values.folderId = folderId;
      values.type = type;
      convertedFile && (values.fileUrl = convertedFile);
      convertedImage && (values.imageUrl = convertedImage);
      const data = await request.post({
        url:
          type === "FOLDER"
            ? `/centre/${cachedData.centre.id}/publication-folder`
            : `/centre/${cachedData.centre.id}/publication`,
        data: values,
      });
      toggleToast(data.message);
      resetValues();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6}>
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
          textTransform: "uppercase",
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Create {type}
      </Typography>
      <form onSubmit={(e) => submit(e)} style={{ marginTop: 40 }}>
        <Stack spacing={3} mt={3}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            onChange={getData}
            inputProps={{ maxLength: 100 }}
            required
          />

          {type != "FOLDER" && (
            <>
              <TextFields
                type="number"
                label="Publication Price"
                name="price"
                onChange={getData}
              />
              <Stack>
                <Typography variant="body1" component="p">
                  Select Category
                </Typography>
                <Select name="publicationCategoryId">
                  {pageData.publicationCategories?.map(
                    (category: PublicationCategoryInt, index: number) => (
                      <MenuItem
                        key={`${index}-catygory`}
                        value={category.id}
                        onClick={() =>
                          (values.publicationCategoryId = category.id)
                        }
                        id={category.id}
                      >
                        {category.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Stack>
              <Box>
                <Typography variant="caption" component="div">
                  Add learnings by seperating it with comma (,)
                </Typography>
                <TextFields
                  type="text"
                  label="Publication learnings"
                  name="learnings"
                  onChange={getData}
                  sx={{ width: "100%", mt: 1 }}
                />
              </Box>
            </>
          )}

          <TextFields
            type="text"
            label="Publication tags"
            name="tags"
            onChange={getData}
          />

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
              maxLength={5000}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" component="div">
              Summary *
            </Typography>
            <TextArea
              required
              placeholder="Type in summary here ..."
              name="summary"
              onChange={getData}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={250}
            />
          </Box>

          {type != "FOLDER" && (
            <>
              <Box>
                <Typography variant="subtitle1" component="div">
                  Table of contents
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" component="div">
                    Click add more content, to add more titles and pages
                  </Typography>
                  <ButtonComponent
                    onClick={() =>
                      setTableOfContent([
                        ...tableOfContents,
                        { title: "", pageNo: 0 },
                      ])
                    }
                  >
                    Add more content
                  </ButtonComponent>
                </Box>
                {tableOfContents.map(({}, index) => (
                  <Box
                    key={`${index}-content`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TextFields
                      type="text"
                      label="Title"
                      name="title"
                      onChange={(e: ChangeEvent<any>) => {
                        tableOfContents[index].title = e.target.value;
                        setTableOfContent([...tableOfContents]);
                      }}
                      sx={{ width: "78%" }}
                    />
                    <TextFields
                      type="number"
                      label="Page number"
                      name="pageNo"
                      onChange={(e: ChangeEvent<any>) => {
                        tableOfContents[index].pageNo = e.target.value;
                        setTableOfContent([...tableOfContents]);
                      }}
                      sx={{ width: "16%" }}
                    />
                    <Box sx={{ width: "5%" }}>
                      <IconButton
                        onClick={() => {
                          tableOfContents.splice(index, 1);
                          setTableOfContent([...tableOfContents]);
                        }}
                      >
                        <CloseOutlined htmlColor="red" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>{" "}
              <Box>
                <Typography variant="subtitle1" component="div">
                  Authors
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" component="div">
                    Click add more authors, to add more authors
                  </Typography>
                  <ButtonComponent
                    onClick={() =>
                      setAuthors([...authors, { name: "", imageUrl: "" }])
                    }
                  >
                    Add more authors
                  </ButtonComponent>
                </Box>
                {authors.map(({}, index) => (
                  <Box
                    key={`${index}-content`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <TextFields
                      type="text"
                      label="name"
                      name="title"
                      onChange={(e: ChangeEvent<any>) => {
                        authors[index].name = e.target.value;
                        setAuthors([...authors]);
                      }}
                      sx={{ width: "78%" }}
                    />
                    <Box sx={{ width: "5%" }}>
                      <IconButton
                        onClick={() => {
                          authors.splice(index, 1);
                          setAuthors([...authors]);
                        }}
                      >
                        <CloseOutlined htmlColor="red" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
              <TextFields
                type="file"
                label="Pdf File"
                name="fileUrl"
                onChange={getFile}
              />
              <Stack direction="row" spacing={3}>
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Show in search result
                    </Typography>
                  }
                  name="allowSearch"
                  onChange={check}
                  className={styles.checkbox}
                />
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Allow read
                    </Typography>
                  }
                  name="allowRead"
                  onChange={check}
                  className={styles.checkbox}
                />
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Allow download
                    </Typography>
                  }
                  name="allowDownload"
                  onChange={check}
                  className={styles.checkbox}
                />
              </Stack>
            </>
          )}
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload centre logo"
            defaultImage=""
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
            <>
              Create {type === "FOLDER" ? "folder" : "publication"}
              {isLoading && (
                <Loading
                  color="primary"
                  size={35}
                  sx={{ marginLeft: 2 }}
                  value={fileLoadingProgres || imageLoadingProgres}
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

export default CreatePublication;
