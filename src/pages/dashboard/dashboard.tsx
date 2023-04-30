import DashboardDisplayCard from "@/components/cards/dashboardDisplayCard";
import DashboardTooltip from "@/components/tooltips/DashboardTooltip";
import { AccordionTable } from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { DashboardTooltipType } from "../../lib/DashboardTooltipType";
import { FilterParams } from "@/components/dashboard/FilterParams";

const COLUMNS = [{ label: "Name" }, { label: "Status" }];
// {
//   label: (
//     <Button variant="contained" startIcon={<AddIcon />}>
//       Create&nbsp;ad
//     </Button>
//   ),
// },

const rows = Array.from({ length: 100 }, (_, index) => {
  return {
    data: {
      name: <Link href={`/${2 ** index}`}>{2 ** index}</Link>,
      status: (
        <Box display="flex" alignItems="center">
          Failed&nbsp;
          <DashboardTooltip 
            tooltipType={DashboardTooltipType.Error} 
            title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future. "
          />
        </Box>
      ),
    },
    extraData: Boolean(Math.random() > 0.5)
      ? {
        Clicks: Math.floor(Math.random() * 100),
        Impressions: Math.floor(Math.random() * 1000),
        }
      : undefined,
  };
});

export function Dashboard() {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <>
      {
        <Grid container alignItems={"center"} gap={"24px"}>
          <Grid item xs={12}>
            <FilterParams selectorTitle="Advertisement Filter" selectorItems={names}/>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={"24px"}>
              <Grid item xs={12}>
                <ImpressionsAndClicksChart />
              </Grid>
              <Grid item xs={12}>
                <AccordionTable rows={rows} columns={COLUMNS} />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      }
    </>
  );
}
