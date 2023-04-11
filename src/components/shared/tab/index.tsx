import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({
  tab,
  tabPanel,
  sx,
  tabSx,
  indicatorColor,
}: {
  tab: Array<any>;
  tabPanel: Array<any>;
  sx?: {};
  tabSx?: {};
  indicatorColor?: "primary" | "secondary" | undefined;
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box>
      <Tabs
        sx={sx}
        value={value}
        onChange={handleChange}
        indicatorColor={indicatorColor}
        textColor="inherit"
        variant="scrollable"
        aria-label="full width tabs example"
      >
        {tab.map((item, index) => (
          <Tab
            sx={tabSx}
            key={`${index}-tab`}
            label={item}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabPanel.map((item, index) => (
          <TabPanel
            key={`${index}-tabPanel`}
            value={value}
            index={index}
            dir={theme.direction}
          >
            {item}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}
