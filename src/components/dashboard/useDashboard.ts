import { useFetchEffect } from "@/hooks/useFetch";
import { Roles } from "@/lib/withRole";
import { AdWithStats, Advertisement, Statistic } from "@/models/api";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const adsUrl = "/api/dashboard/campaigns";
const statsUrl = "/api/dashboard/stats";
const promoterAdUrl = "/api/dashboard/promoters/campaigns";
const promoterStatUrl = "/api/dashboard/promoters/statistics";

export const useDashboardAds = () => {
  const user = useUser();
  const [ads, setAds] = useState<AdWithStats[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getAds = async () => {
      if (!user) return [];
      const role = user.user_metadata.role;
      const url = `${
        role === Roles.Advertiser ? adsUrl : promoterAdUrl
      }?authId=${user.id}`;
      const response = await fetch(url);
      return await response.json();
    };

    getAds().then(setAds).catch(setError);
  }, [user]);

  return { ads, error };
};

export const useDashboardStats = () => {
  const user = useUser();
  const [stats, setStats] = useState<Statistic[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getStats = async () => {
      if (!user) return [];
      const role = user.user_metadata.role;
      const url = `${
        role === Roles.Advertiser ? statsUrl : promoterStatUrl
      }?authId=${user.id}`;
      const response = await fetch(url);
      return await response.json();
    };
    getStats().then(setStats).catch(setError);
  }, [user]);

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
