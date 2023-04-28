import Tooltip from "@mui/material/Tooltip";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import * as React from "react";

interface tooltipProps {
  title: string;
}

export default function DashboardErrorTooltip(props: tooltipProps) {
  return (
    <Tooltip
      title={props.title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#FF0000",
            "& .MuiTooltip-arrow": {
              color: "#FF0000",
            },
          },
        },
      }}
    >
      <ReportProblemRoundedIcon htmlColor={"#FF0000"} />
    </Tooltip>
  );
}
