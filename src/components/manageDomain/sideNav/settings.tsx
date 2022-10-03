import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { Collapse, List } from "@mui/material";
import UpdateCentre from "./updateCentre";
import UpdateLogo from "./updateLogo";
// import DeleteCentre from "./delete";
import UploadBackgroundImage from "./centreBackground";
import { BasePageProps, CentreProps } from "@src/utils/interface";
import { queryClient } from "@src/utils";

const CentreSettings = (): JSX.Element => {
  const [open, setOpen] = useState(true);

  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const centre = pageData.centre as CentreProps;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ marginBottom: 1 }}>
        <ListItemIcon>
          <GridViewOutlined />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: "#333333",
            fontWeight: 500,
            fontSize: 16,
            fontStyle: "normal",
          }}
          primary="Settings"
        />
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <UpdateCentre centre={centre} />
          <UpdateLogo centre={centre} />
          <UploadBackgroundImage centre={centre} />
          {/* <DeleteCentre id={centre?.id} /> */}
        </List>
      </Collapse>
    </>
  );
};

export default CentreSettings;
