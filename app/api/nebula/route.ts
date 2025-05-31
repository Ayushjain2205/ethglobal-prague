import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const secretKey = process.env.THIRDWEB_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Missing THIRDWEB_SECRET_KEY env variable" },
      { status: 500 }
    );
  }
  try {
    const nebulaRes = await fetch("https://nebula-api.thirdweb.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": secretKey,
      },
      body: JSON.stringify({
        message,
        execute_config: {
          mode: "client",
        },
        context: {
          chainIds: [545],
        },
      }),
    });
    const data = await nebulaRes.json();
    return NextResponse.json({
      response: data?.choices?.[0]?.message?.content || data,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to contact Nebula API" },
      { status: 500 }
    );
  }
}
