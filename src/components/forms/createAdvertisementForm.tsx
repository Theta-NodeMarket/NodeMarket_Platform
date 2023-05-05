import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { CreateAdModalContext } from "../../pages/dashboard/dashboard";

export default function CreateAdvertisementForm() {
  const model = React.useContext(CreateAdModalContext);
  const [adName, setAdName] = React.useState("");
  const [redirectLink, setRedirectLink] = React.useState("");
  const [files, setFiles] = React.useState<any>([]);

  return (
    <form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="Advertisement Name"
            label="Advertisement Name"
            type="text"
            fullWidth
            variant="standard"
            value={adName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAdName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            id="Redirect Link"
            label="Redirect Link"
            type="text"
            fullWidth
            variant="standard"
            value={redirectLink}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedirectLink(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload media
            <input hidden accept="image/*" type="file" onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFiles([...files, event.target.files[0]]);
            }} />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
