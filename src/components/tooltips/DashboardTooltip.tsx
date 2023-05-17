import Tooltip from "@mui/material/Tooltip";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { DashboardTooltipType } from "@/types/DashboardTooltipType";
import * as React from "react";

interface tooltipProps {
  title: string;
  tooltipType: DashboardTooltipType;
}

export default function DashboardTooltip(props: tooltipProps) {
  return (
    <Tooltip
      title={props.title}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor:
              props.tooltipType === DashboardTooltipType.Error
                ? "#FF0000"
                : "#EEF22A",
            color:
              props.tooltipType === DashboardTooltipType.Error
                ? "#FAFAFA"
                : "#181818",
            "& .MuiTooltip-arrow": {
              color:
                props.tooltipType === DashboardTooltipType.Error
                  ? "#FF0000"
                  : "#EEF22A",
            },
          },
        },
      }}
    >
      <ReportProblemRoundedIcon
        htmlColor={
          props.tooltipType === DashboardTooltipType.Error
            ? "#FF0000"
            : "#EEF22A"
        }
      />
    </Tooltip>
  );
}
