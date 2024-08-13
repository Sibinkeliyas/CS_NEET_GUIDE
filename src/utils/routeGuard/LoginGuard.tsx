'use client';
import { useSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname()
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isAuthenticated) router.back();
  }, [isAuthenticated, router, pathname]);

  return children;
};

export default LoginGuard;
