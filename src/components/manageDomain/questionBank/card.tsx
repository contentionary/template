import React from "react";
// next
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
// styles and interface
import useCardStyle from "@src/styles/card";
import { QuestionBankInt } from "@src/utils/interface";
import ImageComponent from "@src/components/shared/image";
import FolderCopyOutlined from "@mui/icons-material/FolderCopyOutlined";
import dynamic from "next/dynamic";
import { kCount } from "@src/utils";

const QuestionBankCard = ({
  name,
  type,
  id,
  link,
  questionCount,
  folderContentCount,
}: QuestionBankInt) => {
  const cardStyle = useCardStyle();
  const Share = dynamic(() => import("./share"));
  link = link
    ? link
    : type === "FOLDER"
    ? `/admin/question-bank?folderId=${id}&folderName=${name}`
    : `/admin/question-bank/${id}/questions`;
  return (
    <div style={{ position: "relative" }}>
      <Share questionBankId={id} />
      <Card className={cardStyle.publicationCard}>
        <NextLink href={link} passHref>
          <CardActionArea
            LinkComponent={Link}
            className="MuiCourseCardActionBase-root"
          >
            <Box className="">
              <ImageComponent
                src={"/images/questionBank/questionBankImage.svg"}
                width="100%"
                height="60%"
                layout="responsive"
                objectFit={"contain"}
                alt={name}
              />
            </Box>
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
                  noWrap
                  gutterBottom
                  variant="h6"
                  sx={{ fontSize: 16, mb: 2 }}
                >
                  {name}
                </Typography>
              </Stack>
              {type === "FOLDER" ? (
                <Typography
                  mb={0}
                  noWrap
                  display="flex"
                  variant="body2"
                  alignItems="center"
                >
                  <FolderCopyOutlined color="primary" fontSize="inherit" />{" "}
                  &nbsp;
                  {folderContentCount || 0}
                </Typography>
              ) : (
                <Stack
                  mt="auto"
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography noWrap mb={0} variant="body2">
                    {questionCount ? kCount(questionCount) : 0} Question
                    {questionCount > 1 && "s"}
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
    </div>
  );
};

export default QuestionBankCard;
