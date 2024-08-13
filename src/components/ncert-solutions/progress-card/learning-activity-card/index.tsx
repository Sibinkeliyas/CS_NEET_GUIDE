import RobotIcon from '@/components/icons/RobotIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

interface IActionCardProps {
  className: string;
  icon?: React.ReactNode;
  content: string;
  dataTestId: string;
  shortUrl?: string;
  ariaLabel: string;
  handleActionBtn: (shortUrl: string) => void;
}
const LearningActivityCard: React.FC<IActionCardProps> = ({
  className,
  icon,
  content,
  ariaLabel,
  dataTestId,
  shortUrl,
  handleActionBtn,
}) => {
  const params: any = useParams();
  const { subjectUrl, chapterUrl } = params;

  return (
    <>
      <a
        href={`/ask-your-doubts/${subjectUrl}/${chapterUrl}/${shortUrl}`}
        className={cn(
          `${buttonVariants({
            variant: 'outline',
          })} font-normal text-xs flex justify-center items-center !p-[10px] gap-2`,
          className
        )}
        onClick={() => handleActionBtn(shortUrl || '')}
        aria-label={ariaLabel}
        data-test-id={dataTestId}
      >
        {icon}
        {content}
      </a>
    </>
  );
};
export default LearningActivityCard;
