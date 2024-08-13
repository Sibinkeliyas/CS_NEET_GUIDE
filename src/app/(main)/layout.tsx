import MainLayout from "@/components/layout/MainLayout";
import "./ncert.css";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <>{children}</>
    </MainLayout>
  );
}
