import { NextResponse } from "next/server";
import { db } from "../../db";

export const runtime = "edge";

export const GET = async () => {
  const users = await db.query.users.findMany();
  return NextResponse.json({ users });
};
