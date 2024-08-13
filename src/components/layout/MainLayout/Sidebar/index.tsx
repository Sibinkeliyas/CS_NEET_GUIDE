import React from 'react';
import { cn } from '@/lib/utils';
import { DashboardNav } from './Dashboard';

type SidebarProps = {
  className?: string;
};
export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        `relative hidden h-screen overflow-y-auto flex-none border-r pt-20 lg:block scrollbar-thin max-h-[98vh]`,
        className
      )}
    >
      <div className="space-y-4  pt-0 pb-4">
        <div className="px-3  pt-0 pb-2">
          <div className="mt-0 space-y-1">
            <DashboardNav />
          </div>
        </div>
      </div>
    </aside>
  );
}
