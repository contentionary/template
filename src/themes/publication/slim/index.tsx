import { PublicationsWrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Library from "./pages/library";
import Details from "./pages/details";
import Document from "./pages/document";
import ErrorPage from "./pages/errorPage";
import MyPublications from "./pages/myPublication";
import { PublicationPages } from "./interface";

const PublicationPages: Record<PublicationPages, PublicationsWrapperFunc> = {
  Home,
  Library,
  Details,
  Document,
  ErrorPage,
  MyPublications,
};

export default PublicationPages;
