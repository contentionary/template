// import React, { Fragment } from "react";
// // next
// import NextLink from "next/link";
// import { useRouter } from "next/router";
// // mui components
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import { Link as MuiLink } from "@mui/material";
// // app components
// import ImageComponent from "@src/components/shared/image";
// // icons
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
// import PeopleOutline from "@mui/icons-material/PeopleOutlineOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// // import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// // hooks, styles, interface and config
// import { useDialog } from "@src/hooks";
// import useGlobalStyle from "@src/styles";
// import useButtonStyle from "@src/styles/button";
// import { ExamDetailsPageFunc } from "./interfaceType";
// import { kCount, isServerSide, dateTimeFormat } from "@src/utils";
// import ConfirmPayment from "@src/components/payment/confirmPayment";
// import ShareContentOnMedia from "@src/components/shared/shareContentOnMedia/share";

// const HeroSection: ExamDetailsPageFunc = ({ exam, read }) => {
//   const router = useRouter();
//   const buttonStyle = useButtonStyle();
//   const globalStyle = useGlobalStyle();

//   const { isOpen, openDialog, closeDialog } = useDialog();
//   const { reference, verifyValue, price: deductedPrice } = router.query;

//   // const {
//   //   id,
//   //   name,
//   //   price,
//   //   image,
//   //   summary,
//   //   subscriberCount,
//   //   questionCount,
//   //   startDate,
//   //   endDate,
//   // } = exam;

//   const redirectUrl = !isServerSide ? window.location.href : "";

//   return (
//     <Fragment>
//       <Box
//         component="section"
//         className={globalStyle.bgDustyPrimary}
//         sx={{ pt: 4, pb: 8, px: { md: 6 } }}
//       >
//         {verifyValue && (
//           <ConfirmPayment
//             price={Number(deductedPrice)}
//             reference={reference}
//             redirectUrl={redirectUrl}
//           />
//         )}
//         <Container maxWidth="xl">
//           <Grid
//             container
//             spacing={4}
//             sx={{ justifyContent: "space-between", alignItems: "center" }}
//           >
//             <Grid
//               item
//               xs={12}
//               md={4}
//               lg={3}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexDirection: "column",
//               }}
//             >
//               <Box
//                 width="80%"
//                 sx={{ border: "solid 15px #fff", borderRadius: 1 }}
//               >
//                 <ImageComponent
//                   width="100%"
//                   height="100%"
//                   layout="responsive"
//                   objectFit="fill"
//                   alt="Contentionary"
//                   src="/images/courses-4.png"
//                 />
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={8} lg={9}>
//               <Typography variant="h2" component="h1">
//                 {/* {name} */}JSS One - JSS Two Competition
//               </Typography>
//               <Typography paragraph>
//                 Much as the pandemic became intense, some schools already had
//                 all it takes to still continue their curriculum through adopted
//                 technologies.But in as much as the pandemic became
//               </Typography>
//               <Typography paragraph>
//                 <Typography
//                   variant="subtitle1"
//                   component="span"
//                   color="primary"
//                 >
//                   League ID:
//                 </Typography>{" "}
//                 bfd6bb40-124f-11ec-a161-bdf69d9cefd9
//               </Typography>
//               <Stack
//                 my={2}
//                 spacing={2}
//                 flexWrap="wrap"
//                 direction="row"
//                 alignItems="center"
//               >
//                 <Typography variant="h6" display="flex" alignItems="center">
//                   <GroupAddOutlinedIcon color="primary" fontSize="small" />
//                   &nbsp;
//                   {/* {kCount(subscriberCount)}  */}
//                   1.5k Participants
//                 </Typography>
//                 <Typography variant="h6" display="flex" alignItems="center">
//                   <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
//                   &nbsp; Date: 20dd : 01hh : 35mm: 57ss
//                   {/* {startDate && endDate
//                     ? `${dateTimeFormat(startDate)} - ${dateTimeFormat(
//                         endDate
//                       )}`
//                     : ""} */}
//                 </Typography>
//               </Stack>
//               <Typography variant="h3" component="h1">
//                 {/* {price <= 0 ? "Free" : ` ₦${price}`} */}Free
//               </Typography>
//               <Stack
//                 mt={1}
//                 spacing={2}
//                 rowGap={1}
//                 flexWrap="wrap"
//                 direction="row"
//                 alignItems="center"
//               >
//                 <NextLink href="/" passHref>
//                   <Button
//                     size="large"
//                     disableElevation
//                     variant="contained"
//                     component={MuiLink}
//                     className={globalStyle.bgGradient}
//                     display={{ xs: "block", sm: "inline-block" }}
//                   >
//                     <Stack direction="row" alignItems="center" spacing={2}>
//                       <PeopleOutline /> &nbsp; Subscribe
//                     </Stack>
//                   </Button>
//                 </NextLink>
//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   sx={{ alignItems: "center" }}
//                 >
//                   <Button
//                     color="secondary"
//                     onClick={() => openDialog()}
//                     className={buttonStyle.iconTextButton}
//                   >
//                     <ShareOutlinedIcon />
//                     Share
//                   </Button>
//                   <Typography>Share this league</Typography>
//                 </Stack>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//       <ShareContentOnMedia isOpen={isOpen} closeDialog={closeDialog} />
//     </Fragment>
//   );
// };
const HeroSection = () => {
  return <div>about</div>;
};
export default HeroSection;
