import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import {
  CachedCentreInt,
  ErrorResponseInt,
  PostRequestInt,
  RequestResponseInt,
} from "@src/utils/interface";

export const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
export const isServerSide = typeof window === "undefined";

export const devLog = (title: string, value: any) => {
  console.log(`\n\n\n\n================${title}\n===========`, value);
};

export const redirect = (
  destination: string,
  environment: "client" | "server" = "server"
) => {
  if (environment === "server")
    return {
      redirect: { destination },
    };

  window.location.href = destination;
};

export const isEmpty = (value: any) => {
  let isEmpty = false;
  if (!value) isEmpty = true;
  else if (typeof value === "object" && Object.keys(value).length === 0)
    isEmpty = true;

  return isEmpty;
};

export const parseJSON = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

export const handleError = (err: any): ErrorResponseInt => {
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || 404;
  devLog("Error handler", err);

  return { message, statusCode };
};

export const cache = {
  set: (
    key: string,
    value: any,
    context?: GetServerSidePropsContext | boolean
  ): void => {
    try {
      value = typeof value === "string" ? value : JSON.stringify(value);
      if (isServerSide) {
        setCookie(key, value, context as GetServerSidePropsContext);
      } else {
        localStorage.setItem(key, value);
        if (context) setCookie(key, value);
      }
    } catch (err) {
      handleError(err);
    }
  },

  get: (key: string, context?: GetServerSidePropsContext) => {
    try {
      let value: any;

      if (isServerSide) {
        value = getCookie(key, context);
      } else {
        value = localStorage.getItem(key);
      }
      if (isEmpty(value)) return null;

      value = parseJSON(value);

      return value;
    } catch (err) {
      handleError(err);
    }
  },

  delete: (
    key: string,
    context?: GetServerSidePropsContext | boolean
  ): void => {
    try {
      if (isServerSide) {
        deleteCookie(key, context as GetServerSidePropsContext);
      } else {
        localStorage.removeItem(key);
        if (context) deleteCookie(key);
      }
    } catch (err) {
      handleError(err);
    }
  },
};

export const request = {
  get: async (
    url: string,
    method: "GET" | "DELETE" = "GET"
  ): Promise<RequestResponseInt> => {
    const authorization = cache.get("token");
    const headers: any = {};
    if (authorization) headers.authorization = authorization;

    url = baseUrl + url;
    const { data } = await axios({
      method,
      url,
      headers,
    });

    return data;
  },

  post: async ({
    url,
    data,
    method = "POST",
  }: PostRequestInt): Promise<RequestResponseInt> => {
    const response = await axios({
      method,
      url: baseUrl + url,
      headers: {
        authorization: cache.get("token"),
      },
      data,
    });

    return response.data;
  },

  delete: async (url: string) => await request.get(url, "DELETE"),
  patch: async (params: PostRequestInt) =>
    await request.post({ ...params, method: "PATCH" }),
};

export const kCount = (count: number) => {
  function parseNumberFloat(divider: number, quantity: string) {
    let kView = String(count / divider);
    let view = kView.split(".");
    let remainder = view[1]?.split("");
    let remainderToNumber = parseInt(remainder && remainder[0]);
    return (
      view[0] +
      (remainderToNumber > 0 ? `.${remainderToNumber}` : "") +
      quantity
    );
  }

  if (count >= 1000000000) {
    return parseNumberFloat(1000000000, "B");
  } else if (count >= 1000000) {
    return parseNumberFloat(1000000, "M");
  } else return parseNumberFloat(1000, "K");
};

export const getCentre = async (
  context: GetServerSidePropsContext
): Promise<CachedCentreInt> => {
  try {
    const isDev =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_NODE_ENV === "development";
    const host = context.req.headers.host as string;

    let centre = cache.get(host, context);
    if (centre) return centre;

    const urlToken = host.split(".");
    if (urlToken.length === 1 && !isDev) throw new Error("Invalid url");

    const subdomain = isDev ? "new-centre-test" : urlToken[0];
    // const subdomain = urlToken[0];
    const { data } = (await request.get(
      `/centre/${subdomain}`
    )) as RequestResponseInt;
    centre = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      theme: data.theme,
      logo: data.logo,
    };

    cache.set(host, centre, context);

    return centre;
  } catch (err) {
    throw err;
  }
};
