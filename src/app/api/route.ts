// app/api/auth/check/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('user_data'); // replace 'name' with your cookie name


  
  return NextResponse.json({
    isAuthenticated: !!authCookie,
    user: authCookie?.value || null
  });
}