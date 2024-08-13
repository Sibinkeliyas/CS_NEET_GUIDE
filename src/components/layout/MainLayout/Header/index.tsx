import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import neetLogo from '@/../public/images/Neet Guid Logo.png';
import neetDarkLogo from '@/../public/images/neetGuideDarkLogo.png';
import { UserNav } from './MenuItems';
import { MobileSidebar } from '../Sidebar/MobileSidebar';
interface HeaderProps {
  className?: string;
  sidebarVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-30 border-b bg-background/95 backdrop-blur px-4',
        className
      )}
    >
      <nav
        className="flex h-14 items-center justify-between"
        aria-label="Neet guide navbar"
      >
        <div className="flex ">
          <div className={cn('block lg:!hidden me-2')}>
            <MobileSidebar />
          </div>

          <div className=" lg:block">
            <Link href={'/'}>
              <Image
                src={neetLogo}
                width={80}
                height={80}
                alt="logo"
                className="dark:hidden"
              />
              <Image
                src={neetDarkLogo}
                width={80}
                height={80}
                alt="logo"
                className="hidden dark:block"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};
export default Header;
