import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import styles from "./createAdvertisementForm.module.scss";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import DashboardTooltip from "../tooltips/DashboardTooltip";
import { DashboardTooltipType } from "@/types/DashboardTooltipType";
import { ModalContext } from "@/pages/dashboard";

interface formProps {
  submissionErrorMessage: string;
}

export default function CreateAdvertisementForm(props: formProps) {
  const {
    adName,
    setAdName,
    redirectLink,
    setRedirectLink,
    file,
    setFile,
    adNameError,
    redirectLinkError,
    fileError,
    validateAdNameInput,
    validateRedirectLinkInput,
  } = React.useContext(ModalContext);

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
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {props.submissionErrorMessage.length > 0 ? (
            <>
              <Typography variant="body1" color={"#FF0000"}>
                {props.submissionErrorMessage}
              </Typography>
              <DashboardTooltip
                title="We currently only support MetaMask. 
                To create advertisements, download the MetaMask extension and create a wallet."
                tooltipType={DashboardTooltipType.Error}
              />
            </>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={styles.textField}
            margin="dense"
            id="Advertisement Name"
            label="Advertisement Name"
            type="text"
            fullWidth
            onBlur={validateAdNameInput}
            error={adNameError.length > 0 ? true : false}
            helperText={adNameError.length > 0 ? adNameError : ""}
            required
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
            onBlur={validateRedirectLinkInput}
            error={redirectLinkError.length > 0 ? true : false}
            helperText={redirectLinkError.length > 0 ? redirectLinkError : ""}
            required
            variant="standard"
            value={redirectLink}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleRedirectLinkUpdate(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"column"} alignItems={"flex-start"}>
            <Button variant="contained" component="label">
              Upload media *
              <input
                required
                hidden
                accept="image/*, video/*"
                type="file"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleFileUpdate(event.target.files?.[0]);
                }}
              />
            </Button>
            <Typography
              sx={{
                fontSize: ".75rem",
                marginTop: "3px",
                lineHeight: "1.66",
                letterSpacing: "0.03333em",
                color: "#FF0000",
              }}
            >
              {fileError.length > 0 ? fileError : ""}
            </Typography>
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
