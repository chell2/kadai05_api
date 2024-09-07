'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const SeatManager = () => {
  const [seats, setSeats] = useState<boolean[]>(Array(10).fill(false));
  const [seatTimers, setSeatTimers] = useState<number[]>(Array(10).fill(0)); // 滞在時間

  // 席の状態を切替え
  const toggleSeat = (index: number) => {
    const newSeats = [...seats];
    const newSeatTimers = [...seatTimers];

    if (newSeats[index]) {
      newSeats[index] = false;
      newSeatTimers[index] = 0; // 滞在時間をリセット
    } else {
      newSeats[index] = true;
      newSeatTimers[index] = Date.now(); // 現在時刻を記録
    }

    setSeats(newSeats);
    setSeatTimers(newSeatTimers);
  };

  // 滞在時間を表示
  const calculateStayTime = (startTime: number) => {
    if (startTime === 0) return 'N/A';
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    return `${minutes} min`;
  };

  const handleHelpClick = async () => {
    try {
      // LINE Notify APIにメッセージを送信するリクエスト
      const response = await fetch('/api/line-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'お客さん増えた！誰か助けて〜！' }),
      });

      if (response.ok) {
        toast.success('お手伝いをお願いしたよ！🎉', {
          position: 'top-left',
          duration: 6000,
          style: {
            background: '#668863',
            color: '#edefea',
          },
        });
      } else {
        toast.error('送信エラー！ごめんー😣', {
          position: 'top-left',
          duration: 6000,
          style: {
            background: '#b38a59',
            color: '#edefea',
          },
        });
      }
    } catch (error) {
      toast.error('送信エラー！ごめんー😣', {
        position: 'top-left',
        duration: 6000,
        style: {
          background: '#b38a59',
          color: '#edefea',
        },
      });
    }
  };

  return (
    <div className="bg-background text-primary min-h-screen p-4 font-stylish">
      <Toaster />
      <h1 className="text-3xl font-light mb-6 text-primary">
        TABLE VIEW <small>for restaurant Note🍷</small>
      </h1>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {seats.map((isOccupied, index) => (
          <div
            key={index}
            onClick={() => toggleSeat(index)}
            className={`p-4 text-center border cursor-pointer transition-colors duration-300 ${
              isOccupied
                ? 'bg-accent hover:brightness-90 text-neutral'
                : 'bg-secondary hover:brightness-90 text-black'
            }`}
          >
            {isOccupied
              ? `利用中 (${calculateStayTime(seatTimers[index])})`
              : '空席'}
          </div>
        ))}
      </div>

      <button
        onClick={handleHelpClick}
        className="bg-primary text-neutral p-3 rounded-lg transition-all duration-300 hover:brightness-90"
      >
        Help
      </button>
    </div>
  );
};

export default SeatManager;
