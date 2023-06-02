import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "@src/components/shared/image";
import { DEFAULT_LOGO } from "@src/utils";

interface Props {
  logo?: string;
  processor: string;
  className: string;
  contentClass: string;
}
export default function BasicCard({
  logo,
  processor,
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
          <div style={{ width: 150, height: 80 }}>
            <Image
              src={logo || DEFAULT_LOGO}
              alt="card payment"
              height={logo ? 80 : 40}
              width={150}
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
              marginTop: 7,
            }}
          >
            Pay with {processor}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
