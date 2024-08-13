import { Accordion, AccordionItem } from '@/components/ui/accordion'
import React from 'react'

const MobileProgressSkeleton = () => {
  return (
    <div className="md:hidden">
            <Accordion
              type="single"
              collapsible
              className="!bg-[#F5F5F599] rounded-none dark:!bg-[#171717] dark:!border-[#FFFFFF33]"
            >
              <AccordionItem
                value="item-4"
                className="!p-[20px] border bg-[#FFFFFF] rounded dark:bg-[#000000]"
              >
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              </AccordionItem>
            </Accordion>
          </div>
  )
}

export default MobileProgressSkeleton