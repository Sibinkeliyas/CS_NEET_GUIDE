import MainLayout from '@/components/layout/MainLayout';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout
      sidebarVisible={false}
      className="max-w-[750px] m-auto !py-3 md:px-0 px-2"
    >
      <>{children}</>
    </MainLayout>
  );
}
