import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { type, withApproval } from "@/lib/withApproval";
import { DashboardLayout } from "@/components/dashboard";
import { AdWithStats } from "@/models/api";

const pendingAdsUrl = "/api/dashboard/approval";

function Approval() {
    const user = useUser();
    const [ads, setAds] = useState<AdWithStats[]>();
    const [error, setError] = useState<Error>();
    const [adIndex, setAdIndex] = useState(0);

    const GetAdName = () => {
      if(!ads) return;

      if(adIndex >= ads.length) return null;

      return ads[adIndex].ad_name;
    }

    const DisplayAd = () => {
      if(!ads) return null;

      if(ads.length <= 0  ) return <Typography variant="h5">No pending ads at this moment.</Typography>;

      if(adIndex <= ads.length-1)
      {
        return ads[adIndex].media_type.includes('image') ?
          <img src={`https://data.thetaedgestore.com/api/v2/data/${ads[adIndex].token}`} style={{maxWidth: "100%", maxHeight: "100%"}} /> : 
          <video controls autoPlay muted loop src={`https://data.thetaedgestore.com/api/v2/data/${ads[adIndex].token}`} style={{maxWidth: "100%", maxHeight: "100%"}}/>;
      }
    };

    const SkipAd = () => {
      if(!ads)
        return;

      if(adIndex == ads?.length-1)
        setAdIndex(0);

      if(adIndex < ads?.length-1)
        setAdIndex(adIndex+1);
    }

    const UpdateAd = (action: string) => {
      const updatePendingAds = async () => {
        if(!ads) return;

        const url = `${pendingAdsUrl}?authType=${user?.user_metadata?.type}`;
        const response = await fetch(url);
        const updateParams = {
          id: ads[adIndex].id,
          status: action
        }

        await fetch(url, {
          method: "POST",
          body: JSON.stringify(updateParams),
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
        });
        
        await response.json();
      }

      updatePendingAds().then(()=>{
        if(!ads) return;
        
        if(ads.length > 0)
        {
          ads.splice(adIndex, 1);
          SkipAd();
          setAds(ads);
        }

      }).catch(setError);
    }

    useEffect((()=>{
      const getPendingAds = async () => {
        const url = `${pendingAdsUrl}?authType=${user?.user_metadata?.type}`;
        const response = await fetch(url);
        return await response.json();
    };

    getPendingAds().then(setAds).catch(setError);
  }),[user?.user_metadata?.type]);

  return (
    <Container fixed sx={{
        marginTop: "36px",
        flex: 1,
        height: "600px",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <Typography variant="h5">{GetAdName()}</Typography>
        <Stack direction={"column"} spacing={"30px"} sx={{width: "100%", height: "100%"}} justifyContent={"center"} alignContent={"center"} flexWrap={"wrap"}>
            <div style={{height: "500px", width: "500px", display: "flex", alignItems: "center", justifyContent: "center"}} >
              {DisplayAd()}
            </div>
            <Stack direction={"row"} spacing={"30px"} justifyContent={"center"} alignContent={"center"}>
                <Button variant="contained" color={"primary"} onClick={()=>UpdateAd("Approved")}>Approve</Button>
                <Button variant="contained" color={"warning"} onClick={SkipAd}>Skip</Button>
                <Button variant="contained" color={"error"} onClick={()=>UpdateAd("Rejected")}>Reject</Button>
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

