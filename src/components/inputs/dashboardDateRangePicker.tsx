import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Grid, Stack } from "@mui/material";

export default function DashboardDateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container gap={".5em"}>
        <Grid item xs={12}>
          <Typography variant="h6">Date Filter</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }}
            gap={".5em"}
          >
            <DatePicker
              sx={{ background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))", width: "100%"}}
              label="Start date" />
            <DatePicker 
              sx={{ background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))", width: "100%"}}
              label="End date" />
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
