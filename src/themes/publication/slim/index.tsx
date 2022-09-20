import { PublicationsWrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Library from "./pages/library";
import Details from "./pages/details";
import MyPublications from "./pages/myPublication";
import { PublicationPages } from "./interface";

const PublicationPages: Record<PublicationPages, PublicationsWrapperFunc> = {
  Home,
  Library,
  Details,
  MyPublications,
};

export default PublicationPages;
