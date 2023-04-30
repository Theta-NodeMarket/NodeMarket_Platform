import { Grid } from "@mui/material";
import DashboardDateRangePicker from "../inputs/dashboardDateRangePicker";
import DashboardSelector from "../inputs/dashboardSelector";

interface filterParamsProps {
    selectorTitle?: string;
    selectorItems?: { [key: string]: any };
  }

export function FilterParams(props: filterParamsProps) {
    return (
    <Grid container justifyContent={"flex-start"} spacing={"24px"}>
        <Grid item xs={12} md={6}>
            <DashboardDateRangePicker/>
        </Grid>
        <Grid item xs={12} md={6}>
            {props.selectorItems !== undefined && props.selectorTitle !== undefined ? <DashboardSelector title={props.selectorTitle} items={props.selectorItems} /> : undefined}
        </Grid>
    </Grid>
    )
}