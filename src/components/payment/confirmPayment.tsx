import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { isServerSide, request } from "@src/utils";
import Toast from "@src/components/shared/toast";
import { useToast } from "@src/utils/hooks";

interface Props {
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  reference: any;
  redirectUrl: string;
  price: number;
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
}: Props) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const { toastMessage, toggleToast } = useToast();

  async function getPaymentConfirmation() {
    try {
      const { data } =
        price === 0
          ? { data: { valueGiven: true } }
          : await request.get({
              url: `/transaction/${reference}/verify`,
            });
      if (data.valueGiven) {
        setShow(false);
        const [url] = redirectUrl.split("verifyValue");
        if (!isServerSide) window.location.href = url;
      }
    } catch ({ message }) {
      toggleToast(message as string);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
      getPaymentConfirmation();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
