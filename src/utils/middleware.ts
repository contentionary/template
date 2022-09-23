import { NextRequest, NextResponse } from "next/server";

export const guard = (req: NextRequest, token: string) => {
  if (!token) NextResponse.redirect("/login");
};
