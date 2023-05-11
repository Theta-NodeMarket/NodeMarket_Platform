import { Advertisement } from "@/models/api";
import { Box, Card } from "@mui/material";
import React from "react";
import Image from "next/image";
import { thetaDataUrl } from "@/utils/consts";

export interface AdStatsProps {
  ad: Advertisement;
}

export const RenderMedia = ({ ad }: AdStatsProps) => {
  const srcUrl = `${thetaDataUrl}${ad.token}`;
  if (ad.media_type.includes("video"))
    return <video src={srcUrl} height="500" width="500" />;
  if (ad.media_type.includes("image"))
    return <img src={srcUrl} height="500" width="500" />;
  return <></>;
};

export const AdStats = ({ ad }: AdStatsProps) => {
  return (
    <Box display="flex">
      <RenderMedia ad={ad} />
      <Card
        sx={{
          background:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          border: "solid 1px rgba(250, 250, 250, .25)",
          display: "flex",
          padding: "24px",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        {JSON.stringify(ad)}
      </Card>
    </Box>
  );
};
