import { FaTachometerAlt } from "react-icons/fa";
import VendorWrapper from "./components/VendorWrapper";
import DashboardCards from "./components/dashboardCards";
import SalesChart from "./components/salseChart";
import TopCountries from "./components/topCountries";

const page = () => {
  return (
    <VendorWrapper>
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <FaTachometerAlt className="inline text-rose-500" />
        Dashboard
      </h1>
      <DashboardCards />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SalesChart />
        <TopCountries />
      </div>
    </VendorWrapper>
  );
};

export default page;
