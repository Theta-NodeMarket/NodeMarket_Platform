import { Advertisement } from "@/models/api";
import { Grid, Card, Stack, Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { glassCardBgSettings, thetaDataUrl } from "@/utils/consts";
import { DetailsCallout } from "@/components/dashboard/detailsCallout";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./AdStats.module.scss";
import GenericDialog from "@/components/modals/GenericDialog";

export interface AdStatsProps {
  ad: Advertisement;
}

const deleteAdUrl = "/api/dashboard/campaigns";

export const RenderMedia = ({ ad }: AdStatsProps) => {
  const srcUrl = `${thetaDataUrl}${ad.token}`;
  if (ad.media_type.includes("video"))
    return <video src={srcUrl} height="100%" width="100%" autoPlay controls style={{objectFit: "cover"}} />;
  if (ad.media_type.includes("image"))
    return (
      <img
        alt={ad.ad_name}
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBackToDashboardClick = (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const truncateDate = (dateString: string) => {
    return dateString.slice(0, dateString.indexOf("T"));
  };

  const handleDeleteAd = async () => {
    if (ad.status === "Deactivated") return;

    // Upload to our db
    var deleteDbResp = await fetch(`${deleteAdUrl}/${ad.id}`, {
      method: "DELETE",
    });

    if (deleteDbResp.status === 200) {
      router.reload();
    }
  };

  return (
    <>
      <GenericDialog
        modalTitle="Deactivate Advertisment?"
        modalContent="Are you sure you want to deactivate this advertisment? This is permanent."
        modalSubmitText="Deactivate Advertisment"
        modalOpen={dialogOpen}
        setModalOpen={setDialogOpen}
        onSubmit={handleDeleteAd}
      />
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
              position: "relative",
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
            {ad.status !== "Deactivated" ? (
              <Tooltip
                onClick={() => {
                  setDialogOpen(true);
                }}
                title="Deactivate Advertisment"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#FF0000",
                      color: "#FAFAFA",
                      "& .MuiTooltip-arrow": {
                        color: "#FF0000",
                      },
                    },
                  },
                }}
              >
                <IconButton sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  margin: "10px",
                  backgroundColor: "#FAFAFA",
                  color: "#FF0000"
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
