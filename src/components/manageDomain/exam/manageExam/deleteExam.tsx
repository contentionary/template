import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextFields from "@src/components/shared/input/textField";
import { copy, handleError, queryClient, request } from "@src/utils";
import { useState } from "react";
import { useRouter } from "next/router";
import ButtonComponent from "@src/components/shared/button";
import Loading from "@src/components/shared/loading";
import useForm from "@src/utils/hooks/useForm";
import { BasePageProps } from "@src/utils/interface";
import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";

const DeleteExam = ({ toggleToast }: { toggleToast: Function }) => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { exam } = pageData;
  const { getData, values, submit } = useForm(deleteExam);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function deleteExam() {
    try {
      setIsLoading(true);
      if (exam.name === values.name) {
        const data = await request.delete(
          `/centre/${exam.centreId}/exam/${exam.id}`
        );
        toggleToast(data.message);
        setIsLoading(false);
        router.back();
      } else {
        toggleToast("Incorrect exam name");
        setIsLoading(false);
      }
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={(e) => submit(e)}>
        <Box sx={{ width: { xs: "100%", md: "70%", lg: "50%" } }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Delete Exam
          </Typography>
          <Typography variant="h6" component="div" sx={{ mb: 3 }}>
            This action means this exam will no longer exist. Are you sure you
            want to delete this?
          </Typography>
          <Typography variant="h6" component="div" sx={{ mb: 3 }}>
            <strong>Exam name: </strong> {exam.name}{" "}
            <CopyAllOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => {
                copy(exam.name);
                toggleToast("copied");
              }}
            />
          </Typography>
          <TextFields
            fullWidth
            required
            name="name"
            label="Enter Exam name to be deleted"
            onChange={getData}
          />
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18, mt: 3 }}
          >
            <>
              Confirm Delete &nbsp;
              {isLoading && <Loading size={15} sx={{ color: "#fff" }} />}
            </>
          </ButtonComponent>
        </Box>
      </form>
    </>
  );
};

export default DeleteExam;
