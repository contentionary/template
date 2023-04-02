import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "@src/components/shared/image";

interface Props {
  logo: string;
  paymentType: string;
  className: string;
  contentClass: string;
  width: number;
}
export default function BasicCard({
  logo,
  paymentType,
  className,
  contentClass,
  width,
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
          <div style={{ width: 200, height: 100 }}>
            <Image
              src={logo}
              alt="card payment"
              objectFit="contain"
              width="200px"
              height="100%"
            />
          </div>

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
