import { Fragment, memo } from "react";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
// app components
import ExamCard from "@src/components/shared/cards/ExamCard";
// styles and interface
import useGlobalStyle from "@src/styles";
import { ExamFunc } from "./interfaceType";
import { queryClient } from "@src/utils";
import { BasePageProps, ExamInt } from "@src/utils/interface";

const ExamListSection: ExamFunc = () => {
  const globalStyle = useGlobalStyle();
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const exams = pageData.templateData.exams as ExamInt[];

  return (
    <Fragment>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          <Typography
            mb={4}
            variant="h4"
            component="h2"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Explore Top Test/Exams
          </Typography>
          <Grid
            container
            mb={{ xs: 2, md: 3, lg: 3, xl: 4 }}
            spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
          >
            {exams.map((exam, index) => (
              <Grid
                key={`${index}-exam-card`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <ExamCard exam={exam} />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} textAlign="center">
            <NextLink href="/exams" passHref>
              <Button
                size="large"
                disableElevation
                variant="contained"
                component={MuiLink}
                className={globalStyle.bgGradient}
                sx={{
                  px: 8,
                  textAlign: "center",
                  width: { xs: "100%", sm: "auto" },
                  display: { xs: "block", sm: "inline-block" },
                }}
              >
                View All
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default memo(ExamListSection);
