import { Container, Grid } from "@mui/material";
import { useDashboardAd, useDashboardAdStats } from "../useDashboard";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { useMemo } from "react";
import { AdStats } from "./AdStats";
import { Roles, withRole } from "@/lib/withRole";
import { useUser } from "@supabase/auth-helpers-react";
import { ADVERTISER_DETAILS_NO_DATA_WARNING, ADVERTISER_NO_DATA_WARNING, PROMOTER_NO_DATA_WARNING } from "@/utils/consts";

export interface AdDetailPageProps {
  adId: string;
}

const AdDetailPage = ({ adId }: AdDetailPageProps) => {
  const user = useUser();
  const { ad, error: adError } = useDashboardAd(adId);
  const { stats, error: statsError } = useDashboardAdStats(adId);

  const series = useMemo(
    () =>
      stats
        ? [
            {
              name: "Impressions",
              data:
                stats?.map((stat) => ({
                  x: stat.date_key,
                  y: stat.impressions,
                })) ?? [],
            },
            {
              name: "Clicks",
              data:
                stats?.map((stat) => ({
                  x: stat.date_key,
                  y: stat.clicks,
                })) ?? [],
            },
          ]
        : undefined,
    [stats]
  );

  return (
    <Container fixed>
      <Grid container alignItems={"center"} gap={"24px"}>
        <Grid item xs={12}>
          <Grid container spacing={"24px"}>
            <Grid item xs={12}>
              {ad ? <AdStats ad={ad} /> : null}
            </Grid>
            <Grid item xs={12}>
              {series ? <ImpressionsAndClicksChart series={series} warningText={user?.user_metadata?.role === "Promoter" ? PROMOTER_NO_DATA_WARNING : `${ADVERTISER_NO_DATA_WARNING} ${ADVERTISER_DETAILS_NO_DATA_WARNING}`} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRole(AdDetailPage, Roles.Advertiser, "/dashboard");
