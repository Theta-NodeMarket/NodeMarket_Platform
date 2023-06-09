import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { adTable, promoTable } from "@/utils/consts";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets all of the advertisements that a promoter has served and earned credit for.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { authId } = req.query;
  if (!authId) return res.status(400).end();

  try {
    const { data: ads } = await supabase
      .from(promoTable)
      .select(`*, ${adTable} (ad_name)`)
      .eq("auth_id", authId);
    return res.json(ads?.map((ad) => ({ ...ad, ...ad.advertisements })));
  } catch (err) {
    return res.json(err);
  }
}
