import { DashboardLayout } from "@/components/dashboard";
import { useRedirectIfNotUser } from "@/hooks";
import { CircularProgress } from "@mui/material";
import AdDetailPage from "./AdDetail";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { authLoading } = useRedirectIfNotUser();
  const router = useRouter();
  const adId = router.query.adId as string;

  if (authLoading || !router.isReady || !adId)
    return (
      <DashboardLayout>
        <CircularProgress color="primary" />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <AdDetailPage adId={adId} />
    </DashboardLayout>
  );
}
