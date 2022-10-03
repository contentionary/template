import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@src/components/shared/button";
import Typography from "@mui/material/Typography";
import useGlobalStyle from "@src/styles/index";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@src/components/shared/input/textField";
import Avatar from "@src/components/shared/avatar/imageAvatar";
import { useRouter } from "next/router";
import useForm from "@src/hooks/useForm";
import { UserInt } from "@src/utils/interface";

const Header = ({ user }: { user: UserInt }) => {
  const globalStyle = useGlobalStyle();
  const router = useRouter();
  const { getData, values, submit } = useForm(search);

  function search() {
    router.push({ pathname: "/search", query: { phrase: values.search } });
  }

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
      <form onSubmit={(e) => submit(e)}>
        <Stack direction="row" spacing={1}>
          <Input
            id="centre-search"
            label="search here..."
            variant="outlined"
            sx={{ width: { md: 250, lg: 400 } }}
            onChange={getData}
            name="search"
            required
          />
          <Box>
            <Button
              sx={{ paddingY: 2, paddingX: { lg: 5, md: 3 } }}
              size="large"
              disableElevation
              variant="contained"
              className={globalStyle.bgGradient}
              type="submit"
            >
              <SearchIcon htmlColor="" />
            </Button>
          </Box>
        </Stack>
      </form>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt="profile"
          src={user?.avatar ? user?.avatar : "/images/centre/profile.svg"}
          sx={{ width: 24, height: 24 }}
        />
        <Typography>
          {" "}
          firstname surname
          {/* {user?.firstname} {user?.surname} */}
        </Typography>
      </Stack>
    </Box>
  );
};
export default Header;
