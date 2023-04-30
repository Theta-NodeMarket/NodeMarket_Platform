import { Typography, Select, MenuItem, Grid, ListItemText, Checkbox } from "@mui/material"
import { useState } from "react";

interface selectorProps {
    title: string;
    items: { [key: string]: any };
}

export default function DashboardSelector(props: selectorProps)
{
    const [advertismentName, setAdvertismentName] = useState([]);

    const handleChange = (event: any) => {
        const {
          target: { value },
        } = event;
        setAdvertismentName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Grid container gap={".5em"}>
            <Grid item xs={12}>
                <Typography variant="h6">{props.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Select 
                    value={advertismentName} 
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')} 
                    multiple 
                    fullWidth 
                    sx={{background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"}}
                    >
                    {props.items.map((item: never) =>
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={advertismentName.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    )}           
                </Select>
            </Grid>
        </Grid>
    );
}