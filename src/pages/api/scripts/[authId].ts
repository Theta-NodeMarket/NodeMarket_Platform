import { readFile } from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { authId } = req.query;
  if (!authId || typeof authId !== "string") return res.status(400).end();
  // serving data from a file https://vercel.com/guides/loading-static-file-nextjs-api-route
  const filePath = path.join(process.cwd(), "scripts");
  const fileContents = (
    await readFile(filePath + "/promoter-script.js", "utf8")
  ).replaceAll("<<CHANGE THIS ID>>", authId);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "test/javascript");
  return res.send(fileContents);
}
