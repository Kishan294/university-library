import { config } from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  imagekit: { privateKey, publicKey, urlEndpoint },
} = config.env;

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
