// import { NextRequest, NextResponse } from 'next/server';
// import admin from 'firebase-admin';

// // Firebase Admin SDK の初期化
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL('/signin', req.url));
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const userRole = decodedToken.role;

//     if (!['admin', 'editor', 'viewer'].includes(userRole)) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL('/signin', req.url));
//   }
// }

// // middleware を適用するパス
// export const config = {
//   matcher: ['/seat-viewer/:path*', '/seat/:path*', '/settings/:path*'],
// };
