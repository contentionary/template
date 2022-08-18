import Head from "next/head";
import { HeadFunc } from "./interfaceType";

const HeadPage: HeadFunc = ({ description, title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/contentionary.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  );
};

export default HeadPage;
