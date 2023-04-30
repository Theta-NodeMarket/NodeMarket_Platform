import { ApexOptions } from "apexcharts";
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
    // xaxis: {
    //   type: "datetime",
    // },
  };

  return (
    <ApexChart
      options={options}
      series={series}
      type="line"
      width={500}
      height={320}
    />
  );
};
