import SidebarSkelton from "@/components/sidebar-accordion/SidebarSkelton";
import dynamic from "next/dynamic";
const SideBarAccordion = dynamic(() => import("@/components/sidebar-accordion"),{ loading: () => <SidebarSkelton /> }
);
export function DashboardNav({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) {
  return <SideBarAccordion setOpen={setOpen} />;
}
