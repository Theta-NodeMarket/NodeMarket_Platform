import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
} from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { type, withApproval } from "@/lib/withApproval";
import { DashboardLayout } from "@/components/dashboard";

function Approval() {
    const user = useUser();

  return (
    <Container fixed sx={{
        marginTop: "36px",
        flex: 1,
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <Stack direction={"column"} spacing={"30px"} sx={{width: "100%", height: "100%"}} justifyContent={"center"} alignContent={"center"}>
            <div style={{maxHeight: "100%", maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} >
                <video src="https://data.thetaedgestore.com/api/v2/data/0x378f7d9173201617afbe00b71153219f914f1125aff7aff1ad997f6d6c126fb1" playsInline autoPlay muted loop></video>
            </div>
            <Stack direction={"row"} spacing={"30px"} justifyContent={"center"} alignContent={"center"}>
                <Button variant="contained" color={"primary"}>Approve</Button>
                <Button variant="contained" color={"warning"}>Skip</Button>
                <Button variant="contained" color={"error"}>Reject</Button>
            </Stack>
        </Stack>
    </Container>
  )
}

const WrappedApproval = withApproval(Approval, type.ad, "/");

export default function ApprovalPage() {
  return (
    <DashboardLayout>
        <WrappedApproval />
    </DashboardLayout>
  );
}

