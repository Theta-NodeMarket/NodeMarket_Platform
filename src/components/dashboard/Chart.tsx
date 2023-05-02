import { ApexOptions } from "apexcharts";
import { Card, Grid, Stack, Typography} from "@mui/material";
import dynamic from "next/dynamic";
// Next dies when it tries to SSR ApexChart
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-1077335256
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ImpressionsAndClicksChartProps {
  series?: ApexAxisChartSeries;
}

function getTotalClicks() {
  let totalClicks: number = 0; 
  for(let i = 0; i < defaultSeries[0].data.length; i++)
  {
    totalClicks = defaultSeries[0].data[i] + totalClicks;
  }

  return totalClicks;
}

function getTotalImpressions() {
  let totalImpressions = 0; 
  for(let i = 0; i < defaultSeries[1].data.length; i++)
  {
    totalImpressions = defaultSeries[1].data[i] + totalImpressions;
  }

  return totalImpressions;
}

function getClickThruRate() {
  const clicks = getTotalClicks();
  const impressions = getTotalImpressions();

  return ((clicks / impressions)*100).toPrecision(2).toString().concat("%");
}

const defaultSeries: ApexAxisChartSeries = [
  { name: "Clicks", data: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81] },
  { name: "Impressions", data: [0, 1, 2, 4, 8, 16, 32, 64, 128, 256] },
];

export const ImpressionsAndClicksChart = ({
  series = defaultSeries,
}: ImpressionsAndClicksChartProps) => {
  const options: ApexOptions = {
    colors: ['#5CC542', '#FFA500'],
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
    responsive: [
      {
        breakpoint: 1300,
        options: {
          chart: {
            width: "800px"
          },
        }
      },
      {
        // mui md breakpoint
        breakpoint: 930,
        options: {
          chart: {
            width: "550px"
          },
        }
      },
      {
        // mui sm breakpoint
        breakpoint: 650,
        options: {
          chart: {
            width: "300px"
          },
        }
      }
    ]
  };

  return (
    <Grid container gap={".5em"}>
      <Grid item xs={12}>
        <Typography variant="h6">Metrics</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
            border: "solid 1px rgba(250, 250, 250, .25)",
            display: "flex",
            padding: "24px",
            alignItems: "center",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}>
          <Stack direction={{xs:"column", sm: "row"}} justifyContent={"center"} spacing={"24px"}>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{getTotalClicks()}</Typography>
              <Typography variant="body1">Total clicks</Typography>
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{getTotalImpressions()}</Typography>
              <Typography variant="body1">Total impressions</Typography>
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Typography variant="h4">{getClickThruRate()}</Typography>
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