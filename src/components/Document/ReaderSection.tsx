import React, { useState } from "react";
//React-pdf
import { Document, Page, pdfjs } from "react-pdf";
// styles, interface and config
import { DocumentFunc } from "./interfaceType";
// app components
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const ReaderSection: DocumentFunc = ({ fileUrl = "#" }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number | null }) {
    setNumPages(numPages);
  }
  const changePage = (offset: number) => {
    setPageNumber(
      (prevPageNumber: number | null) => (prevPageNumber as number) + offset
    );
  };
  const previousPage = () => {
    changePage(-1);
  };
  const nextPage = () => {
    changePage(+1);
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
            <Page scale={1.7} className="pdfReader" pageNumber={pageNumber} />
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
    </div>
  );
};
export default ReaderSection;
