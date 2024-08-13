// app/(home)/page.js

import HomeComponent from '@/components/home';
import { BASE_URL } from '@/config';
import { ISubjectDetailsProps } from '@/types';
import { Api_endpoint } from '@/types/enums';
import { getIntroductionData } from '../api/neet/book-introduction/query';
import { Metadata } from 'next';

export type HomeIntroductionProps = {
  success: boolean;
  data?: ISubjectDetailsProps[];
  message: string;
};

export const metadata: Metadata = {
  title: 'Comprehensive NEET Guidebook: Ace Your Medical Entrance Exam',
  description:
    'Discover everything you need to succeed in the NEET exam with our comprehensive guidebook. Expert tips, practice tests, and strategies to excel in your medical entrance journey.',
  keywords:
    'NEET preparation,Medical entrance exam guide,NEET study tips,NEET practice tests,NEET exam strategies,NEET syllabus,NEET books,Medical entrance preparation, NEET study materials, NEET online resources',
};

async function fetchBookDetails(): Promise<HomeIntroductionProps | undefined> {
  try {
    const response = await getIntroductionData();
    return { success: true, data: response, message: '' };
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
}

export default async function Page() {
  const data = await fetchBookDetails();

  return (
    <>
      <section className="py-[30px] md:py-[60px] max-w-[750px] mx-auto">
        {data?.data && <HomeComponent data={data.data} />}
      </section>
    </>
  );
}
