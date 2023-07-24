import { NextResponse } from "next/server";

export const guard = (req: any, token: string) => {
  if (!token) NextResponse.redirect("/login");
};
