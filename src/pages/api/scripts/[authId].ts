import { readFile } from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { authId } = req.query;
  if (!authId || typeof authId !== "string") return res.status(400).end();
  const url = getHostUrl(req.headers.host);
  // serving data from a file https://vercel.com/guides/loading-static-file-nextjs-api-route
  const filePath = path.join(process.cwd(), "scripts") + "/promoter-script.js";
  const fileContents = (await readFile(filePath, "utf8"))
    .replaceAll("<<CHANGE PROMOTER ID>>", authId)
    .replaceAll("<<CHANGE BASE URL>>", url);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "test/javascript");
  return res.send(fileContents);
}

function getHostUrl(host: string = "localhost:3000") {
  const protocol = host.includes("localhost") ? "http://" : "https://";
  return `${protocol}${host}`;
}
