import Head from "next/head";
import Script from "next/script";
import { HeadFunc } from "./interfaceType";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const HeadPage: HeadFunc = ({ description, title, image }) => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { domain, googleAnalyticsCode } = cachedData.centre;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={image} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href={image} />
      <link rel="icon" type="image/png" sizes="16x16" href={image} />
      <link rel="manifest" href="/site.webmanifest"></link>
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content={title} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={domain || "https://www.edtify.com/"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={domain || "https://www.edtify.com/"}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image}></meta>

      {/* <!-- Google tag (gtag.js) --> */}
      {googleAnalyticsCode && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsCode}`}
        />
      )}

      {googleAnalyticsCode && (
        <Script id="google-analytics">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${googleAnalyticsCode}');
        `}
        </Script>
      )}
    </Head>
  );
};

export default HeadPage;
