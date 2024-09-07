import AppWrapper from "@/app/AppWrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import SidebarMenu from "./sidebarMenu";

const VendorWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <AppWrapper>
      <div className="container flex gap-4 p-6">
        <div className="w-1/4">
          <SidebarMenu />
        </div>
        <div className="w-3/4">
          <div className={cn(className)}>{children}</div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default VendorWrapper;
