import { useFetchEffect } from "@/hooks/useFetch";
import { AdWithStats, Advertisement, Statistic } from "@/models/api";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const adsUrl = "/api/dashboard/campaigns";
const statsUrl = "/api/dashboard/stats";

export const useDashboardAds = (authId?: string) => {
  const [ads, setAds] = useState<AdWithStats[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getAds = async () => {
      const url = `${adsUrl}?authId=${authId}`;
      const response = await fetch(url);
      return await response.json();
    };

    authId && getAds().then(setAds).catch(setError);
  }, [authId]);

  return { ads, error };
};

export const useDashboardStats = (authId?: string) => {
  const [stats, setStats] = useState<Statistic[]>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const getStats = async () => {
      const url = `${statsUrl}?authId=${authId}`;
      const response = await fetch(url);
      return await response.json();
    };
    authId && getStats().then(setStats).catch(setError);
  }, [authId]);

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
