import Header from '@/components/layout/MainLayout/Header';
import AuthGuard from '@/utils/routeGuard/AuthGuard';
import React, { ReactNode } from 'react';

const MinimalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <Header />
      {children}
    </AuthGuard>
  );
};

export default MinimalLayout;
