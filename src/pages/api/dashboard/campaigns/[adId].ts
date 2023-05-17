import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { adTable } from "@/utils/consts";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets an advertisement's details by id.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { adId } = req.query;
  if (!adId) return res.status(400).end();
  if (req.method === "GET") {
    try {
      const { data: ads } = await supabase
        .from(adTable)
        .select()
        .eq("id", adId);
      // todo: verify user id has access to this ad
      // can be done using rpc in supabase
      return res.json(ads);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "DELETE") {
    try {
      const { data } = await supabase
        .from(adTable)
        .update({ status: "Deactivated" })
        .eq("id", adId)
        .select();
      return res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(405).end();
  }
}
