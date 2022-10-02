import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ContactEmergency from "@mui/icons-material/ContactEmergency";
import Typography from "@mui/material/Typography";
import MailOutline from "@mui/icons-material/MailOutline";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";

import Dialog from "@src/components/shared/dialog";
import { CentreProps } from "@src/utils/interface";

interface Props {
  centre: CentreProps;
  isOpen: boolean;
  closeDialog: Function;
}
const CentreContact = ({ centre, isOpen, closeDialog }: Props): JSX.Element => {
  const data = [
    {
      icon: <ContactEmergency sx={{ color: "white" }} />,
      bg: "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)",
      title: "Call us:",
      titleValue: centre?.phoneNumber,
    },
    {
      icon: <MailOutline sx={{ color: "white" }} />,
      bg: "#5aab61",
      title: "Email",
      titleValue: centre?.emailAddress,
    },
    {
      icon: <LanguageOutlined sx={{ color: "white" }} />,
      bg: "#bb44f0",
      title: "Visit our site",
      titleValue: centre?.websiteUrl,
    },
    {
      icon: <ContactEmergency sx={{ color: "white" }} />,
      bg: "#310047",
      title: "Visit us address",
      titleValue: centre?.address,
    },
  ];

  return (
    <>
      <Dialog
        title={`${centre?.name} contact details`}
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Reach us via the dtails below."
        width="md"
        content={
          <Grid container spacing={5} marginTop={3}>
            {data.map(({ bg, icon, title, titleValue }, index) => (
              <Grid
                item
                xs={6}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    background: bg,
                    height: 50,
                    width: 50,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
                <Typography variant="subtitle1" component="p">
                  {title}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: "center" }}
                >
                  {titleValue ? titleValue : "Not available"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
        btns={[{ text: "Cancel", action: closeDialog }]}
      />
    </>
  );
};

export default CentreContact;
