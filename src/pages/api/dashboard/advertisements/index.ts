import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

// Gets all of the advertisements owned by the requesting user.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  const { authId } = req.query;
  if (!authId) return res.status(400).end();

  try {
    const { data } = await supabase
      .from("campaigns")
      .select(`advertisements (*)`)
      .eq("auth_id", authId);

    const ads = data?.map((data) => data?.advertisements);

    return res.json(ads);
  } catch (err) {
    return res.status(500).json(err);
  }
}
