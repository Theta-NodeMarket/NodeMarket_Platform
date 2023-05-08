import DashboardTooltip from "@/components/tooltips/DashboardTooltip";
import { AccordionTable } from "@/components/dashboard/AccordionTable";
import Link from "next/link";
import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { ImpressionsAndClicksChart } from "@/components/dashboard/Chart";
import { DashboardTooltipType } from "../../lib/DashboardTooltipType";
import { FilterParams } from "@/components/dashboard/FilterParams";
import Modal from "@/components/modals/GenericDialog";
import CreateAdvertisementForm from "@/components/forms/createAdvertisementForm";
import { useTheta } from "@/hooks/useTheta";

const { sendFileToTheta } = useTheta();

interface formParams {
  adName: string;
  setAdName: (adName: string) => void;
  redirectLink: string;
  setRedirectLink: (redirectLink: string) => void;
  file?: File;
  setFile: (file?: File) => void;
}

export const ModalContext = React.createContext<formParams>(undefined!);

const COLUMNS = [{ label: "Name" }, { label: "Status" }];
// {
//   label: (
//     <Button variant="contained" startIcon={<AddIcon />}>
//       Create&nbsp;ad
//     </Button>
//   ),
// },

const rows = Array.from({ length: 100 }, (_, index) => {
  return {
    data: {
      name: <Link href={`/${2 ** index}`}>{2 ** index}</Link>,
      status: (
        <Box display="flex" alignItems="center">
          Failed&nbsp;
          <DashboardTooltip
            tooltipType={DashboardTooltipType.Error}
            title="Please ensure that the video or image provided is not offensive and is not NSFW. Support for material considered NSFW may be added in the future. "
          />
        </Box>
      ),
    },
    extraData: Boolean(Math.random() > 0.5)
      ? {
          Clicks: Math.floor(Math.random() * 100),
          Impressions: Math.floor(Math.random() * 1000),
        }
      : undefined,
  };
});

export function Dashboard() {
  const [opened, setOpened] = React.useState(false);
  const [adName, setAdName] = React.useState("");
  const [redirectLink, setRedirectLink] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [token, setToken] = React.useState("");

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

    // if success:
    // token = blah blah blah
    setToken((await response.json()).key as string);
    console.log(token);

    // Upload to our db
    // if failure:

    // setToken = "";
    // keep modal open;
    // display error text;
    // return

    // if success:
    // Clear form
    // Close modal
    // Maybe pop up success message
    clearForm();
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
                    rows={rows}
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
