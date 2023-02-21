import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import { handleError, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import useForm from "@src/hooks/useForm";
import TextFields from "@src/components/shared/input/textField";

const InviteCandidate = ({
  toggleToast,
  centreId,
  id,
}: {
  toggleToast: Function;
  centreId: string;
  id: string;
}) => {
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const LoadingWithValue = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const { values, getFile, submit, setDefault } = useForm(update);
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedFile, setConvertedFile] = useState<any>();
  const [candidates, setCandidates] = useState([{ name: "", email: "" }]);
  async function update() {
    try {
      setIsLoading(true);
      if (values.fileUrl && !convertedFile) {
        const fileUrl = await uploadFiles(
          values.fileUrl,
          setFileLoadingProgress
        );
        values.fileUrl = fileUrl;
        setConvertedFile(fileUrl);
      }
      convertedFile && (values.fileUrl = convertedFile);
      setDefault({ candidates });
      await request.post({
        url: `/centre/${centreId}/exam/${id}/invite-cantidate`,
        data: values,
      });
      setCandidates([{ name: "", email: "" }]);
      const form = document.getElementById("myForm") as Record<string, any>;
      form.reset();
      toggleToast("Invite sent successfully");
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Box mt={6} mb={10} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { md: 600 } }}>
          <form onSubmit={(e) => submit(e)} id="myForm">
            <Typography
              variant="h4"
              component="div"
              sx={{ textAlign: "center", mb: 3 }}
            >
              Invite Exam Candidates
            </Typography>
            <Box sx={{ background: "#FAEFE8", padding: 3 }}>
              <Typography sx={{ color: "#000000", mb: 2 }}>
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  Invite Candidates via CSV
                </span>

                <span style={{ fontWeight: 400, fontSize: 14 }}>
                  (For bulk exam candidates, upload CSV file).
                </span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#FFFFFF",
                  borderRadius: 1,
                  padding: 1,
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {values.fileUrl && "file selected"}
                </Typography>

                <TextFields
                  sx={{ display: "none" }}
                  onChange={getFile}
                  name="fileUrl"
                  id="fileUrl"
                  type="file"
                />
                <ButtonComponent
                  variant="contained"
                  disableElevation
                  sx={{ background: "#EDEDED", color: "#000000" }}
                  size="large"
                  onClick={() => {
                    const file = document.getElementById("fileUrl");
                    file && file.click();
                  }}
                >
                  Choose file
                </ButtonComponent>
              </Box>
              <Typography
                sx={{ color: "#000000", mb: 2, fontWeight: 600, fontSize: 14 }}
              >
                Below is an example of how you should type the candidates’ name
                and emails in the csv file, with name and email as the table
                column-title in lowercase.
              </Typography>
              <Box>
                <table>
                  <thead>
                    <tr style={{ textAlign: "left" }}>
                      <th
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          borderRight: "0.5px solid #C4C4C4",
                          width: 100,
                          paddingBottom: 10,
                        }}
                      >
                        name
                      </th>
                      <th
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          paddingLeft: 10,
                        }}
                      >
                        email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          borderRight: "0.5px solid #C4C4C4",
                          padding: "10px 0",
                        }}
                      >
                        Emmanuel
                      </td>
                      <td
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          paddingLeft: 10,
                        }}
                      >
                        emmanuel@example.com
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          borderRight: "0.5px solid #C4C4C4",
                          padding: "10px 0",
                        }}
                      >
                        Samantha
                      </td>
                      <td
                        style={{
                          borderBottom: "0.5px solid #C4C4C4",
                          paddingLeft: 10,
                        }}
                      >
                        samantha@example.com
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Typography sx={{ mt: 4, textAlign: "center" }}>
                  <ButtonComponent
                    variant="contained"
                    disableElevation
                    size="large"
                    type="submit"
                  >
                    Export Invitation Template
                  </ButtonComponent>
                </Typography>
              </Box>
            </Box>
            <Box mt={7}>
              <Typography variant="h4">OR</Typography>
              <Typography sx={{ mt: 5, fontWeight: 400, fontSize: 16, mb: 4 }}>
                Invite candidates directly by typing their name and email
                manually using the input fields below and click
                <strong>Add more candidate button</strong> if you have more
                users to add..
              </Typography>
              {candidates.map(({ name, email }, index) => (
                <Box sx={{ width: 400 }} key={index}>
                  {index > 0 && (
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <IconButton
                        sx={{ background: "#f4f4f4" }}
                        onClick={() => {
                          candidates.splice(index, 1);
                          setCandidates([...candidates]);
                        }}
                      >
                        <Close sx={{ color: "red" }} />
                      </IconButton>
                    </Box>
                  )}
                  <TextFields
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Enter Name"
                    defaultValue={name}
                    onChange={(e: any) => {
                      candidates[index].name = e.target.value;
                      setCandidates([...candidates]);
                    }}
                  />
                  <br />
                  <TextFields
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Enter Email"
                    defaultValue={email}
                    onChange={(e: any) => {
                      candidates[index].email = e.target.value;
                      setCandidates([...candidates]);
                    }}
                  />
                  <br />
                </Box>
              ))}
              <br />
              <ButtonComponent
                variant="contained"
                disableElevation
                sx={{ background: "#EDEDED", color: "#000000" }}
                size="large"
                onClick={() => {
                  setCandidates([...candidates, { name: "", email: "" }]);
                  //   candidates.push();
                }}
              >
                Add more candidates
              </ButtonComponent>

              <Typography sx={{ mt: 4, textAlign: "center" }}>
                <ButtonComponent
                  variant="contained"
                  disableElevation
                  size="large"
                  type="submit"
                >
                  <>
                    Invite Candidates{" "}
                    {isLoading && <Loading sx={{ ml: 1, color: "#fff" }} />}
                  </>
                </ButtonComponent>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
      <LoadingWithValue
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        color="primary"
        size={100}
        value={fileLoadingProgres}
      />
    </>
  );
};

export default InviteCandidate;
