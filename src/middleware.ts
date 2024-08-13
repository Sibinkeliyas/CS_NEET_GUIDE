import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return res;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
