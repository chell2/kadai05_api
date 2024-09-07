import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;

  const response = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
    },
    body: new URLSearchParams({
      message,
    }).toString(),
  });

  const responseBody = await response.text();
  if (response.ok) {
    return NextResponse.json({ success: true });
  } else {
    console.error('Error response:', responseBody);
    return NextResponse.json(
      { success: false, message: responseBody },
      { status: 500 }
    );
  }
}
