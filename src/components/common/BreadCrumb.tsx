import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  title: string;
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items, title }: BreadCrumbPropsType) {
  return (
    <Breadcrumb className="flex overflow-x-auto pb-[4px] lg:pb-[0px] mb-[10px] lg:mb-[20px] lg:mt-0 mt-[10px] ">
      <BreadcrumbList className="flex flex-nowrap  ">
        <BreadcrumbItem className="flex-shrink-0">
          <BreadcrumbLink
            className="whitespace-nowrap lg:text-[14px] text-[12px]"
            href="/"
          >
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items?.map((item: BreadCrumbType, index: number) => (
          <React.Fragment key={item.title}>
            <BreadcrumbSeparator className="flex-shrink-0" />
            <BreadcrumbItem className="flex-shrink-0 ">
              <BreadcrumbLink
                href={item.link}
                className={cn(
                  'font-medium capitalize whitespace-nowrap lg:text-[14px] text-[12px]',
                  index === items.length - 1
                    ? 'pointer-events-none text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
