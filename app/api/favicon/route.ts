import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const image = await fetch(
    "https://raw.githubusercontent.com/juyeolyu/eumlantree-homepage/main/public/favicon.png",
    { cache: "force-cache" },
  );

  if (!image.ok || !image.body) {
    return new NextResponse("Favicon unavailable", { status: 502 });
  }

  return new NextResponse(image.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
