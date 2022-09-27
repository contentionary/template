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
import { kCount } from "@src/utils";
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { PublicationCardFunc } from "./interfaceType";

const PublicationCard: PublicationCardFunc = ({
  slug,
  name,
  price,
  description,
  subscriberCount,
  imageUrl,
  readCount,
  id,
}) => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Card className={cardStyle.publicationCard}>
      <NextLink href={`/library/${slug}/${id}`} passHref>
        <CardActionArea
          LinkComponent={MuiLink}
          className="MuiCourseCardActionBase-root"
        >
          <Box p={1} className="card-img">
            <Image
              src={imageUrl || "/images/book-1.png"}
              width="90%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              alt="Contentionary"
            />
          </Box>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography noWrap gutterBottom variant="h6">
              {name}
            </Typography>
            <Typography
              mb={1}
              minHeight={40}
              variant="body2"
              color="text.secondary"
              className={globalStyle.text2LineTruncate}
            >
              {description}
            </Typography>
            <Stack
              mt="auto"
              spacing={1}
              direction="row"
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
                &nbsp;{subscriberCount ? kCount(subscriberCount) : 0}
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
                &nbsp;{kCount(readCount)}
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
                {price <= 0 ? "Free" : ` ₦${price}`}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};

export default PublicationCard;
