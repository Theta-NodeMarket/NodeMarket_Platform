import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const adsUrl = "/api/dashboard/campaigns";
const statsUrl = "/api/dashboard/stats";

export interface Advertisement {
  id: string;
  token: string;
  redirect_link: string;
  media_type: string;
  ad_name: string;
  status: string;
}

export const useDashboardAds = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
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

// todo: fix authentication
export interface Statistic {
  ad_id: string;
  auth_id: string;
  date_key: string;
  impressions: number;
  clicks: number;
  created_date: string;
  updated_date: string;
}

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

// not using useFetch since userId requires async
// const useFetch = <T>(url: string, options?: RequestInit) => {
//   const [data, setData] = useState<T>();
//   const [error, setError] = useState<Error>();
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(url, options);
//       return (await response.json()) as T;
//     };
//     fetchData().then(setData).catch(setError);
//   }, [url, options]);
//   return { data, error };
// };
