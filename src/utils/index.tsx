import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import {
  UserInt,
  CachedCentreInt,
  ErrorResponseInt,
  GetRequestInt,
  PostRequestInt,
  RequestResponseInt,
  CentreProps,
} from "@src/utils/interface";
// import { NextRouter } from "next/router";
import { QueryClient } from "react-query";
import { v4 as uuid } from "uuid";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
export const isServerSide = typeof window === "undefined";
export const FILE_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL ||
  "https://storage.contentionary.com/v1/download?fileUrl=";

export const DEFAULT_LOGO = "/public/images/logo.png";
export const BOOK_IMAGE_PLACEHOLDER = "/images/book-1.png";
export const FOLDER_IMAGE_PLACEHOLDER = "/images/cards/resume-folder.svg";

export const devLog = (title: string, value: any) => {
  console.log(`\n\n\n\n================${title}\n===========`, value);
};

export const getFileKey = (file: any) => {
  if (typeof file === "string") return file;
  const date = new Date();
  const fileFormat =
    typeof file === "string" ? file : file.name.split(".").pop();
  const FILE_LOCATION = `s3-${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  return `${FILE_LOCATION}/${uuid()}.${fileFormat}`;
};

// export const cancelCourse = () => {
//   Document.getElementById("create-course-form").reset();
// };

export const uploadFiles = async (file: any, setProgress: Function) => {
  try {
    const date = new Date();

    let params: any = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
      Key: `s3-${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/${uuid()}`,
      ACL: "public-read",
    };

    if (typeof file === "string") {
      file = file.replace(/^data:image\/\w+;base64,/, "");

      let format = file.charAt(0);
      if (format === "/") format = "jpg";
      else if (format === "i") format = "png";
      else if (format === "R") format = "gif";

      const Body = Buffer.from(file, "base64");

      params = {
        ...params,
        Key: `${params.Key}.${format}`,
        Body,
        ContentType: `image/${format}`,
      };
    } else {
      params.Body = file;
      params.Key = `${params.Key}.${file.name.split(".").pop()}`;
    }

    const parallelUploads3 = new Upload({
      client: new S3Client({
        region: "eu-west-3",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env
            .NEXT_PUBLIC_AWS_S3_SECRET_KEY_ID as string,
        },
      }),
      params,
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      let progressValue =
        (Number(progress.loaded) / Number(progress.total)) * 100;

      setProgress(Math.ceil(progressValue));
    });

    const res: any = await parallelUploads3.done();
    devLog("Result", {
      url: res.Location,
      uri: res.Location.split(".com/").pop(),
      res,
    });
    return res.Location.split(".com/").pop();
  } catch (err) {
    throw err;
  }
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity, //Result should be considered stalled after 30 seconds
      retry: 0, //Failed request should not be retried
      cacheTime: Infinity, //cached data should be purged after 10 minutes
      // onError: handleError,
      refetchOnMount: false,
    },
  },
});

export const copy = (id: string) => navigator.clipboard.writeText(id);

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
  if (err?.name === "AxiosError") {
    const { data } = err.response;
    err.message = data?.message || "Something went wrong with your request";
    err.statusCode = data?.httpStatusCode || 500;
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
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
  get: async ({
    url,
    method = "GET",
    token,
    headers = {},
  }: GetRequestInt): Promise<RequestResponseInt> => {
    const authorization = token || cache.get("token");
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
    token,
    headers = {},
  }: PostRequestInt): Promise<RequestResponseInt> => {
    const authorization = token || cache.get("token");

    if (authorization) headers.authorization = authorization;

    const response = await axios({
      method,
      url: baseUrl + url,
      headers,
      data,
    });

    return response.data;
  },

  delete: async (url: string) => await request.get({ url, method: "DELETE" }),
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
  } else if (count >= 1000) {
    return parseNumberFloat(1000, "K");
  } else return count;
};

export const dateTimeFormat = (dateTimeStamp: Date, timeStyle?: boolean) => {
  let dateTimeFormat;
  let date = new Date(dateTimeStamp);
  const dateOption: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOption: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (timeStyle)
    dateTimeFormat = date.toLocaleDateString("en-US", {
      ...dateOption,
      ...timeOption,
    });
  else dateTimeFormat = date.toLocaleDateString("en-US", dateOption);

  return dateTimeFormat;
};

export const timeAgo = (dateTimeStamp: Date) => {
  const date =
    dateTimeStamp instanceof Date ? dateTimeStamp : new Date(dateTimeStamp);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges: Record<string, number> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(
        Math.round(delta),
        key as Intl.RelativeTimeFormatUnit
      );
    }
  }
};

export const pageErrorHandler = (
  err: unknown,
  user: UserInt,
  token: string,
  centre: CachedCentreInt
) => ({
  props: {
    error: handleError(err),
    cachedData: { user, centre, token },
  },
});

export const getCentre = async (
  context: GetServerSidePropsContext,
  returnFullData: boolean = false
): Promise<CachedCentreInt | CentreProps | null> => {
  try {
    const host = context.req.headers.host as string;

    // let centre = cache.get(host, context);
    // if (centre) return centre;
    let { data: centre } = await request.get({
      url: `/centre/domain-centre?domain=${host}&proxy=learnafrica.cttn.ac`,
    });

    if (!returnFullData && centre)
      centre = {
        id: centre.id,
        slug: centre.slug,
        name: centre.name,
        template: centre.template,
        logo: centre.logo,
        phoneNumber: centre.phoneNumber || "+234 902 239 6389",
        emailAddress: centre.emailAddress || "contact@contentionary.com",
        address:
          centre.address || "38 Opebi Road, Ikeja, Lagos State, Nigeria.",
      };

    // cache.set(host, centre, context);
    if (!centre) throw new Error("Centre not found");

    return centre as CachedCentreInt | CentreProps;
  } catch (err) {
    throw err;
  }
};
