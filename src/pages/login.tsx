import Login from "@src/components/Auth/login";
import { cache, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";

const LoginEntry = () => {
  return <Login />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = cache.get("token", context);
  if (token) return redirect("/");
};

export default LoginEntry;
