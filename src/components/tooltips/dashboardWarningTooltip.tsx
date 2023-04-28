import Tooltip from "@mui/material/Tooltip";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import * as React from "react";

interface tooltipProps {
  title: string;
}

export default function DashboardWarningTooltip(props: tooltipProps) {
  return (
    <Tooltip
      title={props.title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#EEF22A",
            color: "#181818",
            "& .MuiTooltip-arrow": {
              color: "#EEF22A",
            },
          },
        },
      }}
    >
      <ReportProblemRoundedIcon htmlColor={"#EEF22A"} />
    </Tooltip>
  );
}
