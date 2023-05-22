import DashboardTooltip from "@/components/tooltips/DashboardTooltip";
import {
  AccordionTable,
  AccordionTableRow,
} from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { DashboardTooltipType } from "@/types/DashboardTooltipType";
import Modal from "@/components/modals/GenericDialog";
import CreateAdvertisementForm from "@/components/forms/createAdvertisementForm";
import { useTheta } from "@/hooks/useTheta";
import Router from "next/router";

import {
  useDashboardAds,
  useDashboardStats,
} from "../../components/dashboard/useDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/utils/supabase";
import { ADVERTISER_DASHBOARD_NO_DATA_WARNING, ADVERTISER_NO_DATA_WARNING, PROMOTER_NO_DATA_WARNING, acceptedFileTypes } from "@/utils/consts";
import { AdWithStats } from "@/models/api";
import { withAuth } from "@/lib/withAuth";
import { useUser } from "@supabase/auth-helpers-react";

const createAdUrl = "/api/dashboard/campaigns";
const URL_REGEX_REDIRECT_LINK = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

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
  validateAdNameInput: () => Boolean;
  validateRedirectLinkInput: () => Boolean;
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

const createRows = (ads: AdWithStats[] = []) =>
  ads.map(
    (ad, index) =>
      ({
        data: {
          name: <Link href={`/dashboard/ads/${ad.id}`}>{ad.ad_name}</Link>,
          status: <Status status={ad.status} />,
        },
        extraData: {
          Impressions: ad.impressions,
          Clicks: ad.clicks,
        },
      } as AccordionTableRow)
  );

function Dashboard() {
  const user = useUser();
  const { sendFileToTheta } = useTheta();
  const { ads } = useDashboardAds();
  const { stats } = useDashboardStats();

  const [opened, setOpened] = useState(false);
  const [adName, setAdName] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [file, setFile] = useState<File>();
  const [token, setToken] = useState("");

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
    } else {
      setAdNameError("");
    }

    return isValid;
  };

  const validateRedirectLinkInput = () => {
    let isValid = true;
    if(!URL_REGEX_REDIRECT_LINK.test(redirectLink))
    {
      setRedirectLinkError("A valid redirect link is required. Ie: https://www.google.com/");
      isValid = false;
    }
    else {
      setRedirectLinkError("");
    }

    return isValid;
  };

  const validateFileInput = () => {
    let isValid = true;
    setFileError("");
    if (!file) {
      setFileError("An image or video file is required.");
      isValid = false;
    }

    if (
      file &&
      acceptedFileTypes.some((item) => {
        file.type.toLowerCase().includes(item);
      })
    ) {
      console.log(file.type.toLowerCase());
      setFileError(`We do not currently support ${file.type}.`);
      isValid = false;
    }

    return isValid;
  };

  const validateForm = () => {
    let nameValidation = validateAdNameInput();
    let redirectValidation = validateRedirectLinkInput();
    let fileValidation = validateFileInput();

    if (!nameValidation || !redirectValidation || !fileValidation) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    let isValid = true;
    isValid = validateForm();
    if (!isValid) return;

    // upload to theta
    var response = await sendFileToTheta(file!);

    // if failure:
    // keep modal open
    // display error text
    // return
    if (typeof response === "string") {
      setSubmitError(response);
      return; // if theta says no.
    }
    const thetaToken = (await response?.json()).key as string;
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

    // Upload to our db
    var uploadToDbResp = await fetch(`${createAdUrl}?authId=${user?.id}`, {
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

  return (
    <Container fixed>
      <Grid container alignItems={"center"} gap={"24px"}>
        <Grid item xs={12}>
          <Grid container spacing={"24px"}>
            <Grid item xs={12}>
              {series ? (
                <ImpressionsAndClicksChart
                  series={series}
                  warningText={
                    user?.user_metadata?.role === "Promoter"
                      ? PROMOTER_NO_DATA_WARNING
                      : `${ADVERTISER_NO_DATA_WARNING} ${ADVERTISER_DASHBOARD_NO_DATA_WARNING}`
                  }
                />
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
            modalContent={
              <CreateAdvertisementForm submissionErrorMessage={submitError} />
            }
          />
        </ModalContext.Provider>
      </Grid>
    </Container>
  );
}

const WrappedDashboard = withAuth(Dashboard, "/sign-in");

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <WrappedDashboard />
    </DashboardLayout>
  );
}
