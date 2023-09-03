import { NextResponse } from "next/server";
import crypto from "crypto";

// export const runtime = "edge";

export const GET = async (request: Request) => {
  const algorithm = process.env.ENCRYPT_ALGORITHM || "";
  const secretKey = process.env.SECRET_KEY || "";

  const { searchParams } = new URL(request.url);
  const payload = searchParams.get("payload");

  if (!payload || !algorithm || !secretKey) {
    return NextResponse.json({
      error: "Something went wrong. ",
    });
  }

  const hash = JSON.parse(payload) as {
    iv: string;
    content: string;
  };

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  const decryptedJSON = decrpyted.toString();

  const data = JSON.parse(decryptedJSON);

  return NextResponse.json(data);
};
