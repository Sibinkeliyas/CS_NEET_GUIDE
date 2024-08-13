import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ChevronDown from "../icons/ChevronDown";
import { Skeleton } from "../ui/skeleton";

const SidebarSkelton = () => {
  return (
    <Accordion type="single" collapsible defaultValue={`item-1`}>
      <AccordionItem
        value={`item-1`}
        className="border-[1px] rounded-t-md dark:bg-[#0E0E0E] mb-2 "
        data-id="biology-accordium"
      >
        <AccordionTrigger
          className={`text-center justify-start accordionTriggerPanel hover:no-underline data-[state=open]:bg-[#D1DDF766] dark:data-[state=open]:bg-[#262626] data-[state=open]:text-[#000] dark:data-[state=open]:text-[#fff] px-2`}
        >
          <ChevronDown />
          <Skeleton className="h-4 w-full rounded-sm ml-[12px]" />
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 ">
          <div className="py-1 flex justify-between items-center">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10/12 rounded-full" />
          </div>
          <div className="py-1 flex justify-between items-center">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10/12 rounded-full" />
          </div>
          <div className="py-1 flex justify-between items-center">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10/12 rounded-full" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarSkelton;
