import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// styles, interface and config
import config from "@src/utils/config";
import useGlobalStyle from "@src/styles";
import { DocumentFunc } from "./interfaceType";
// app components
// icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const HeroSection: DocumentFunc = () => {
  const globalStyle = useGlobalStyle();

  return (
    <Fragment>
      <Box
        component="section"
        className="hero-section"
        sx={{ pt: 4, pb: 8, px: { md: 6 } }}
      >
        <Container maxWidth="xl">
          <Typography mb={1} paragraph>
            <Typography variant="h6" component="span">
              Publication ID
            </Typography>{" "}
            bfd6bb40-124f-11ec-a161-bdf69d9cefd9
          </Typography>
          <Typography mb={1} variant="h3" component="h1">
            How Fractions Distort Our Thinking.
          </Typography>
          <Stack direction="row" spacing={2} mt={0}>
            <Typography variant="h6">Indorama Centre</Typography>
            <Typography paragraph display="flex" alignItems="center">
              <PeopleOutlineOutlinedIcon color="primary" /> 1.5k Readers
            </Typography>
          </Stack>
          <Stack
            mt={3}
            mb={1}
            spacing={4}
            direction={{ xs: "column", md: "row" }}
          >
            <Typography variant="h6">Author(s):</Typography>
            <Stack direction="row" flexWrap="wrap" justifyContent="start">
              <Stack
                mr={4}
                mb={1}
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <Image
                    alt="user"
                    layout="fill"
                    objectFit="contain"
                    src="/images/avatar.png"
                  />
                </Avatar>
                <Typography paragraph>Benjamin Peter Franklin</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography my={1} paragraph>
            A federal judge in Seattle ruled today that Microsoft can move
            forward with a lawsuit against the U.S. Department of Justice,
            challenging the U.S. government’s ability to keep the company from
            telling customers when they’re the targets of government warrants.
          </Typography>
          {/* <Stack
            spacing={2}
            rowGap={1}
            flexWrap="wrap"
            direction="row"
            alignItems="center"
          ></Stack> */}
          <Box mt={2}>
            <NextLink href={`${config.URL.WEB}create-account`} passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                className={globalStyle.bgGradient}
                display={{ xs: "block", sm: "inline-block" }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <FileDownloadOutlinedIcon /> &nbsp; Download
                </Stack>
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
export default HeroSection;
