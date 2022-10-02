import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import { MenuItem, Select } from "@mui/material";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

import { useDialog } from "@src/hooks";
import { useState } from "react";
import { handleError, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { PublicationCategoryInt, PublicationInt } from "@src/utils/interface";

const UpdatePublication = ({
  centreId,
  publication,
}: {
  centreId: string;
  publication: PublicationInt;
}) => {
  const styles = useStyles();
  const [listOfCategory, setListOfCategory] = useState<
    PublicationCategoryInt[]
  >([]);

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, getFile } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const getCategory = async () => {
    try {
      const { data } = await request.get({ url: "/publication-categories" });
      setListOfCategory(data as PublicationCategoryInt[]);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  };

  async function create() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${centreId}/publication`,
        data: values,
      });
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
        <EditOutlined htmlColor="#616161" />
      </IconButton>

      <Dialog
        title="Update Publication "
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="Publication name"
                name="name"
                defaultValue={publication?.name}
                onChange={getData}
                inputProps={{ maxLength: 35 }}
              />

              <TextFields
                type="number"
                label="Publication Price"
                name="price"
                defaultValue={publication?.price}
                onChange={getData}
              />
              <Stack>
                <Typography variant="body1" component="p">
                  Select Category
                </Typography>
                <Select name="categoryId">
                  {listOfCategory?.map((category, index) => (
                    <MenuItem
                      key={`${index}-catygory`}
                      value={publication.name}
                      onClick={() => (values.categoryId = category.id)}
                      id={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Box>
                <Typography>Description</Typography>
                <TextArea
                  placeholder="Type in description here ..."
                  name="description"
                  defaultValue={publication?.description}
                  onChange={getData}
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 5,
                    padding: 15,
                  }}
                />
              </Box>

              <TextFields
                type="file"
                label="Pdf File"
                name="pdfFile"
                defaultValue={publication?.fileUrl}
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
                  value={publication.allowSearch}
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
                  value={publication.allowRead}
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
                  // value={plugins.COURSE}
                  onChange={check}
                  className={styles.checkbox}
                />
              </Stack>
            </Stack>
            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent type="submit">
                <>
                  Update publication
                  {isLoading && (
                    <Loading color="primary" size={12} sx={{ marginLeft: 2 }} />
                  )}
                </>
              </ButtonComponent>
              <ButtonComponent onClick={() => closeDialog()}>
                Cancel
              </ButtonComponent>
            </Typography>
          </form>
        }
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default UpdatePublication;
