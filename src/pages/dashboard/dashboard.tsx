import DashboardDisplayCard from "@/components/cards/dashboardDisplayCard";
import DashboardTooltip from "@/components/tooltips/DashboardTooltip";
import DashboardDateRangePicker from "@/components/inputs/dashboardDateRangePicker";
import DashboardSelector from "@/components/inputs/dashboardSelector";
import { AccordionTable } from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React from "react";
import { Box } from "@mui/material";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { DashboardTooltipType } from "../../lib/DashboardTooltipType";

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
          impressions: Math.floor(Math.random() * 1000),
          clicks: Math.floor(Math.random() * 100),
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "5em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5em",
            }}
          >
            <DashboardDateRangePicker />
            <DashboardSelector
              title="Metric Filter"
              items={names}
            ></DashboardSelector>
            <DashboardSelector
              title="Advertisements"
              items={names}
            ></DashboardSelector>
          </div>
          <DashboardTooltip 
            tooltipType={DashboardTooltipType.Error} 
            title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future. "
          />
          <DashboardTooltip 
            tooltipType={DashboardTooltipType.Warning} 
            title="Test Warning"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5em",
            }}
          >
            <DashboardDisplayCard
              cardDisplayTitle="Total impressions"
              cardDisplayValue="30"
            />
            <DashboardDisplayCard
              cardDisplayTitle="Total clicks"
              cardDisplayValue="25"
            />
            <DashboardDisplayCard
              cardDisplayTitle="Click through rate"
              cardDisplayValue="20%"
            />
          </div>
          <AccordionTable rows={rows} columns={COLUMNS} />
          <ImpressionsAndClicksChart />
        </div>
      }
    </>
  );
}
