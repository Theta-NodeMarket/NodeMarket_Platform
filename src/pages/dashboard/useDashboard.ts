import { useFetchEffect } from "@/hooks/useFetch";
import { AdWithStats, Advertisement, Statistic } from "@/models/api";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const adsUrl = "/api/dashboard/campaigns";
const statsUrl = "/api/dashboard/stats";

export const useDashboardAds = () => {
  const [ads, setAds] = useState<AdWithStats[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getAds = async () => {
      const authId = (await supabase.auth.getUser()).data?.user?.id;
      const url = `${adsUrl}?authId=${authId}`;
      const response = await fetch(url);
      return await response.json();
    };

    getAds().then(setAds).catch(setError);
  }, []);

  return { ads, error };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<Statistic[]>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const getStats = async () => {
      const authId = (await supabase.auth.getUser()).data.user?.id;
      const url = `${statsUrl}?authId=${authId}`;
      const response = await fetch(url);
      return await response.json();
    };
    getStats().then(setStats).catch(setError);
  }, []);

  return { stats, error };
};

export const useDashboardAd = (adId: string) => {
  const url = `${adsUrl}/${adId}`;
  const { data: [ad] = [], error } = useFetchEffect<Advertisement[]>(url);
  return { ad, error };
};

export const useDashboardAdStats = (adId: string) => {
  const url = `${statsUrl}/${adId}`;
  const { data: stats, error } = useFetchEffect<Statistic[]>(url);
  return { stats, error };
};
