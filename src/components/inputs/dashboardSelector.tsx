import { Typography, Select, MenuItem, Menu } from "@mui/material"

interface selectorProps {
    title: string;
    items: { [key: string]: any };
}



export default function DashboardSelector(props: selectorProps)
{
    return (
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: ".5em",
            }}
        >
            <Typography variant="h6">{props.title}</Typography>
            <Select>
                {props.items.map((item: any, index: number) =>
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                )}           
            </Select>
        </div>
    );
}