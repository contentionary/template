/* eslint-disable no-unused-vars */
import { PublicationInt } from "@src/utils/interface";

export interface ReaderToolbarInt {
  share: () => void;
  download: () => void;
  closeBook: () => void;
  allowDownload: boolean;
  scale: number;
  pageNumber: number;
  numPages: number | null;
  zoomIn: () => void;
  zoomOut: () => void;
  nextPage: () => void;
  previousPage: () => void;
}

export declare type ReaderToolbarFunc = (
  props: ReaderToolbarInt
) => JSX.Element;
export declare type DocumentFunc = (props: PublicationInt) => JSX.Element;
