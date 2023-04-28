import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";

export default function DashboardDateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: ".5em",
        }}
      >
        <Typography variant="h6">Date Filter</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <DatePicker 
          sx={{ background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",}}
          label="Start date" />
          <Typography variant="h4">-</Typography>
          <DatePicker 
          sx={{ background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",}}
          label="End date" />
        </div>
      </div>
    </LocalizationProvider>
  );
}
