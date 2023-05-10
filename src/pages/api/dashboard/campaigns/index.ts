import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { adTable, campaignTable, promoTable } from "@/utils/consts";
import { AdWithStats, Advertisement } from "@/models/api";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets all of the advertisements owned by the requesting user.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authId } = req.query;
  if (!authId) return res.status(400).end();

  if (req.method === "GET") {
    // get all a user's advertisements
    try {
      const { data } = await supabase
        .from(campaignTable)
        .select(`${adTable} (*)`)
        .eq("auth_id", authId);

      const ads = data?.map((data) => data?.advertisements) as Advertisement[];

      const promos = await Promise.all(
        ads?.map(async (ad) => {
          const { data } = await supabase
            .from(promoTable)
            .select()
            .eq("ad_id", ad.id)
            .eq("auth_id", authId);

          const impressions = data?.reduce(
            (prev, { impressions }) => prev + impressions,
            0
          );
          const clicks = data?.reduce((prev, { clicks }) => prev + clicks, 0);
          return { ...ad, clicks, impressions } as AdWithStats;
        })
      );

      return res.json(promos);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "POST") {
    // create a new advertisement
    const { authId: auth_id } = req.query;
    const {
      token,
      adName: ad_name,
      redirectLink: redirect_link,
      mediaType: media_type,
    } = req.body;
    if (!auth_id || !ad_name || !token || !redirect_link || !media_type)
      return res.status(400).end();

    try {
      const { data } = await supabase
        .from(adTable)
        .insert({
          token,
          redirect_link,
          ad_name,
          media_type,
          status: "Pending",
        })
        .select();
      const ad = data?.[0];
      if (!ad) return res.status(500).json({ message: "failed to create ad" });
      const advertisement_id = ad.id;

      // create a campaign using ad.id as advertisement_id and auth_id
      await supabase.from(campaignTable).insert({
        advertisement_id,
        auth_id,
      });

      return res.status(200).json(ad);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(405).end();
  }
}

// todo:
// make token the primary key of advertisements to prevent duplicate
// make auth_id and ad_id primary keys of campaign for the same reason
