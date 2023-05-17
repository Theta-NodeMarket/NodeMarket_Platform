import { CircularProgress } from "@mui/material";
import React from "react";
import { useRedirectIfNotUser } from "@/hooks";
import Dashboard from "./dashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  const { authLoading } = useRedirectIfNotUser();

  if (authLoading)
    return (
      <DashboardLayout>
        <CircularProgress color="primary" />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
