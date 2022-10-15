import React, { useState } from "react";
// next components
import { useRouter } from "next/router";
// React-pdf
import { Document, Page, pdfjs } from "react-pdf";
// mui components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// colors
import grey from "@mui/material/colors/grey";
// app components
import ReaderMenu from "./ReaderMenu";
import ReaderToolbar from "./ReaderToolbar";
import ReaderToolbarMobile from "./ReaderToolbarMobile";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// styles, interface and config
import { useDialog } from "@src/hooks";
import { DocumentFunc } from "./interfaceType";
import { useEventListener } from "@src/utils/hooks";
import usePdfReaderStyle from "@src/styles/pdfReader";
import { cache, FILE_DOWNLOAD_URL, isServerSide } from "@src/utils";
import SocialMediaShare from "@src/components/shared/shareContentOnMedia/share";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const ReaderSection: DocumentFunc = ({ fileUrl = "#", allowDownload, id }) => {
  const router = useRouter();
  const pdfStyle = usePdfReaderStyle();
  const resumptionKey = `${id}-last-page`;
  //
  const [scale, setScale] = useState(1.4);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(
    Number(router.query.pageNo) || cache.get(resumptionKey) || 1
  );
  const [numPages, setNumPages] = useState<number | null>(null);
  const [renderedPageNumber, setRenderedPageNumber] = useState<number | null>(
    null
  );
  //
  const { isOpen, openDialog, closeDialog } = useDialog();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
    setNumPages(numPages);
  };
  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber: number | null) => {
      let nextPage = (prevPageNumber as number) + offset;
      if (nextPage < 1) nextPage = 1;
      else if (nextPage > Number(numPages)) nextPage = Number(numPages);
      //
      cache.set(resumptionKey, nextPage);

      return nextPage;
    });
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(+1);
  };

  const changeScale = (offset: number) => {
    setScale((prevScale) => Number((prevScale + offset).toFixed(2)));
  };

  const zoomIn = () => {
    changeScale(+0.2);
  };

  const zoomOut = () => {
    changeScale(-0.2);
  };

  const closeBook = () => {
    if (!isServerSide) {
      router.push(window.location.href.split("/document").join(""));
    }
  };

  const download = () => {
    if (allowDownload) window.open(FILE_DOWNLOAD_URL + fileUrl, "_blank");
  };

  const isLoading =
    renderedPageNumber !== pageNumber || renderedScale !== scale;

  const handler = ({ key }: KeyboardEventInit) => {
    if (key === "ArrowLeft") {
      previousPage();
    } else if (key === "ArrowRight") {
      nextPage();
    }
    return;
  };

  useEventListener("keydown", handler);

  return (
    <Box bgcolor={grey[100]} className={pdfStyle.pdfPage}>
      <Box
        bgcolor={grey[100]}
        className="react-pdf__innerWrapper"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Stack sx={{ userSelect: "none", position: "relative" }}>
          <Document
            file={fileUrl}
            options={options}
            imageResourcesPath="/public/images/"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <ReaderToolbar
              scale={scale}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              numPages={numPages}
              nextPage={nextPage}
              pageNumber={pageNumber}
              previousPage={previousPage}
              allowDownload={allowDownload}
              share={() => openDialog()}
              closeBook={closeBook}
              download={download}
              setScale={setScale}
            />
            {isLoading && renderedPageNumber && renderedScale ? (
              <Page
                scale={renderedScale}
                className="prevPage"
                pageNumber={renderedPageNumber}
                key={renderedPageNumber + "@" + renderedScale}
              />
            ) : null}
            <Page
              scale={scale}
              key={pageNumber + "@" + scale}
              onRenderSuccess={() => {
                setRenderedScale(scale);
                setRenderedPageNumber(pageNumber);
              }}
              loading={
                <Typography mt={100} minHeight="75vh">
                  ....Please wait while we load your page
                </Typography>
              }
              className="pdfReader"
              pageNumber={pageNumber}
            />
            <ReaderToolbarMobile
              numPages={numPages}
              nextPage={nextPage}
              pageNumber={pageNumber}
              previousPage={previousPage}
            />
          </Document>
        </Stack>
      </Box>
      <ReaderMenu
        scale={scale}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        nextPage={nextPage}
        numPages={numPages}
        pageNumber={pageNumber}
        previousPage={previousPage}
        allowDownload={allowDownload}
        share={() => openDialog()}
        closeBook={closeBook}
        download={download}
      />
      <SocialMediaShare isOpen={isOpen} closeDialog={closeDialog} />
    </Box>
  );
};
export default ReaderSection;
