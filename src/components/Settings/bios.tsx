import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useState } from "react";
import {
  AuthUpdate,
  cache,
  handleError,
  request,
  uploadFiles,
} from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import { UserInt } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Bios = ({
  toggleToast,
  user,
}: {
  toggleToast: Function;
  user: UserInt;
}) => {
  const { getData, values, submit } = useForm(create);
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const router = useRouter();
  user = user || cache.get("user");
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
        values.avatar = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (folderId) values.folderId = folderId;
      convertedImage && (values.avatar = convertedImage);
      await request.post({
        url: "/auth/update",
        data: values,
        method: "PATCH",
      });
      AuthUpdate();
      toggleToast("Update successfull");
      router.replace({
        query: { ...router.query },
      });
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mb={10}>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
        style={{ marginTop: 40 }}
      >
        <Stack spacing={4} mt={3}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Bio Settings
          </Typography>
          <TextFields
            type="text"
            label="Firstname"
            name="firstname"
            defaultValue={values.firstname || user.firstname || ""}
            onChange={getData}
            inputProps={{ maxLength: 60 }}
            sx={{ width: "100%" }}
            required
          />
          <TextFields
            type="text"
            label="Surname"
            name="surname"
            defaultValue={values.surname || user.surname || ""}
            onChange={getData}
            inputProps={{ maxLength: 60 }}
            sx={{ width: "100%" }}
            required
          />

          <FormControl fullWidth>
            <InputLabel id="gender">Selet your gender</InputLabel>
            <Select
              labelId="gender"
              name="gender"
              label="Select gender"
              value={values.gender || user.gender || ""}
              onChange={(e) => getData(e)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload exam logo"
            defaultImage={user.avatar}
          />
        </Stack>
        <Typography sx={{ textAlign: "center", marginTop: 4 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            Update Bio
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

export default Bios;
