import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiTable from "@src/components/shared/table";
import MenuItem from "@mui/material/MenuItem";
import { useDialog } from "@src/utils/hooks";
import Dialog from "@src/components/shared/dialog";
import BookOnlineOutlined from "@mui/icons-material/BookOnlineOutlined";

interface SectionScore {
  name: string;
  score: number;
}
interface ResultInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  score: number;
  sectionScore: SectionScore[];
}

export default function SectionScores({ result }: { result: ResultInt }) {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 150, name: "Section", key: "name" },
    { minWidth: 50, name: "Section Score", key: "score" },
  ];

  const results = result?.sectionScore?.map((result, index: number) => ({
    index: ++index,
    ...result,
  }));

  return (
    <>
      {" "}
      <MenuItem onClick={() => openDialog()} sx={{ fontSize: 18 }}>
        <>
          <BookOnlineOutlined /> &nbsp; Section Score
        </>
      </MenuItem>
      <Dialog
        title=""
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <div>
            {results.length ? (
              <Stack spacing={4} marginTop={4}>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ textAlign: "center", fontSize: { xs: 20, md: 25 } }}
                >
                  {result.firstname} {result.surname}
                </Typography>
                <Box sx={{ width: { xs: 400, md: "100%" } }}>
                  <MuiTable
                    data={results}
                    columns={columns}
                    bgColor="#F7F7F7"
                  />
                </Box>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 18, md: 20 },
                    mt: 5,
                  }}
                >
                  TOTAL SCORE: {result.score}
                </Typography>
              </Stack>
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                No Result Found.
              </Typography>
            )}
          </div>
        }
      />
    </>
  );
}
