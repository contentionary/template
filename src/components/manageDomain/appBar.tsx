import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Close from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

import Image from "@src/components/shared/image";
import Input from "@src/components/shared/input/textField";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ButtonComponent from "@src/components/shared/button";

import Header from "./Header";

import useForm from "@src/hooks/useForm";
import { useRouter } from "next/router";
import Link from "@src/components/shared/link";

interface Props {
  window?: () => Window;
  handleDrawerToggle: Function;
}

export default function MobileAppBar(props: Props): JSX.Element {
  const [show, setShow] = React.useState(false);
  const { getData, values, submit } = useForm(search);
  const router = useRouter();
  const bg = "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)";

  function search() {
    router.push({ pathname: "/search", query: { phrase: values.search } });
  }
  return (
    <>
      <Toolbar sx={{ width: { xs: 550, md: "100%" } }}>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            paddingY: 4,
            width: "100%",
          }}
        >
          <IconButton onClick={() => props.handleDrawerToggle()} sx={{ mr: 2 }}>
            <MenuIcon htmlColor="#616161" fontSize="large" />
          </IconButton>
          <Link href="/" passHref>
            <a>
              <Image
                src="/images/logo.png"
                alt="Contentionary logo"
                width={270}
                height={50}
              />
            </a>
          </Link>

          {show && (
            <Box
              sx={{
                position: "absolute",
                width: "95%",
                background: "white",
                zIndex: 1,
              }}
            >
              <form onSubmit={(e) => submit(e)}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Close
                    htmlColor="red"
                    fontSize="large"
                    onClick={() => setShow(false)}
                  />
                  <Input
                    id="centre-search"
                    label="Search here..."
                    variant="outlined"
                    sx={{
                      width: "80%",
                    }}
                    onChange={getData}
                    name="search"
                    required
                  />
                  <ButtonComponent
                    sx={{ background: bg, paddingY: 2 }}
                    type="submit"
                  >
                    <SearchIcon htmlColor="#fff" />
                  </ButtonComponent>
                </Box>
              </form>
            </Box>
          )}
          <IconButton
            onClick={() => setShow(true)}
            sx={{
              background: bg,
            }}
          >
            <SearchOutlined htmlColor="#ffffff" fontSize="large" />
          </IconButton>
        </Box>

        <Header />
      </Toolbar>
      <Divider sx={{ borderColor: "#F1F2F3" }} />
    </>
  );
}
