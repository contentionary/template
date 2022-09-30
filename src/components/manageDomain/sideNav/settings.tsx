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
import { CentreProps } from "@src/utils/interface";

interface Props {
  centre: CentreProps;
  setCentre: Function;
}

const CentreSettings = ({ centre, setCentre }: Props): JSX.Element => {
  const [open, setOpen] = useState(true);

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
          <UpdateCentre centre={centre} setCentre={setCentre} />
          <UpdateLogo centre={centre} setCentre={setCentre} />
          <UploadBackgroundImage centre={centre} setCentre={setCentre} />
          {/* <DeleteCentre id={centre?.id} /> */}
        </List>
      </Collapse>
    </>
  );
};

export default CentreSettings;
