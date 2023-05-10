import DashboardTooltip from "@/components/tooltips/DashboardTooltip";
import {
  AccordionTable,
  AccordionTableRow,
} from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React, { useMemo } from "react";
import { Box, Container, Grid } from "@mui/material";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { DashboardTooltipType } from "../../lib/DashboardTooltipType";
import { FilterParams } from "@/components/dashboard/FilterParams";
import Modal from "@/components/modals/GenericDialog";
import CreateAdvertisementForm from "@/components/forms/createAdvertisementForm";
import { useTheta } from "@/hooks/useTheta";
import Router from "next/router";

import {
  Advertisement,
  useDashboardAds,
  useDashboardStats,
} from "./useDashboard";
import { supabase } from "@/utils/supabase";

const createAdUrl = "/api/dashboard/campaigns";

interface FormParams {
  adName: string;
  setAdName: (adName: string) => void;
  redirectLink: string;
  setRedirectLink: (redirectLink: string) => void;
  file?: File;
  setFile: (file?: File) => void;
  adNameError: string;
  redirectLinkError: string;
  fileError: string;
  validateAdNameInput: ()=>Boolean;
  validateRedirectLinkInput: ()=>Boolean;
}

export const ModalContext = React.createContext<FormParams>(undefined!);

const COLUMNS = [{ label: "Name" }, { label: "Status" }];

const Status = ({ status }: { status: string }) => {
  if (status !== "Rejected") return <>{status}</>;

  return (
    <Box display="flex" alignItems="center">
      Failed&nbsp;
      <DashboardTooltip
        tooltipType={DashboardTooltipType.Error}
        title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future."
      />
    </Box>
  );
};

const createRows = (ads: Advertisement[]) =>
  ads.map(
    (ad, index) =>
      ({
        data: {
          name: <Link href={ad.id}>{ad.ad_name}</Link>,
          status: <Status status={ad.status} />,
        },
        extraData: {},
      } as AccordionTableRow)
  );

export function Dashboard() {
  const [opened, setOpened] = React.useState(false);
  const [adName, setAdName] = React.useState("");
  const [redirectLink, setRedirectLink] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [token, setToken] = React.useState("");
  const { sendFileToTheta } = useTheta();
  const { ads } = useDashboardAds();
  const { stats } = useDashboardStats();
  const series = useMemo(
    () =>
      stats
        ? [
            {
              name: "Impressions",
              data:
                stats?.map((stat) => ({
                  x: stat.date_key,
                  y: stat.impressions,
                })) ?? [],
            },
            {
              name: "Clicks",
              data:
                stats?.map((stat) => ({ x: stat.date_key, y: stat.clicks })) ??
                [],
            },
          ]
        : undefined,
    [stats]
  );

  // errors
  const [submitError, setSubmitError] = React.useState("");
  const [adNameError, setAdNameError] = React.useState("");
  const [redirectLinkError, setRedirectLinkError] = React.useState("");
  const [fileError, setFileError] = React.useState("");

  const ResetForm = () => {
    setAdName("");
    setRedirectLink("");
    setFile(undefined);
    setToken("");
    setSubmitError("");
    setAdNameError("");
    setRedirectLinkError("");
    setFileError("");
  };

  const validateAdNameInput = () => {
    let isValid = true;
    if (!adName) {
      setAdNameError("An advertisment name is required.");
      isValid = false;
    }
    else
    {
      setAdNameError("");
    }

    return isValid;
  }

  const validateRedirectLinkInput = () => {
    let isValid = true;
    if (!redirectLink) {
      setRedirectLinkError("A redirect link is required.");
      isValid = false;
    }
    else
    {
      setRedirectLinkError("");
    }

    return isValid;
  }

  const validateFileInput = () => {
    let isValid = true;
    if (!file) {
      setFileError("An image or video file is required.");
      isValid = false;
    }
    else
    {
      setFileError("");
    }

    return isValid;
  }


  const handleSubmit = async () => {

    let isValid = true;
    isValid = validateAdNameInput();
    isValid = validateRedirectLinkInput();
    isValid = validateFileInput();
    if(!isValid) return;

    // upload to theta
    var response = await sendFileToTheta(file!);

    // if failure:
    // keep modal open
    // display error text
    // return
    if (typeof response === "string") 
    {
      setSubmitError(response);
      return; // if theta says no.
    }
    const thetaToken = (await response.json()).key as string;
    // if success:
    // setToken = "";
    setToken(thetaToken);

    const { data } = await supabase.auth.getUser();
    const adData = {
      token: thetaToken,
      adName,
      redirectLink,
      mediaType: file?.type,
    };

    // currently getting 400 error.

    // Upload to our db
    var uploadToDbResp = await fetch(`${createAdUrl}?authId=${data.user?.id}`, {
      method: "POST",
      body: JSON.stringify(adData),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    // if failure:
    // keep modal open;
    // display error text;
    // return
    if (uploadToDbResp.status !== 200) {
      return;
    }

    // if success:
    // Clear form
    // Close modal
    // Maybe pop up success message
    setOpened(false);
    ResetForm();
    Router.reload();
  };

  const value = {
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
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <>
      {
        <Container fixed>
          <Grid container alignItems={"center"} gap={"24px"}>
            <Grid item xs={12}>
              <FilterParams
                selectorTitle="Advertisement Filter"
                selectorItems={names}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={"24px"}>
                <Grid item xs={12}>
                  {series ? (
                    <ImpressionsAndClicksChart series={series} />
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <AccordionTable
                    setModalOpen={setOpened}
                    rows={createRows(ads)}
                    columns={COLUMNS}
                  />
                </Grid>
              </Grid>
            </Grid>

            <ModalContext.Provider value={value}>
              <Modal
                modalTitle="Create Advertisement"
                modalSubmitText="Submit"
                modalOpen={opened}
                setModalOpen={setOpened}
                onCancel={ResetForm}
                onSubmit={handleSubmit}
                modalContent={<CreateAdvertisementForm submissionErrorMessage={submitError}/>}
              />
            </ModalContext.Provider>
          </Grid>
        </Container>
      }
    </>
  );
}
