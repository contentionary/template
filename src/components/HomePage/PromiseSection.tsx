import React, { Fragment } from "react";
// next
import Image from "next/image";
import NextLink from "next/link";
//
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
//
import Tab from "@mui/material/Tab";
//
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
//
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//
import useGlobalStyle from "@src/styles";
// import { useTheme } from "@mui/material/styles";
// interface
import { HomePageFunc } from "./interfaceType";
// icons
import TickIcon from "@src/assets/icons/tick.svg";

//
const TickAvatar = () => {
  // const theme = useTheme();
  return (
    <Avatar
      sx={{
        bgcolor: "#EEB389",
        width: 24,
        height: 24,
        mr: 2,
      }}
    >
      <TickIcon style={{ transform: "scale(2)" }} />
    </Avatar>
  );
};

const PromiseSection: HomePageFunc = () => {
  const [value, setValue] = React.useState("1");

  // const theme = useTheme();
  const globalStyle = useGlobalStyle();

  //
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 8, px: { md: 6 }, bgcolor: "#FFFCF8" }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box maxWidth={600}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                WHAT WE PROMISE
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                An Ecosystem for Educators and Creators to Harness
              </Typography>
              <Typography mb={4} paragraph sx={{ textAlign: "center" }}>
                Create your centre to share contents, trade contents, manage
                contents and more. Backed by powerful tools that help you grow,
                impact, drive sales, track and manage your day-to-day
                activities.
              </Typography>
            </Box>
          </Box>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                textColor="inherit"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="lab API tabs example"
                sx={{
                  "&.MuiTabs-root": {
                    maxWidth: 1100,
                    justifyContent: "center",
                    borderBottom: 1,
                    borderColor: "divider",
                    mx: "auto",
                  },
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "space-between",
                    gap: 4,
                  },
                  "& .MuiTabScrollButton-root": {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                <Tab label="Build your centre" value="1" />
                <Tab label="Measure performance" value="2" />
                <Tab label="Pre-engagement" value="3" />
                <Tab label="Engagement" value="4" />
                <Tab label="Finance" value="5" />
                <Tab label="Post-engagement" value="6" />
              </TabList>
            </Box>
            <TabPanel sx={{ px: 0 }} value="1">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5">Create your Centre</Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Select a template of how you want your application to look like." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Choose a subdomain or add your custom domain" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Configure other setups." />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/create-center-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="2">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5" mb={2}>
                    Qualitative and Quantitative analysis
                  </Typography>
                  <Typography paragraph color={"primary.main"} width={250}>
                    Apps to Measure Your Centre’s Engagements.
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Measure students performance" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="AI tools to measure impact and strength of your Centre" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Track number of visitors" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Google Analytics to your Centre to measure traffic" />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/analysis-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="3">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5">Gain Visibility</Typography>
                  <Typography paragraph color={"primary.main"} width={250}>
                    Apps to Drive Potentially New and Existing Subscribers to
                    Your Centre
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Referral Apps" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Online Adverts/sharing Apps" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Affiliate Marketing Apps" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Emailing, notification and SMS Apps" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Chat box" />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/visibility-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="4">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5">What do you want to do?</Typography>
                  <Typography paragraph color={"primary.main"} width={250}>
                    Tools to Why You Created Your Centre
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Online learning and live classes" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Online Screening, survey and mock" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Edu-Gaming" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Edu Administration and finance" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Edu commerce/digital content sales" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Publishing, blogging" />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/engagement-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="5">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5">Access Payment</Typography>
                  <Typography paragraph color={"primary.main"} width={250}>
                    Add Apps That Can Help You Receive Payments
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Flutterwave." />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="PayStack" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="CttnPay and Access Code Generator" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Paypal and Stripe" />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/finance-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ px: 0 }} value="6">
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item xs={12} md={6} lg={5} order={{ xs: 2, md: 1 }}>
                  <Typography variant="h5">Customize Your Centre</Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Reviews" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Certifications" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Termly results" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <TickAvatar />
                      <ListItemText primary="Support and CRM" />
                    </ListItem>
                  </List>
                  <NextLink href="/create-account" passHref>
                    <Button
                      size="large"
                      disableElevation
                      variant="contained"
                      component={MuiLink}
                      className={globalStyle.bgGradient}
                      sx={{
                        textAlign: "center",
                        width: { xs: "100%", sm: "auto" },
                        display: { xs: "block", sm: "inline-block" },
                      }}
                    >
                      Get Started for Free
                    </Button>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  md={6}
                  lg={5}
                  xs={12}
                  order={{ xs: 1, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: { xs: "100%", md: "100%" },
                    }}
                  >
                    <Image
                      src="/images/post-engagement-img.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Contentionary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PromiseSection;
