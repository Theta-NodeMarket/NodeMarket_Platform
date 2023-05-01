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
  const { adId } = req.query;
  if (!adId) return res.status(400).end();

  try {
    const { data: ads } = await supabase
      .from("advertisements")
      .select()
      .eq("id", adId);
    // todo: verify user id has access to this ad
    // can be done using rpc in supabase
    return res.json(ads);
  } catch (err) {
    return res.status(500).json(err);
  }
}
