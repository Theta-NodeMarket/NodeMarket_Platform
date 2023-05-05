import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CreateAdvertisementForm() {
  return (
    <form>
      <TextField
        autoFocus
        margin="dense"
        id="Advertisement Name"
        label="Advertisement Name"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        id="Redirect Link"
        label="Redirect Link"
        type="text"
        fullWidth
        variant="standard"
      />
      <Button variant="contained" component="label">
        Upload media
        <input hidden accept="image/*" type="file" />
      </Button>
    </form>
  );
}
