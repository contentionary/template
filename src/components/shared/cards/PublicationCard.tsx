import React from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as MuiLink } from "@mui/material";
// icons
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// styles and interface
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { PublicationCardFunc } from "./interfaceType";

const PublicationCard: PublicationCardFunc = () => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Card className={cardStyle.publicationCard}>
      <NextLink href="/library/the-big-bang-theory" passHref>
        <CardActionArea
          LinkComponent={MuiLink}
          className="MuiCourseCardActionBase-root"
        >
          <Box p={1} className="card-img">
            <Image
              src="/images/book-1.png"
              width="90%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              alt="Contentionary"
            />
          </Box>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography noWrap gutterBottom variant="h6">
              Learn Marketing from Top Instructors.
            </Typography>
            <Typography
              mb={1}
              variant="body2"
              color="text.secondary"
              className={globalStyle.text2LineTruncate}
            >
              Premium Centre gives you a vast categories by top industry Premium
              Centre gives you a vast categories by top industry expert...
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="between"
              flexWrap={{ xs: "wrap", sm: "nowrap" }}
            >
              <Typography
                mb={0}
                noWrap
                display="flex"
                variant="body2"
                alignItems="center"
                order={{ xs: 2, sm: 2 }}
              >
                <MenuBookOutlinedIcon color="primary" fontSize="inherit" />
                &nbsp;1.5K+
              </Typography>
              <Typography
                mb={0}
                noWrap
                display="flex"
                variant="body2"
                alignItems="center"
                order={{ xs: 3, sm: 2 }}
              >
                <FavoriteBorderOutlinedIcon
                  color="primary"
                  fontSize="inherit"
                />
                &nbsp;1.5K+
              </Typography>
              <Typography
                mb={0}
                flexGrow={1}
                variant="h5"
                color="primary"
                order={{ xs: 1, sm: 3 }}
                width={{ xs: "100%", sm: "auto" }}
                ml={{ xs: "0 !important", sm: "auto" }}
                textAlign={{ xs: "left", sm: "right" }}
              >
                ₦399.99
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};

export default PublicationCard;
