import { NextResponse } from "next/server";
import { db } from "../../db";

export const runtime = "edge";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return new Response(JSON.stringify({ error: "wallet is required" }), {
      status: 400,
    });
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.wallet, wallet),
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "user not found" }), {
      status: 404,
    });
  }

  return NextResponse.json(user);
};
