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
  if (req.method !== "POST") return res.status(405).end();
  const { adId, authId } = req.query;
  if (!adId || !authId) return res.status(400).end();
  const dateKey = new Date().toISOString().split("T")[0];

  try {
    await supabase.rpc("attempt_upsert_clicks", {
      adid: adId,
      authid: authId,
      datekey: dateKey,
    });
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}
