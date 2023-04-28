import DashboardDisplayCard from "@/components/cards/dashboardDisplayCard";
import DashboardErrorTooltip from "@/components/tooltips/dashboardErrorTooltip";
import DashboardDateRangePicker from "@/components/datePickers/dashboardDateRangePicker";
import { AccordionTable } from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React from "react";

const COLUMNS = [{ label: "Name" }, { label: "Status" }];
// {
//   label: (
//     <Button variant="contained" startIcon={<AddIcon />}>
//       Create&nbsp;ad
//     </Button>
//   ),
// },

const rows = Array.from({ length: 200 }, (_, index) => {
  return {
    data: {
      name: <Link href={`/${2 ** index}`}>{2 ** index}</Link>,
      status: <>Failed</>,
    },
    hasExtraData: Boolean(Math.random() > 0.9),
  };
});

export function Dashboard() {
  return (
    <>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5em",
        }}
      >
        <DashboardDateRangePicker />
        <DashboardErrorTooltip title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future. "></DashboardErrorTooltip>
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
      </div> */}
      <AccordionTable rows={rows} columns={COLUMNS} />
    </>
  );
}
