import { NextRequest, NextResponse } from "next/server";

export const guard = (req: NextRequest, token: any) => {
  if (!token) NextResponse.redirect("/login");
};
