import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import Button from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { PublicationCategoryInt } from "@src/utils/interface";

const CreatePublication = ({ centreId }: { centreId: string }) => {
  const styles = useStyles();
  const [listOfCategory, setListOfCategory] = useState<
    PublicationCategoryInt[]
  >([]);

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, getFile } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);

  const getCategory = async () => {
    try {
      const { data = [] } = await request.get({
        url: "/publication-categories",
      });
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
      <Button
        onClick={() => getCategory()}
        disableElevation
        className={styles.createPublication}
      >
        Create publication
      </Button>

      <Dialog
        title="Create Publication "
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="Publication name"
                name="name"
                onChange={getData}
                inputProps={{ maxLength: 35 }}
              />

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
                <Select name="categoryId">
                  {listOfCategory?.map((category, index) => (
                    <MenuItem
                      key={`${index}-catygory`}
                      value={category.name}
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
            </Stack>
            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent type="submit">
                <>
                  Create publication
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

export default CreatePublication;