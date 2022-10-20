import { cache, isServerSide, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";

const Logout = () => {
  if (!isServerSide) {
    cache.delete("isCentreSubscriber");
    cache.delete("token");
    cache.delete("user");

    window.location.href = "/";
  }
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cache.delete("user", context);
  cache.delete("token", context);
  cache.delete(context.req.headers.host as string, context);

  return {
    props: {
      cachedData: {
        centre: {},
      },
    },
  };
};

export default Logout;
