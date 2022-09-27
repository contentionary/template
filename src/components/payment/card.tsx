import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "@src/components/shared/image";

export default function BasicCard({ item, className, contentClass }) {
  return (
    <Card variant="outlined" className={className}>
      <CardContent>
        {item.type != "transfer" && (
          <Typography
            variant="h6"
            component="p"
            style={{
              color: "#666666",
              fontWeight: 400,
              fontSize: 16,
              fontStyle: "normal",
              fontFamily: "Open Sans",
            }}
          >
            {item.type}
          </Typography>
        )}
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
          <Image
            src={item.logo}
            alt="card payment"
            height={item.height}
            width={item.width}
          />
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
            {item.paymentType}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
