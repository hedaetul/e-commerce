import AppWrapper from "../AppWrapper";
import DashboardCards from "./components/dashboardCards";
import SalesChart from "./components/salseChart";
import SidebarMenu from "./components/sidebarMenu";
import TopCountries from "./components/topCountries";

const VendorAccount = () => {
  return (
    <AppWrapper>
      <div className="flex gap-4 container p-6">
        <div className="w-1/4">
          <SidebarMenu />
        </div>
        <div className="w-3/4">
          <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
          <DashboardCards />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SalesChart /> 
            <TopCountries />
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default VendorAccount;
