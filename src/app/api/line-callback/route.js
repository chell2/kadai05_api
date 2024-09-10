import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  try {
    const response = await axios.post(
      'https://notify-bot.line.me/oauth/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.LINE_NOTIFY_REDIRECT_URI,
          client_id: process.env.LINE_NOTIFY_CLIENT_ID,
          client_secret: process.env.LINE_NOTIFY_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = response.data;

    // アクセストークンをセッションやデータベースに保存
    // req.session.token = access_token;

    return Response.redirect('/');
  } catch (error) {
    console.error('Error getting access token', error);
    return new Response('Error getting access token', { status: 500 });
  }
}
