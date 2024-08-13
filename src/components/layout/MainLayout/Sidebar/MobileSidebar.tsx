'use client';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { DashboardNav } from './Dashboard';
import HamburgerIcon from '@/components/icons/Hamburger';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarVisible?: boolean;
}

export function MobileSidebar({
  className,
  sidebarVisible = true,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {sidebarVisible && (
          <SheetTrigger asChild>
            <button
              aria-label="Mobile menubar open"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
              title="Focus Mode"
              className="bg-none border-none p-0 cursor-pointer"
            >
              <HamburgerIcon />
            </button>
          </SheetTrigger>
        )}

        <SheetContent
          side="left"
          className="!px-0 dark:bg-[background] md:w-96 w-full"
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              {/* <SheetTitle className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {HOMEPAGE.OVER_VIEW}
              </SheetTitle> */}
              <div
                className="space-y-1 overflow-y-auto max-h-[83vh] scrollbar-thin"
                tabIndex={0}
              >
                <DashboardNav setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
