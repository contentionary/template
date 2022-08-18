import Head from "next/head";
interface Props {
  description: string;
  title: string;
}
const HeadPage = ({ description, title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/contentionary.ico" />
    </Head>
  );
};

export default HeadPage;
