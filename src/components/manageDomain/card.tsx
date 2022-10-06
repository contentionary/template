import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  bgColor: string;
  title: string;
  icon?: JSX.Element;
}

export default function BasicCard({
  bgColor,
  icon,
  title,
}: Props): JSX.Element {
  return (
    <Card
      sx={{
        paddingX: 4,
        height: 149,
        background: "#FFFFFF",
        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.06)",
        borderRadius: 3,
        cursor: "pointer",
        textDecoration: "none !important",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 149,
        }}
      >
        <Box
          sx={{
            width: 40,
          }}
        >
          <Box
            sx={{
              background: bgColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              borderRadius: 1,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h5"
          component="p"
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "#616161",
            fontStyle: "normal",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
