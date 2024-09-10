import axios from 'axios';

export async function POST(req) {
  const accessToken = req.session?.token;

  if (!accessToken) {
    return new Response('User not authenticated', { status: 401 });
  }

  try {
    await axios.post('https://notify-api.line.me/api/revoke', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // セッションやデータベースからトークンを削除
    req.session.token = null;

    return new Response('Notification cancelled', { status: 200 });
  } catch (error) {
    console.error('Error cancelling notification', error);
    return new Response('Error cancelling notification', { status: 500 });
  }
}
