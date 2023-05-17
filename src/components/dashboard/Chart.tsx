import { ApexOptions } from "apexcharts";
import { Card, Grid, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { glassCardBgSettings } from "@/utils/consts";
// Next dies when it tries to SSR ApexChart
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-1077335256
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ImpressionsAndClicksChartProps {
  series?: ApexAxisChartSeries;
}

export const ImpressionsAndClicksChart = ({
  series,
}: ImpressionsAndClicksChartProps) => {
  const totalClicks = useMemo(() => {
    const clickSeries =
      (series?.[1]?.data as ApexAxisChartSeries[1]["data"][]) ?? [];
    return clickSeries.reduce((prev, { y }: any) => prev + y, 0);
  }, [series]);

  const totalImpressions = useMemo(() => {
    const impressionSeries =
      (series?.[0]?.data as ApexAxisChartSeries[0]["data"][]) ?? [];
    return impressionSeries.reduce((prev, { y }: any) => prev + y, 0);
  }, [series]);

  const clickThroughRate = useMemo(() => {
    const quotient = totalClicks / totalImpressions;
    if (!quotient) return "0%";
    return (quotient * 100).toPrecision(2).concat("%");
  }, [totalClicks, totalImpressions]);

  const options: ApexOptions = {
    colors: ["#FFA500", "#5CC542"],
    chart: {
      foreColor: "#FAFAFA",
      fontFamily: "Roboto",
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Impressions",
        },
      },
      {
        opposite: true,
        title: {
          text: "Clicks",
        },
      },
    ],
    responsive: [
      {
        breakpoint: 1300,
        options: {
          chart: {
            width: "800px",
          },
        },
      },
      {
        // mui md breakpoint
        breakpoint: 930,
        options: {
          chart: {
            width: "550px",
          },
        },
      },
      {
        // mui sm breakpoint
        breakpoint: 650,
        options: {
          chart: {
            width: "300px",
          },
        },
      },
    ],
  };

  return (
    <Grid container gap={".5em"}>
      <Grid item xs={12}>
        <Typography variant="h6">Metrics</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            background: glassCardBgSettings,
            border: "solid 1px rgba(250, 250, 250, .25)",
            display: "flex",
            padding: "24px",
            alignItems: "center",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            spacing={"24px"}
          >
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{totalClicks}</Typography>
              <Typography variant="body1">Total clicks</Typography>
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{totalImpressions}</Typography>
              <Typography variant="body1">Total impressions</Typography>
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{clickThroughRate}</Typography>
              <Typography variant="body1">Click through rate</Typography>
            </Stack>
          </Stack>
          <ApexChart
            options={options}
            series={series}
            type="line"
            width={1100}
            height={350}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
