import { PublicationsWrapperFunc } from "@src/components/Layout/Wrapper/interface";
import Home from "./pages/home";
import Library from "./pages/library";
import BookDetails from "./pages/bookDetails";
import Document from "./pages/document";
import ErrorPage from "./pages/errorPage";
import MyPublications from "./pages/myPublication";
import { PortfolioPages } from "./interface";
import Wallet from "./pages/wallet";
import Settings from "./pages/settings";

const PortfolioPages: Record<PortfolioPages, PublicationsWrapperFunc> = {
  Home,
  Library,
  Wallet,
  Document,
  Settings,
  ErrorPage,
  BookDetails,
  MyPublications,
};

export default PortfolioPages;
