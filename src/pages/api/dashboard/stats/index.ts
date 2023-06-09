import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { adTable, campaignTable, promoTable } from "@/utils/consts";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets all of the statistics data associated with all advertisements owned by the requesting advertiser.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { authId } = req.query;
  if (!authId) return res.status(400).end();

  try {
    const { data: campaigns } = await supabase
      .from(campaignTable)
      .select(`${adTable} (*)`)
      .eq("auth_id", authId);

    if (!campaigns) return res.status(204).end();

    const adIds: string[] = campaigns.map(
      (campaign) => (campaign.advertisements as any).id
    );

    const { data: stats } = await supabase
      .from(promoTable)
      .select()
      .in("ad_id", adIds)
      .order("date_key", { ascending: true });

    return res.json(stats);
  } catch (err) {
    return res.status(500).json(err);
  }
}
