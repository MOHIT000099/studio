import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// Middleware is not currently used but this file is kept to avoid breaking builds.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}
 
export const config = {
  matcher: [],
};
