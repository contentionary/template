import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

import Image from "@src/components/shared/image";

import Header from "./Header";
import Link from "@src/components/shared/link";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

interface Props {
  window?: () => Window;
  handleDrawerToggle: Function;
}

export default function MobileAppBar(props: Props): JSX.Element {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <>
      <Toolbar>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            pb: 2,
            pt: 4,
            width: "100%",
          }}
        >
          <IconButton onClick={() => props.handleDrawerToggle()} sx={{ mr: 2 }}>
            <MenuIcon htmlColor="#616161" fontSize="large" />
          </IconButton>
          <Link href="/" passHref>
            <>
              <Hidden mdDown>
                <a>
                  <Image
                    src={cachedData.centre?.logo || DEFAULT_LOGO}
                    alt={cachedData.centre.name}
                    width={240}
                    height={50}
                  />
                </a>
              </Hidden>
              <Hidden lgUp>
                <Typography variant="h4" component="p">
                  {cachedData.centre.name}
                </Typography>
              </Hidden>
            </>
          </Link>
        </Box>

        <Header />
      </Toolbar>
      <Divider sx={{ borderColor: "#F1F2F3" }} />
    </>
  );
}
