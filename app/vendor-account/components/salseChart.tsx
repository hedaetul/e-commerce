import Chart from "@/dist/images/charts.png";
import Image from "next/image";

const SalesChart = () => {
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Sales</h3>
      <div className="flex-col-center h-64  p-4">
        <Image src={Chart} alt="Charts" className="h-full" />
        <p>Chart Placeholder</p>
      </div>
    </div>
  );
};

export default SalesChart;
