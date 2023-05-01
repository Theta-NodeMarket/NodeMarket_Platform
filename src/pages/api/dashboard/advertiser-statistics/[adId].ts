import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets all of the statistics data associated with one advertisement by ad id.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { adId } = req.query;
  if (!adId) return res.status(400).end();

  try {
    const { data } = await supabase
      .from("promotions")
      .select()
      .eq("ad_id", adId);

    return res.json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
}
