import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

// Socket.ioサーバーをセットアップ
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      // クライアントからの座席状態の更新を受信
      socket.on('seat-update', (seatData) => {
        // 全クライアントに座席状態を送信
        io.emit('seat-update', seatData);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
}
