import React from "react";
import AuthGuard from "@/utils/routeGuard/AuthGuard";
import './ai.css'

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <AuthGuard>
      <div className="m-auto h-full">{children}</div>
    </AuthGuard>
  );
};

export default AuthLayout;
