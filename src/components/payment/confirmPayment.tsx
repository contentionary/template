import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { cache, isServerSide, request } from "@src/utils";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";

interface Props {
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  reference: any;
  redirectUrl: string;
  price: number;
  purpose?: string;
}
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", marginRight: 10 }}>
        <LinearProgress variant="determinate" {...props} />
      </div>
      <div style={{ minWidth: 35 }}>
        <Typography variant="body2" color="primary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </div>
    </div>
  );
}
export default function CircularDeterminate({
  reference,
  redirectUrl,
  position,
  price,
  purpose,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const { toastMessage, toggleToast } = useToast();

  const getPaymentConfirmation = useCallback(async () => {
    try {
      const { data }: any =
        price === 0
          ? { data: { valueGiven: true } }
          : await request.get({
              url: `/transaction/${reference}/verify`,
            });
      if (data.valueGiven) {
        if (
          data.purpose === "CENTRE_SUBSCRIPTION" ||
          purpose === "CENTRE_SUBSCRIPTION"
        ) {
          cache.set("isCentreSubscriber", true);
        }
        setShow(false);
        const [url] = redirectUrl.split("?verifyValue");
        if (!isServerSide) window.location.href = url;
      } else {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }
    } catch ({ message }) {
      toggleToast(message);
    }
  }, [reference, redirectUrl, price]);

  useEffect(() => {
    if (progress < 100) {
      getPaymentConfirmation();
    } else {
      setShow(false);
      toggleToast(
        "Transaction Verification Timed Out, kindly refresh the page"
      );
    }
  }, [progress, getPaymentConfirmation]);

  return (
    <>
      {show && (
        <Paper
          style={{
            position: position ? position : "absolute",
            padding: 20,
            textAlign: "center",
            width: "100%",
            zIndex: 999999,
            background: "rgba(0, 0, 0, 0.7)",
            left: 0,
            top: 0,
          }}
        >
          <Typography
            variant="h5"
            component="p"
            style={{ marginBottom: 20, color: "white" }}
          >
            Transaction Verification in Progress
          </Typography>

          <LinearProgressWithLabel value={progress} />
        </Paper>
      )}
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </>
  );
}
