import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  paymentType: string;
  className: string;
  contentClass: string;
}
export default function BasicCard({
  paymentType,
  className,
  contentClass,
}: Props) {
  return (
    <Card variant="outlined" className={className}>
      <CardContent>
        <div
          className={contentClass}
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="p"
            style={{
              fontWeight: 400,
              fontSize: 16,
              fontStyle: "normal",
              fontFamily: "Open Sans",
              color: "#000000",
            }}
          >
            {paymentType}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
