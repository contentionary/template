import React from "react";
// next
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import { Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
// app components
// styles and interface
import useButtonStyle from "@src/template/styles/button";
import useListMenuStyle from "@src/template/styles/listMenu";
import { ExamListInt } from "@src/utils/interface";
// icons
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FolderListIcon from "@src/template/assets/images/cards/folder-item.svg";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
//

export const MenuList = ({ examListData }: { examListData: ExamListInt }) => {
  const listMenuStyle = useListMenuStyle();

  return (
    <List disablePadding className={listMenuStyle.listMenuRoot}>
      {examListData.exams
        .filter((exam) => exam.type === "FOLDER")
        .map((exam, index) => (
          <ListItem key={`${index}-exam-folder`} disablePadding>
            <NextLink href={`/exams?folderId=${exam.id}`} passHref>
              <ListItemButton component={MuiLink}>
                <ListItemText
                  sx={{ wordBreak: "break-all" }}
                  primary={exam.name}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
    </List>
  );
};

const ExamsMenu = ({ pageData }: Record<string, any>) => {
  const theme = useTheme();
  const buttonStyle = useButtonStyle();
  const [collapse, setCollapse] = React.useState(false);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //
  const examListData = pageData.examList as ExamListInt;
  //
  const handleChange = () => {
    setCollapse((prev) => !prev);
  };
  //
  if (
    examListData.exams.filter((exam) => exam.type === "FOLDER").length === 0
  ) {
    return (
      <Box top={32} position="sticky">
        {!isMatch && (
          <>
            <Typography mb={8} variant="h5">
              Categories
            </Typography>
            <FolderListIcon />
            <Typography paragraph>No category available</Typography>
          </>
        )}
      </Box>
    );
  }
  return (
    <Box top={32} position="sticky">
      {isMatch ? (
        <Button
          variant="text"
          color="secondary"
          onClick={handleChange}
          className={buttonStyle.menuFullButton}
        >
          Categories
          {collapse ? (
            <CloseOutlinedIcon htmlColor={grey[400]} />
          ) : (
            <UnfoldMoreOutlinedIcon htmlColor={grey[400]} />
          )}
        </Button>
      ) : (
        <Typography mb={2} variant="h5">
          Categories
        </Typography>
      )}
      {isMatch ? (
        <Collapse in={collapse}>
          <Paper
            square
            elevation={0}
            sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pl: 1 }}
          >
            <MenuList examListData={examListData} />
          </Paper>
        </Collapse>
      ) : (
        <MenuList examListData={examListData} />
      )}
    </Box>
  );
};

export default ExamsMenu;
