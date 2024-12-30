import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const referrer = req.headers.get('referer');
  const url = new URL(req.url);
  const status = url.searchParams.get('status');

  if (!referrer || !referrer.includes('/payment/success')) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  return NextResponse.json({ status });
}