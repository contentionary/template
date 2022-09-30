import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

import { useDialog } from "@src/hooks";
import { useState } from "react";
import { cache, handleError, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import { CentreProps } from "@src/pages/manage-domain/[centreId]";
import axios from "axios";
import ButtonComponent from "@src/components/shared/button";

interface Props {
  centre: CentreProps;
  setCentre: Function;
}

const UpdateCentre = ({ centre, setCentre }: Props) => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(update);
  const [isLoading, setIsLoading] = useState(false);

  async function update() {
    try {
      setIsLoading(true);
      console.log(cache.get("token"));
      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `bearer ${cache.get("token")}`,
      };
      const data = await axios({
        method: "PATCH",
        url: `https://centre-api.contentionary.com/v1/centre/6d3b16d0-3c2c-11ed-a144-1b3dbfe593a5`,
        headers,
        data: values,
      });
      console.log(data);
      // const data = await request.get({
      //   url: `/centre/${centre.id}`,
      //   data: values,
      //   method: "PATCH",
      // });
      // setCentre({ ...data.data });
      // toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      console.log(error);
      // toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  function UpdateCentre() {
    centre.name && (values.name = centre.name);
    centre.description && (values.description = centre.description);
    centre.phoneNumber && (values.phoneNumber = centre.phoneNumber);
    centre.emailAddress && (values.emailAddress = centre.emailAddress);
    centre.price && (values.price = centre.price);
    centre.address && (values.address = centre.address);
    centre.websiteUrl && (values.websiteUrl = centre.websiteUrl);
    centre.description && (values.description = centre.description);
    openDialog();
  }

  return (
    <>
      <ListItem disablePadding onClick={() => UpdateCentre()}>
        <ListItemButton sx={{ pl: 5 }}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#616161",
              fontWeight: 400,
              fontSize: 14,
              fontStyle: "normal",
            }}
            primary="Edit Centre"
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        title="Centre Update "
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack>
              {centre.id}
              <TextFields
                type="text"
                label="Centre name"
                name="name"
                defaultValue={values?.name}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
                inputProps={{ maxLength: 20 }}
              />
              <TextFields
                type="text"
                label="Centre phone number"
                name="phoneNumber"
                defaultValue={values?.phoneNumber}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
              />
              <TextFields
                type="text"
                label="Centre Email Address"
                name="emailAddress"
                defaultValue={values?.emailAddress}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
              />
              <TextFields
                type="number"
                label="Centre Price"
                name="price"
                defaultValue={values?.price}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
              />

              <TextFields
                type="text"
                label="Centre address"
                name="address"
                defaultValue={values?.address}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
              />
              <TextFields
                type="text"
                label="Website Url (https://example.com)"
                name="websiteUrl"
                defaultValue={values?.websiteUrl}
                onChange={getData}
                sx={{ width: 500, marginTop: 3 }}
              />
              <Typography variant="body2" component="p">
                Description
              </Typography>
              <TextArea
                placeholder="description"
                maxRows={4}
                name="description"
                defaultValue={values?.description}
                onChange={getData}
                maxLength={200}
                style={{
                  width: 500,
                  marginTop: 20,
                  padding: "20px 10px",
                  borderRadius: 5,
                }}
              />
            </Stack>
            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent type="submit">
                <>
                  Update Centre
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

export default UpdateCentre;
