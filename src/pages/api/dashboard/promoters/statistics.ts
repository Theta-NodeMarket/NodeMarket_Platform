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
  if (!authId) return res.status(400).end();

  // Gets all of the statistic data for advertisements that a promoter has served and earned credit for.
  try {
    const { data: ads } = await supabase
      .from("promotions")
      .select()
      .eq("auth_id", authId);

    return res.json(ads);
  } catch (err) {
    return res.status(500).json(err);
  }
}
