import { NextResponse } from "next/server";
import { db } from "../../db";
import { users, type User } from "../../db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export const POST = async (request: Request) => {
  const newUser = (await request.json()) as User;

  if (!newUser.id) {
    //create
    await db.insert(users).values(newUser);
    return NextResponse.json({ success: true });
  }

  await db.update(users).set(newUser).where(eq(users.id, newUser.id));
  return NextResponse.json({ success: true });
};
