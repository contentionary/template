import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
//React-pdf
import { Document, Page, pdfjs } from "react-pdf";
// styles, interface and config
import { DocumentFunc } from "./interfaceType";
// app components
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//
import ReaderMenu from "./ReaderMenu";
import SocialMediaShare from "@src/components/BookDetails/share";
import { useDialog } from "@src/hooks";
import { FILE_DOWNLOAD_URL, isServerSide } from "../../utils";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const ReaderSection: DocumentFunc = ({ fileUrl = "#", allowDownload }) => {
  const router = useRouter();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(
    Number(router.query.pageNo) || 1
  );
  const [scale, setScale] = useState(1.5);
  const { isOpen, openDialog, closeDialog } = useDialog();

  function onDocumentLoadSuccess({ numPages }: { numPages: number | null }) {
    setNumPages(numPages);
  }
  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber: number | null) => {
      let nextPage = (prevPageNumber as number) + offset;
      if (nextPage < 1) nextPage = 1;
      else if (nextPage > Number(numPages)) nextPage = Number(numPages);
      return nextPage;
    });
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(+1);
  };

  const zoomIn = () => {
    setScale(scale + 0.2);
  };

  const zoomOut = () => {
    setScale(scale - 0.2);
  };

  const closeBook = () => {
    if (!isServerSide) {
      router.push(window.location.href.split("/document").join(""));
    }
  };

  const download = () => {
    if (allowDownload) window.open(FILE_DOWNLOAD_URL + fileUrl, "_blank");
  };

  return (
    <div className="pdfPage">
      <div
        className="innerWrapper"
        style={{}}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexFlow: "column",
            userSelect: "none",
            position: "relative",
          }}
        >
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            className="pdfHolder"
          >
            <Page
              scale={scale}
              loading={
                <Typography mt={100}>
                  ....Please wait while we load your page
                </Typography>
              }
              className="pdfReader"
              pageNumber={pageNumber}
            />
            <p className="pdfButtons">
              {pageNumber > 1 ? (
                <button onClick={previousPage}>Previous</button>
              ) : (
                <p></p>
              )}

              <p>
                Page {pageNumber} of {numPages}
              </p>

              {numPages && pageNumber < numPages ? (
                <button onClick={nextPage}>Next</button>
              ) : (
                <p></p>
              )}
            </p>
          </Document>
        </div>
      </div>
      <ReaderMenu
        nextPage={nextPage}
        previousPage={previousPage}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        share={() => openDialog()}
        closeBook={closeBook}
        download={download}
        allowDownload={allowDownload}
      />
      <SocialMediaShare isOpen={isOpen} closeDialog={closeDialog} />
    </div>
  );
};
export default ReaderSection;
