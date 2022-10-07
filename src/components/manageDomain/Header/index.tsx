import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const Header = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <Box
      sx={{
        marginLeft: 2,
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        height: 104,
      }}
    >
      <Typography variant="h4" component="p">
        {cachedData.centre.name}
      </Typography>
    </Box>
  );
};
export default Header;
