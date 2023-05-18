import React from "react";
import Documentation from "./documentation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function DocsPage() {
  return (
    <DashboardLayout>
      <Documentation />
    </DashboardLayout>
  );
}
