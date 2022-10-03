// mui components
import Box from "@mui/material/Box";
import ReaderSection from "./ReaderSection";
//
// import { queryClient } from "@src/utils";
import { PublicationInt } from "@src/utils/interface";

const Document = ({ publication }: { publication: PublicationInt }) => {
  return (
    <Box component="main" sx={{ pt: 8 }}>
      <ReaderSection {...publication} />
    </Box>
  );
};

export default Document;
