import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('userAuth');

  if (!token) {
    return NextResponse.redirect(new URL('/start', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
