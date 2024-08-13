'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { memo, useEffect, useMemo, useState } from 'react';
import ChevronDown from '../icons/ChevronDown';
import { INcertSidebarProps } from '@/types/ncert';
import { useParams, usePathname } from 'next/navigation';
import { getSyllabus } from '@/utils/api/ncert-solutions';
import SidebarSkelton from './SidebarSkelton';
import { useDispatch } from '@/store';
import { getSyllabusSuccess } from '@/store/slices/syllabus';
import { AI, SIDEBAR } from '@/types/enums';
import { cn } from '@/lib/utils';
import RobotIcon from '../icons/Robot';
import StudyMaterialIcon from '../icons/StudyMaterialIcon';

const SideBarAccordium = ({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [accordionValue, setAccordionValue] = useState('0');
  const [accordionChapValue, setAccordionChapValue] = useState('0');
  const [syllabus, setSyllabus] = useState<INcertSidebarProps[]>([]);
  const [shortUrls, setShortUrls] = useState<{
    subjectUrl: string;
    chapterUrl: string;
    topicUrl: string;
  }>({ subjectUrl: '', chapterUrl: '', topicUrl: '' });

  const pathname = usePathname();
  const params: any = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getSyllabus();
      if (data?.success && data.data) {
        setSyllabus(data.data);
        dispatch(getSyllabusSuccess(data.data));
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (params?.subjectUrl && params?.chapterUrl && syllabus) {
      const { subjectUrl, chapterUrl, topicUrl } = params;
      const chapterUrlParts = chapterUrl?.split('-');
      const chapterSlug = chapterUrlParts?.slice(2)?.join('-');
      setShortUrls({ subjectUrl, chapterUrl: chapterSlug, topicUrl });
      const subAccordionData = syllabus.find(
        (sub) => sub.shortUrl === subjectUrl
      );
      const chapterAccordionData = subAccordionData?.chapters.find(
        (chp) => chp.shortUrl === chapterSlug
      );
      setAccordionValue(`${subAccordionData?.id}`);
      setAccordionChapValue(
        `${chapterAccordionData?.shortUrl}-${chapterAccordionData?.id}`
      );
    }
  }, [params, syllabus]);

  return (
    <>
      {syllabus.length ? (
        <>
          <div
            className={cn(
              'lg:border-[0.5px] border-b-[0.5px] border-[#10101017] rounded-t-md dark:bg-[#0E0E0E] dark:border-transparent  mb-[16px] ',
              pathname.includes('neet-mentor') && 'bg-[#edf1fb]'
            )}
            data-id="biology-accordium"
          >
            <Link
              href={`/neet-mentor`}
              className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] flex py-[15px]"
              onClick={() => setOpen && setOpen(false)}
            >
              <div className="flex w-full items-center">
                <div className="w-[20px]">
                  <RobotIcon />
                </div>
                <p className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] font-medium">
                  {AI.AI_MENTOR}
                </p>
              </div>
            </Link>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue={`${syllabus[0]?.id}`}
            value={`${accordionValue}`}
          >
            {syllabus.map((sub, index) => {
              return (
                <AccordionItem
                  value={`${sub.id}`}
                  className="lg:border-[1px] rounded-t-md dark:bg-[#0E0E0E] dark:border-transparent  mb-[16px] "
                  data-id="biology-accordium"
                  key={index}
                >
                  <div
                    className={cn(
                      'flex flex-nowrap justify-between items-center text-center  font-medium  px-2 dark:bg-[#0E0E0E]',
                      accordionValue === `${sub.id}`
                        ? `bg-[#262626] text-[#000] dark:text-[#fff] bg-[#D1DDF766]`
                        : ''
                    )}
                  >
                    <AccordionTrigger
                      className="justify-start hover:no-underline w-full"
                      hideIcon
                      onClick={() =>
                        setAccordionValue((prev) =>
                          prev === `${sub.id}` ? '' : `${sub.id}`
                        )
                      }
                    >
                      <div className="flex w-full">
                        <ChevronDown />
                        <p className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px]">
                          {sub.subjectName}
                        </p>
                      </div>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className=" py-0 scrollbar-thin max-h-[65vh] overflow-y-auto bg-[#f5f5f582] dark:bg-[#0E0E0E] ">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue={`${sub.chapters[0].shortUrl}-${sub.chapters[0].id}`}
                      value={`${accordionChapValue}`}
                    >
                      {sub.chapters.map((chp, j) => {
                        return (
                          <AccordionItem
                            value={`${chp.shortUrl}-${chp.id}`}
                            className="border-b-0"
                            key={`${index}-${j}`}
                          >
                            <AccordionTrigger
                              onClick={() => {
                                setAccordionChapValue((prev) =>
                                  prev === `${chp.shortUrl}-${chp.id}`
                                    ? ''
                                    : `${chp.shortUrl}-${chp.id}`
                                );
                              }}
                              className={`flex justify-between dark:text-[#fff] inner-svg border-b-[0.5px] border-[#10101017] data-[state=open]:border-b-[0px]  mb-0 hover:no-underline dark:data-[state=open]:text-[#A6BCF0] dark:data-[state=open]:bg-[#1D1D1D] data-[state=open]:text-[#0B57D0] data-[state=open]:bg-[#fff]  px-2 text-[#101010d1]`}
                            >
                              {/* <div className="shrink-0 me-[3px] hidden">
                                <Tick />
                              </div> */}
                              <p className=" flex items-center  text-left justify-between multi-line-truncate lg:text-[15px] text-[14px]   ">
                                {chp.chapterName}
                              </p>
                            </AccordionTrigger>
                            <AccordionContent className="pl-2 dark:bg-[#1D1D1D] dark:border-[#ffffff1c] py-2 pe-2 bg-[#fff] border-b-[0.5px] border-[#10101017] ">
                              <div className="ps-8">
                                <Link
                                  onClick={() => setOpen && setOpen(false)}
                                  href={`/revision-notes/${sub.shortUrl}/${chp.Classes.shortUrl}-${chp.shortUrl}`}
                                  className="no-underline text-[#101010] flex justify-between item-center py-2"
                                  key={`${index}-${j}-revision`}
                                >
                                  <StudyMaterialIcon className="w-[14px] mr-2 ml-[3px]" />
                                  <p className="mb-0 dark:text-[#ffffffcb] dark:hover:!text-[#fff] max-w-80	text-left  multi-line-truncate lg:text-[14px] text-[12px]">
                                    {chp.chapterName} {SIDEBAR.REVISION_NOTES}
                                  </p>
                                  <ChevronRightIcon className="shrink-0 ml-auto dark:text-[#fff]" />
                                </Link>

                                <Link
                                  onClick={() => setOpen && setOpen(false)}
                                  href={`/ask-your-doubts/${sub.shortUrl}/${chp.Classes.shortUrl}-${chp.shortUrl}`}
                                  className="no-underline text-[#101010] flex justify-between item-center py-2"
                                  key={`${index}-${j}-revision`}
                                >
                                  <RobotIcon className="w-[20px] mr-[3px]" />
                                  <p className="mb-0 dark:text-[#ffffffcb] dark:hover:!text-[#fff] max-w-80	text-left  multi-line-truncate lg:text-[14px] text-[12px]">
                                    {SIDEBAR.START_AI_POWERED_LESSON}
                                  </p>
                                  <ChevronRightIcon className="shrink-0 ml-auto dark:text-[#fff]" />
                                </Link>

                                {chp.topics.map((topic, k) => {
                                  return (
                                    <Link
                                      onClick={() => setOpen && setOpen(false)}
                                      href={`/ncert-solutions/${sub.shortUrl}/${chp.Classes.shortUrl}-${chp.shortUrl}/${topic.shortUrl}`}
                                      className="no-underline text-[#101010] flex justify-between item-center py-2"
                                      key={`${index}-${j}-${k}`}
                                    >
                                      <p className="mb-0 dark:text-[#ffffffcb] dark:hover:!text-[#fff] max-w-80	text-left  multi-line-truncate lg:text-[14px] text-[12px]">
                                        {`${j + 1}.${k + 1} ${topic.topicName}`}
                                      </p>
                                      <ChevronRightIcon className="shrink-0 ml-auto dark:text-[#fff]" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      ) : (
        <SidebarSkelton />
      )}
    </>
  );
};

export default memo(SideBarAccordium);
