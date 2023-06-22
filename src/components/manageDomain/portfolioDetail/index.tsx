import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme, alpha } from "@mui/material/styles";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AddPortfolio from "./addPortfolio";
import { useToast } from "@src/utils/hooks";
import { queryClient } from "@src/utils";
import { BasePageProps, PortfolioInt } from "@src/utils/interface";
import dynamic from "next/dynamic";
import { useState } from "react";
import useGlobalStyle from "@src/styles";
// import Delete from "@src/components/shared/delete";
import UpdatePortfolio from "./update";

const Portfolio = () => {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const theme = useTheme();
  const globalStyle = useGlobalStyle();
  const { toastMessage, toggleToast } = useToast();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [portfolios, setPortfolio] = useState<PortfolioInt[]>(
    pageData.portfolioList
  );
  return (
    <div>
      <Box>
        <Typography marginY={3} variant="h4">
          Portfolios
        </Typography>
        <AddPortfolio
          centreId={cachedData.centre.id}
          toggleToast={toggleToast}
          setPortfolio={setPortfolio}
          portfolios={portfolios}
        />
        <Box mt={4}>
          <Grid container spacing={{ xs: 4, sm: 2, md: 4 }}>
            {portfolios?.map((portfolio, index) => (
              <Grid
                key={`portfolio-item-${index}`}
                item
                sm={12}
                md={12}
                xs={12}
              >
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
                  <Typography paragraph mb={0} sx={{}}>
                    {portfolio.description}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <UpdatePortfolio
                      centreId={cachedData.centre.id}
                      toggleToast={toggleToast}
                      setPortfolio={setPortfolio}
                      portfolios={portfolios}
                      index={index}
                      portfolio={portfolio}
                    />
                    {/* <Delete
                      url={`/centre/${cachedData.centre.id}/portfolio/${portfolio.id}`}
                      toggleToast={toggleToast}
                      setPortfolio={setPortfolio}
                      portfolios={portfolios as []}
                    /> */}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </div>
  );
};

export default Portfolio;
