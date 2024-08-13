"use client";
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { FOCUS_SIDEBAR_ROUTES } from "@/types/enums";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { openSidebar } from "@/store/slices/menu";
import { useDispatch, useSelector } from "@/store";

interface MainLayoutProps {
  children: React.ReactElement;
  sidebarVisible?: boolean;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebarVisible = true,
  className,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { openDrawer } = useSelector((state) => state.menuReducer);
  const [focus, setFocus] = useState(true);

  const handleFocus = () => {
    dispatch(openSidebar(!openDrawer));
    setFocus(!focus);
  };

  return (
    <>
      <Header className={className}  />
      <div className={cn("flex h-screen overflow-hidden")}>
        {sidebarVisible && (
          <div
            className={cn(
              "transition-all duration-500 lg:block hidden",
              focus
                ? "max-w-[384px] w-full opacity-100 overflow-x-hidden"
                : "w-0 max-w-[0px] opacity-0 overflow-hidden"
            )}
          >
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-auto pb-4 lg:px-0 pt-[60px] relative">
          {children}
          {FOCUS_SIDEBAR_ROUTES.includes(pathname.split("/")[1]) && (
            <button
              aria-label="deskstop menubar open"
              aria-haspopup="false"
              aria-expanded="false"
              title="Focus Mode"
              onClick={handleFocus}
              className={cn(
                "bg-none border-none  cursor-pointer me-2 lg:block hidden [transition:0.3s] absolute p-2 top-[82px] bg-[#F5F5F5] dark:bg-[#171717cc]  left-[10px] rounded-[100px] w-max",
                !focus && " rotate-180 "
              )}
            >
              <ChevronLeftIcon />
            </button>
          )}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
