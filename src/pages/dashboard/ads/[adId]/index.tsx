import { DashboardLayout } from "@/components/dashboard";
import AdDetailPage from "../../../../components/dashboard/AdDetail/AdDetail";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const adId = router.query.adId as string;

  return (
    <DashboardLayout>
      <AdDetailPage adId={adId} />
    </DashboardLayout>
  );
}
