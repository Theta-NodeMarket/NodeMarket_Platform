export interface Advertisement {
  id: string;
  token: string;
  redirect_link: string;
  media_type: string;
  ad_name: string;
  status: string;
  created_date: string;
  updated_date: string;
}

export interface Statistic {
  ad_id: string;
  auth_id: string;
  date_key: string;
  impressions: number;
  clicks: number;
  created_date: string;
  updated_date: string;
}

export interface Promotion {
  ad_id: string;
  auth_id: string;
  date_key: string;
  impressions: number;
  clicks: number;
  created_date: string;
  updated_date: string;
}

export type AdWithStats = Advertisement &
  Pick<Statistic, "clicks" | "impressions">;
