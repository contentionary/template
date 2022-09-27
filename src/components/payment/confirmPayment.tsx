import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { request } from "@src/utils";
import Toast from "@src/components/shared/toast";
import { useRouter } from "next/router";
import { useToast } from "@src/utils/hooks";

interface Props {
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  reference: any;
  redirectUrl: string;
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
}: Props) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const { toastMessage, toggleToast } = useToast();
  const router = useRouter();
  async function getPaymentConfirmation() {
    try {
      const { data } = await request.get({
        url: `/transaction/${reference}/verify`,
      });
      if (data.valueGiven) {
        setShow(false);
        router.push(redirectUrl);
      }
    } catch ({ message }) {
      toggleToast(message);
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
            zIndex: 2,
            background: "rgba(0, 0, 0, 0.7)",
            left: 0,
            top: 0,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <IconButton
              style={{ background: "white" }}
              onClick={() => setShow(false)}
            >
              <Close htmlColor="red" />
            </IconButton>
          </div>
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
