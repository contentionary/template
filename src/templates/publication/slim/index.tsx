import { PublicationsWrapperFunc } from "@src/components/Wrapper/interface";
import Home from "./pages/home";
import Library from "./pages/library";
import Details from "./pages/details";
import Document from "./pages/document";
import ErrorPage from "./pages/errorPage";
import MyPublications from "./pages/myPublication";
import { PublicationPages } from "./interface";
import Wallet from "./pages/wallet";
import Settings from "./pages/settings";

const PublicationPages: Record<PublicationPages, PublicationsWrapperFunc> = {
  Home,
  Library,
  Details,
  Document,
  ErrorPage,
  MyPublications,
  Wallet,
  Settings,
};

export default PublicationPages;
