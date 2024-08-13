'use client';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

const ProgressCardSkeleton = ({ className }: { className?: any }) => {
  return (
    <section>
      <Card
        className={cn(
          (className = 'p-[30px] !bg-[#F5F5F599] dark:!bg-[#171717]')
        )}
      >
        <CardHeader className="p-[0px]">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <Progress
            value={0}
            className="!mt-[14px] bg-gray-200 dark:bg-[#000000]"
          />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
        </CardHeader>
        <CardContent className="grid gap-4 p-[0px] h-[400px]">
          <Accordion
            type="single"
            collapsible
            className="w-full m-[0px] p-[0px]"
          >
            <AccordionItem
              value="item-1"
              className="!p-[8px] !mx-0 !my-[12px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
            >
              <div className="flex gap-1 items-center">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex items-center mt-[24px] gap-4">
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="!p-[8px] !mt-[20px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="!p-[8px] !mt-[20px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="!p-[8px] !mt-[20px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <div className="px-[10px] py-[8px] m-[0px] mt-[30px] border !rounded-[4px] bg-[#CCE6FC66] grid grid-cols-12 gap-4 dark:bg-[#CCE6FC]">
          <CardHeader className="p-[0px] col-span-10">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </CardHeader>
          <div className="col-span-2 !flex !justify-end">
            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProgressCardSkeleton;
