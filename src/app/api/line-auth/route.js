export async function GET(req) {
  const redirectUri = process.env.LINE_NOTIFY_REDIRECT_URI;
  const clientId = process.env.LINE_NOTIFY_CLIENT_ID;
  const state = 'your-custom-state'; // CSRF対策のためにランダム生成

  const lineAuthUrl = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=notify&state=${state}`;

  return Response.redirect(lineAuthUrl);
}
