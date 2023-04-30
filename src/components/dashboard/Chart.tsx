import { ApexOptions } from "apexcharts";
import { Card, Box } from "@mui/material";
import dynamic from "next/dynamic";
// Next dies when it tries to SSR ApexChart
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-1077335256
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ImpressionsAndClicksChartProps {
  series?: ApexAxisChartSeries;
}

const defaultSeries: ApexAxisChartSeries = [
  { name: "Impressions", data: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81] },
  { name: "Clicks", data: [0, 1, 2, 4, 8, 16, 32, 64, 128, 256] },
];

export const ImpressionsAndClicksChart = ({
  series = defaultSeries,
}: ImpressionsAndClicksChartProps) => {
  const options: ApexOptions = {
    chart: {
      foreColor:"#FAFAFA",
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
    xaxis: {
      categories: ['2002-03-01','2002-03-05','2002-03-06','2002-03-07', '2002-03-08', '2002-03-15', '2002-03-16', '2002-03-17', '2002-03-25', '2002-03-30'],
    },
  };

  return (
    <Card 
      sx={{
        background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        border: "solid 1px rgba(250, 250, 250, .25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <ApexChart
        options={options}
        series={series}
        type="line"
        width={500}
        height={320}
      />
    </Card>
  );
};
