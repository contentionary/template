import { NextRequest } from "next/server";
import { devLog } from "./utils";

export async function middleware(req: NextRequest) {
  //   devLog("cookies token", req.cookies.get("token"));
}
