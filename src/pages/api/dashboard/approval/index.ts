import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { adTable } from "@/utils/consts";
import { Advertisement } from "@/models/api";
import { type } from "@/lib/withApproval";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authType } = req.query;
  if (!authType || authType != type.ad) return res.status(400).end();

  if (req.method === "GET") {
    // get all pending advertisements
    try {
      const { data } = await supabase
        .from(adTable)
        .select("*")
        .eq("status", "Pending");

      const ads = data?.map((data) => data) as Advertisement[];

      return res.json(ads);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "POST") {
    // Update status of an ad
    const { authType } = req.query;
    const {
      id,
      status
    } = req.body;
    if (!authType || authType != type.ad || !id)
      return res.status(400).end();

    try {
      const { data } = await supabase
        .from(adTable)
        .update({
          status: status,
        }).eq('id', id)
        .select();
      const ad = data?.[0];
      if (!ad) return res.status(500).json({ message: "failed to update ad" });
      return res.status(200).json(ad);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(405).end();
  }
}