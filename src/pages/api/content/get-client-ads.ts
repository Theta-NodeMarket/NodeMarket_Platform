import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// This end point is responsible for serving ads on a requesting website.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") return res.status(405).end();

  const { n, siteId } = req.query;
  if (!n || !siteId) return res.status(400).end();

  try {
    const { data } = await supabase.rpc("get_random_advertisements", { n });

    const ads = [...data].map((ad) => ({
      ...ad,
      src: `https://data.thetaedgestore.com/api/v2/data/${ad.token}`,
      token: undefined,
      status: undefined,
      created_date: undefined,
      updated_date: undefined,
    }));

    const dateKey = new Date().toISOString().split("T")[0];

    await Promise.all(
      ads.map(async (ad) => {
        await supabase.rpc("attempt_upsert_impressions", {
          adid: ad.id,
          authid: siteId,
          datekey: dateKey,
        });
      })
    );

    return res.json(ads);
  } catch (err) {
    return res.status(500).json(err);
  }
}
