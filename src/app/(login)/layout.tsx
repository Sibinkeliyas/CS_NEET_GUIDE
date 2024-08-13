import LoginGuard from "@/utils/routeGuard/LoginGuard";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginGuard>
      <>{children}</>
    </LoginGuard>
  );
}
