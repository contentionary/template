import React, { Fragment } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme, alpha } from "@mui/material/styles";
// icons
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
// styles and interface
import useGlobalStyle from "@src/styles";
// styles and interface
import { queryClient } from "@src/utils";
import { PortfolioFunc } from "./interfaceType";
import { BasePageProps, PortfolioInt } from "@src/utils/interface";

const PortfolioSection: PortfolioFunc = () => {
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  //
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const portfolioList = pageData.templateData.centrePortfolio as PortfolioInt[];
  const { aboutUsSectionOne = null } =
    pageData?.templateData?.templateDetails || {};

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ py: 8, px: { md: 6 }, backgroundColor: "#FBFBFB" }}
        className=""
      >
        <Container maxWidth="xl">
          <Typography mb={1} variant="h4" component="h2">
            Professional Portfolio
          </Typography>
          <Divider
            variant="middle"
            sx={{
              mb: 2,
              mt: 0,
              ml: 0,
              width: 100,
              borderWidth: 1.5,
              borderColor: "primary.main",
            }}
          />
          <Typography mb={4} paragraph sx={{ maxWidth: 650 }}>
            {aboutUsSectionOne.description}
          </Typography>
          <Grid container spacing={{ xs: 4, sm: 2, md: 4 }}>
            {portfolioList.map((portfolio, index) => (
              <Grid key={`portfolio-item-${index}`} item sm={6} md={6} xs={12}>
                <Paper className={globalStyle.paperShadow} sx={{ p: 4 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      border: 2,
                      width: 56,
                      height: 56,
                      borderColor: "primary.main",
                      backgroundColor: alpha(
                        theme.palette.primary["main"],
                        0.02
                      ),
                    }}
                  >
                    <WorkspacePremiumOutlinedIcon color="primary" />
                  </Avatar>
                  <Typography my={2} variant="h5" gutterBottom>
                    {portfolio.title}
                  </Typography>
                  <Typography paragraph mb={0} sx={{ maxWidth: 400 }}>
                    {portfolio.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
export default PortfolioSection;
