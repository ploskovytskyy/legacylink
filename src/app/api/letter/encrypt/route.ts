import { NextResponse } from "next/server";
import crypto from "crypto";

// export const runtime = "edge";

export const POST = async (request: Request) => {
  const algorithm = process.env.ENCRYPT_ALGORITHM || "";
  const secretKey = process.env.SECRET_KEY || "";

  const payload = await request.json();

  if (!payload || !algorithm || !secretKey) {
    return NextResponse.json({
      error: "Something went wrong. ",
    });
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const text = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return NextResponse.json({
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  });
};
