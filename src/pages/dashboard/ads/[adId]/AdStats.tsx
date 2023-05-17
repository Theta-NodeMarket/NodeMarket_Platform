import { Advertisement } from "@/models/api";
import { Grid, Card, Stack, Button } from "@mui/material";
import React from "react";
import { glassCardBgSettings, thetaDataUrl } from "@/utils/consts";
import { DetailsCallout } from "@/components/dashboard/detailsCallout";
import { useRouter } from "next/router";

export interface AdStatsProps {
  ad: Advertisement;
}

export const RenderMedia = ({ ad }: AdStatsProps) => {
  const srcUrl = `${thetaDataUrl}${ad.token}`;
  if (ad.media_type.includes("video"))
    return <video src={srcUrl} height="100%" width="100%" />;
  if (ad.media_type.includes("image"))
    return (
      <img
        src={srcUrl}
        height="100%"
        width="100%"
        style={{ objectFit: "cover" }}
      />
    );
  return <></>;
};

export const AdStats = ({ ad }: AdStatsProps) => {
  const router = useRouter();

  const handleBackToDashboardClick = (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const truncateDate = (dateString: string) => {
    return dateString.slice(0, dateString.indexOf("T"));
  };

  return (
    <Grid container spacing={"24px"}>
      <Grid item xs={12} md={12}>
        <Button variant="contained" onClick={handleBackToDashboardClick}>
          Back to dashboard
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            width: "100%",
            height: "500px",
            background: glassCardBgSettings,
            border: "solid 1px rgba(250, 250, 250, .25)",
            display: "flex",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <RenderMedia ad={ad} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            width: "100%",
            height: "500px",
            background: glassCardBgSettings,
            border: "solid 1px rgba(250, 250, 250, .25)",
            padding: "24px",
          }}
        >
          <Stack direction={"column"} spacing={"12px"}>
            <DetailsCallout label="Advertisement Name" content={ad.ad_name} />
            <DetailsCallout label="Status" hasStatus content={ad.status} />
            <DetailsCallout
              label="Created Date"
              content={truncateDate(ad.created_date)}
            />
            <DetailsCallout
              label="Updated Date"
              content={truncateDate(ad.updated_date)}
            />
            <DetailsCallout
              label="Redirect Link"
              hasLink
              content={ad.redirect_link}
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};
