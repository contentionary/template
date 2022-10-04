import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import ALL_PLUGINS from "../plugins/data";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { Collapse, List, ListItem } from "@mui/material";
import { useState } from "react";
import { CentreProps } from "@src/utils/interface";

interface Props {
  centre: CentreProps;
}

const Modules = ({ centre }: Props): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const data = ALL_PLUGINS.filter(({ plugin }) => centre.plugins[plugin]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
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
          primary="Modules"
        />
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item, index) => (
            <ListItem
              disablePadding
              key={index}
              onClick={() => router.push(`/${item.link}`)}
            >
              <ListItemButton sx={{ pl: 5 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "#616161",
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: "normal",
                  }}
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default Modules;
