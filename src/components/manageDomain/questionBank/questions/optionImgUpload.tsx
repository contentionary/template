import Typography from "@mui/material/Typography";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import Box from "@mui/material/Box";
import TextFields from "@src/components/shared/input/textField";
import Image from "@src/components/shared/image";
import { optionInt } from "./interface";
import { ChangeEvent } from "react";

interface Props {
  options: Array<optionInt>;
  setOptions: Function;
  uploadText: string;
  index: number;
}

const UpdateBackground = ({
  setOptions,
  options,
  uploadText,
  index,
}: Props) => {
  function preview(e: ChangeEvent<any>) {
    const objectUrl = e.target.files && URL.createObjectURL(e.target.files[0]);
    e.target.files && (options[index].image = [e.target.files[0], objectUrl]);
    setOptions([...options]);
    return () => objectUrl && URL.revokeObjectURL(objectUrl);
  }
  function selectImage() {
    const image = document.getElementById(`optionIamge${index}`);
    image && image.click();
  }
  function getImage() {
    if (typeof options[index].image === "string") {
      if (options[index].image.includes("http")) {
        return options[index].image;
      } else
        return `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${options[index].image}`;
    } else return options[index]?.image[1];
  }

  return (
    <>
      <TextFields
        type="file"
        id={`optionIamge${index}`}
        name="file"
        sx={{ display: "none" }}
        onChange={preview}
      />
      {options[index].image ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => selectImage()}
        >
          <Box sx={{ width: 500 }}>
            <Image
              src={getImage()}
              alt="question image"
              height="100%"
              width="100%"
              layout="responsive"
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" component="div">
            {uploadText}
          </Typography>
          <Box
            onClick={() => selectImage()}
            sx={{
              width: 170,
              height: 150,
              background: "#D9D9D9",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                background: "rgba(0, 0, 0, 0.6)",
                borderRadius: 1,
                color: "#fff",
                padding: "5px 20px",
              }}
            >
              Choose Image
            </Typography>
            <UploadFileOutlined sx={{ fontSize: 100 }} htmlColor="#888888" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateBackground;
