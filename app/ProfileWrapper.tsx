import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import SideDashboard from "../components/sideDashboard";
import AppWrapper from "./AppWrapper";

const ProfileWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <AppWrapper>
      <section className="bg-[#F6F6F6]">
        <div className="container mx-auto grid grid-cols-4 gap-4 px-4 py-8">
          <div className="col-span-1">
            <SideDashboard />
          </div>
          <div className="col-span-3">
            <div className={cn(className)}>{children}</div>
          </div>
        </div>
      </section>
    </AppWrapper>
  );
};

export default ProfileWrapper;
