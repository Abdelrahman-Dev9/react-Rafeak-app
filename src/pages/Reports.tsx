import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ResearchersUsers from "@/components/reports/ResearchersUsers";
import VolunteersUsers from "@/components/reports/VolunteersUsers";

const Reports = () => {
  return (
    <DashboardLayout>
      <VolunteersUsers />
      <ResearchersUsers />
    </DashboardLayout>
  );
};

export default Reports;
