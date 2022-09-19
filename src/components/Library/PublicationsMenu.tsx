import React from "react";
// mui components
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
// app components
// styles and interface
import useTreeViewStyle from "@src/styles/treeView";
import { LibraryPageFunc } from "./interfaceType";

const PublicationsMenu: LibraryPageFunc = () => {
  const treeViewStyle = useTreeViewStyle();

  return (
    <Box top={0} position="sticky">
      <Typography mb={2} mt={-1} pl={1} variant="h5">
        Categories
      </Typography>
      <TreeView
        aria-label="disabled items"
        defaultCollapseIcon={<FolderOpenOutlinedIcon />}
        defaultExpandIcon={<FolderOutlinedIcon />}
        className={treeViewStyle.treeViewRoot}
      >
        <TreeItem nodeId="1" label="Marketing">
          <TreeItem nodeId="2" label="Google Marketing" />
          <TreeItem nodeId="3" label="Digital Marketing" />
          <TreeItem nodeId="4" label="Marketing" />
        </TreeItem>
        <TreeItem nodeId="7" label="Engineering">
          <TreeItem nodeId="8" label="Civil Engineering" />
          <TreeItem nodeId="9" label="Computer Engineering">
            <TreeItem nodeId="10" label="Software Engineering" />
            <TreeItem nodeId="11" label="Artificial Intelligence" />
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="12" label="Engineering">
          <TreeItem nodeId="13" label="Civil Engineering" />
          <TreeItem nodeId="14" label="Computer Engineering">
            <TreeItem nodeId="15" label="Software Engineering" />
            <TreeItem nodeId="16" label="Artificial Intelligence" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export default PublicationsMenu;
