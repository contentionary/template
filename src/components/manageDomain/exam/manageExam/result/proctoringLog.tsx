import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Fragment, useState } from "react";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
//
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";

export default function ProctoredLog({
  examAnswerId,
  centreId,
  toggleToast,
}: {
  examAnswerId: string;
  centreId: string;
  toggleToast: Function;
}) {
  const [proctor, setProctor] = useState([]);
  const theme = useTheme();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  // const theme = useTheme;
  // const globalStyle = useGlobalStyle();
  const [activeStep, setActiveStep] = useState(0);
  //
  const maxSteps = proctor.length;
  //
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  async function getProctored() {
    try {
      const { data } = await request.get({
        url: `/centre/${centreId}/protor-content/exam-answer/${examAnswerId}`,
      });
      console.log(data, "proctored");
      openDialog();
      setProctor(data.contents);
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  }
  return (
    <>
      <MenuItem onClick={() => getProctored()} sx={{ fontSize: 18 }}>
        <>
          <CameraAltOutlined /> &nbsp; Proctored log
        </>
      </MenuItem>{" "}
      <Dialog
        title="Proctored Log"
        isOpen={isOpen}
        closeDialog={closeDialog}
        width="sm"
        content={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              onClick={handleBack}
              color="primary"
              // disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? <EastIcon /> : <WestIcon />}
            </Button>
            <Box sx={{ width: "70%" }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={10000}
              >
                {proctor.map((image, index) => (
                  <Fragment key={index.toString()}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Image
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        layout="responsive"
                        alt="proctored log"
                        src={image}
                      />
                    ) : null}
                  </Fragment>
                ))}
              </AutoPlaySwipeableViews>{" "}
              <MobileStepper
                sx={{
                  px: 3,
                  justifyContent: { xs: "center", md: "start" },
                  bgcolor: "secondary.dark",
                  "& .MuiMobileStepper-dot:not(.MuiMobileStepper-dotActive)": {
                    bgcolor: "secondary.light",
                  },
                }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                backButton={""}
                nextButton={""}
              />
            </Box>
            <Button
              size="small"
              onClick={handleNext}
              color="primary"
              // disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? <WestIcon /> : <EastIcon />}
            </Button>
          </Box>
        }
      />
    </>
  );
}
