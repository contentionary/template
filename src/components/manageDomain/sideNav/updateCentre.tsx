import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import Container from "@mui/material/Container";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import ButtonComponent from "@src/components/shared/button";

import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import { BasePageProps, CentreProps } from "@src/utils/interface";
import { useRouter } from "next/router";
// import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";

const UpdateCentre = () => {
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(update);
  const [isLoading, setIsLoading] = useState(false);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const [img, setImg] = useState<Record<string, any>>({});
  const [convertedImage, setConvertedImage] = useState<any>();
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const ImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const router = useRouter();
  // const [value, setValue] = useState("");
  const { centre } = cachedData as unknown as {
    centre: CentreProps;
  };

  async function update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setImageLoadingProgress);
        values.logo = imageUrl;
        setConvertedImage(imageUrl);
      }
      const data = await request.patch({
        data: values,
        url: `/centre/${centre.id}`,
      });
      toggleToast(data.message);
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="md">
      <Typography
        onClick={() => router.back()}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginTop: 30,
        }}
      >
        <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
      </Typography>
      <Typography
        variant="h4"
        component="p"
        style={{
          textTransform: "uppercase",
          marginTop: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Update Domain
      </Typography>
      <form onSubmit={(e) => submit(e)}>
        <Stack spacing={3} mb={2}>
          <TextFields
            type="text"
            label="Centre name"
            name="name"
            defaultValue={centre.name}
            onChange={getData}
            inputProps={{ maxLength: 20 }}
          />
          <TextFields
            type="text"
            label="Centre phone number"
            name="phoneNumber"
            defaultValue={centre?.phoneNumber}
            onChange={getData}
          />
          {/* <label >Phone number *</label>
          <PhoneInput
            placeholder="Centre phone number"
            country="ng"
            enableSearch={true}
            value={value}
            onChange={(e: string) => setValue(e)}
            inputStyle={{
              marginLeft: "7%",
              padding: 28,
              color: "#888888",
              width: "93%",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            inputProps={{
              name: "phoneNumber",
              required: true,
            }}
            dropdownStyle={{
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              color: "#616161",
            }}
            containerStyle={{ marginTop: 0 }}
            buttonStyle={{
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          /> */}
          <TextFields
            type="text"
            label="Centre Email Address"
            name="emailAddress"
            defaultValue={centre?.emailAddress}
            onChange={getData}
          />
          <TextFields
            type="number"
            label="Centre Price"
            name="price"
            defaultValue={centre?.price}
            onChange={getData}
          />
          <TextFields
            type="text"
            label="Centre address"
            name="address"
            defaultValue={centre?.address}
            onChange={getData}
          />
          <TextFields
            type="text"
            label="Website Url (https://example.com)"
            name="websiteUrl"
            defaultValue={centre?.websiteUrl}
            onChange={getData}
          />
          <Stack>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ marginTop: 20, width: "100%" }}
            >
              Summary
            </Typography>
            <TextArea
              placeholder="summary"
              maxRows={4}
              name="summary"
              defaultValue={centre?.summary}
              onChange={getData}
              maxLength={200}
              minLength={75}
              style={{
                padding: "20px 10px",
                borderRadius: 5,
                height: 120,
              }}
            />
          </Stack>
          <Stack>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ marginTop: 20, width: "100%" }}
            >
              Description
            </Typography>
            <TextArea
              placeholder="description"
              maxRows={4}
              name="description"
              defaultValue={centre?.description}
              onChange={getData}
              maxLength={200}
              style={{
                padding: "20px 10px",
                borderRadius: 5,
                height: 120,
              }}
            />
          </Stack>
        </Stack>

        <ImageUpload
          setImg={setImg}
          img={img}
          uploadText="Edit logo"
          defaultImage={centre.logo}
        />

        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
            <>
              Update Centre
              {isLoading && (
                <Loading
                  color="primary"
                  value={imageLoadingProgres}
                  size={12}
                  sx={{ marginLeft: 2 }}
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
    </Container>
  );
};

export default UpdateCentre;
