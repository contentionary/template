import { cache, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";

const Logout = () => {
  return (
    <div>
      <h1>....Logging you out</h1>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  cache.delete("user", context);
  cache.delete("token", context);
  cache.delete(context.req.headers.host as string, context);
  return redirect("/");

  return {
    props: {},
  };
};

export default Logout;
