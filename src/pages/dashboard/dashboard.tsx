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
        title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future. "
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
  // const series = useMemo(() => , [stats]);

  const clearForm = () => {
    setAdName("");
    setRedirectLink("");
    setFile(undefined);
    setToken("");
  };

  const handleSubmit = async () => {
    if (!adName || !redirectLink || !file) {
      console.log("error");
      return;
    }

    // upload to theta
    var response = await sendFileToTheta(file);

    // if failure:
    // keep modal open
    // display error text
    // return
    if (!response.ok) return; // if theta says no.
    const thetaToken = (await response.json()).key as string;
    // if success:
    // setToken = "";
    setToken(thetaToken);

    const { data } = await supabase.auth.getUser();
    const adData = {
      token: thetaToken,
      adName,
      redirectLink,
      mediaType: file.type,
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
    clearForm();
    setOpened(false);
  };

  const value = {
    adName,
    setAdName,
    redirectLink,
    setRedirectLink,
    file,
    setFile,
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
                  <ImpressionsAndClicksChart />
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
                onCancel={clearForm}
                onSubmit={handleSubmit}
                modalContent={<CreateAdvertisementForm />}
              />
            </ModalContext.Provider>
          </Grid>
        </Container>
      }
    </>
  );
}
