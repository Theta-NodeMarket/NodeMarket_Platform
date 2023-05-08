import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ModalContext } from "../../pages/dashboard/dashboard";
import styles from "./createAdvertisementForm.module.scss";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function CreateAdvertisementForm() {
  const { adName, setAdName, redirectLink, setRedirectLink, file, setFile } =
    React.useContext(ModalContext);

  const handleAdNameUpdate = (value: string) => {
    setAdName(value);
  };

  const handleRedirectLinkUpdate = (value: string) => {
    setRedirectLink(value);
  };

  const handleFileUpdate = (value?: File) => {
    setFile(value);
  };

  return (
    <form>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <TextField
            className={styles.textField}
            autoFocus
            margin="dense"
            id="Advertisement Name"
            label="Advertisement Name"
            type="text"
            fullWidth
            variant="standard"
            value={adName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleAdNameUpdate(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={styles.textField}
            margin="dense"
            id="Redirect Link"
            label="Redirect Link"
            type="text"
            fullWidth
            variant="standard"
            value={redirectLink}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleRedirectLinkUpdate(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button variant="contained" component="label">
              Upload media
              <input
                hidden
                accept="image/*, video/*"
                type="file"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleFileUpdate(event.target.files?.[0]);
                }}
              />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {file?.type.includes("image") && (
            <>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={250}
                height={250}
                quality={100}
              />
              <Typography>{file?.name}</Typography>
            </>
          )}
          {file?.type.includes("video") && (
            <>
              <video
                controls
                autoPlay
                style={{ width: "250px", height: "250px" }}
                src={URL.createObjectURL(file)}
              />
              <Typography>{file?.name}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
