// mui components
import Box from "@mui/material/Box";
import ReaderSection from "./ReaderSection";
//
import { isServerSide, queryClient } from "@src/utils";
import { BasePageProps, PublicationInt } from "@src/utils/interface";

const Document = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publication = pageData.publication as PublicationInt;

  return (
    <Box component="main" sx={{ pt: 8 }}>
      {!isServerSide ? <ReaderSection {...publication} /> : ""}

      {/* <embed
        style={{
          width: "100%",
          height: "300%",
          minHeight: 800,
          userSelect: "none",
        }}
        src={`${publication.fileUrl}#toolbar=0`}
      /> */}
    </Box>
  );
};

export default Document;
