import React from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as MuiLink } from "@mui/material";
// icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// styles and interface
import { kCount } from "@src/utils";
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { CourseCardFunc } from "./interfaceType";

const CourseCard: CourseCardFunc = ({ course }) => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();
  const {
    id,
    name,
    slug,
    description,
    imageUrl,
    price,
    subscriberCount,
    createdAt,
  } = course;

  return (
    <Card className={cardStyle.courseCard}>
      <NextLink href={`/courses/${slug}/${id}`} passHref>
        <CardActionArea
          LinkComponent={MuiLink}
          className="MuiCourseCardActionBase-root"
        >
          <Image
            src={imageUrl}
            width="100%"
            height="60%"
            layout="responsive"
            objectFit="cover"
            alt={name}
          />
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "nowrap",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                className={globalStyle.text2LineTruncate}
              >
                {name}
              </Typography>
              <Typography
                paragraph
                mb={0}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <StarBorderOutlinedIcon color="primary" fontSize="inherit" />{" "}
                4.5
              </Typography>
            </Stack>
            <Typography
              mb={2}
              variant="body2"
              color="text.secondary"
              className={globalStyle.text2LineTruncate}
            >
              {description}
            </Typography>
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="between"
            >
              <Typography
                mb={0}
                noWrap
                display="flex"
                alignItems="center"
                variant="body2"
              >
                <>
                  <AccessTimeOutlinedIcon color="primary" fontSize="inherit" />{" "}
                  {createdAt}
                </>
              </Typography>
              <Typography
                noWrap
                mb={0}
                variant="body2"
                display="flex"
                alignItems="center"
              >
                <PeopleAltOutlinedIcon color="primary" fontSize="inherit" />{" "}
                {kCount(subscriberCount)}
              </Typography>
              <Typography
                mb={0}
                ml="auto"
                flexGrow={1}
                variant="h5"
                color="primary"
                textAlign="right"
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

export default CourseCard;
