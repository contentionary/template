import Typography from "@mui/material/Typography";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import Box from "@mui/material/Box";
import TextFields from "@src/components/shared/input/textField";
import Image from "@src/components/shared/image";
import { ChangeEvent } from "react";

interface Props {
  img: Record<string, any>;
  setImg: Function;
  uploadText: string;
  id?: string
}

const QuestionImageUpload = ({ setImg, img, uploadText, id }: Props) => {
  function preView(e: ChangeEvent<any>) {
    const objectUrl = e.target.files && URL.createObjectURL(e.target.files[0]);
    setImg({
      preview: objectUrl,
      rawImg: e.target.files ? e.target.files[0] : "",
    });
    return () => objectUrl && URL.revokeObjectURL(objectUrl);
  }
  function selectImage() {
    const image = document.getElementById(id || "backgroundImage");
    image && image.click();
  }
  return (
    <>
      <TextFields
        type="file"
        id={id || "backgroundImage"}
        name="file"
        sx={{ display: "none" }}
        onChange={(e) => preView(e)}
      />
      {img?.preview ? (
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
              src={img?.preview}
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

export default QuestionImageUpload;
