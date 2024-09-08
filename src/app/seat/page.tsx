'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaUser, FaChair } from 'react-icons/fa';

const SeatManager = () => {
  const [seats, setSeats] = useState<boolean[]>(Array(12).fill(false)); // 椅子の数を12に拡張
  const [seatTimers, setSeatTimers] = useState<number[]>(Array(12).fill(0)); // 滞在時間

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
    const minutes = Math.floor((elapsed / 60000) % 60);
    const hours = Math.floor(elapsed / 3600000);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleHelpClick = async () => {
    try {
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
      <div className="container mx-auto max-w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-light text-primary">
            TABLE VIEW <br />
            <small>for restaurant Note🍷</small>
          </h1>
          <button
            onClick={handleHelpClick}
            className="bg-primary text-neutral p-3 rounded-lg transition-all duration-300 hover:brightness-90"
          >
            Help
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg px-4">
            {/* カウンター */}
            <div className="bg-neutral shadow-md rounded-md w-full h-10 mt-4 mb-2 flex-grow"></div>
            {/* カウンター座席 */}
            <div className="grid grid-cols-8 gap-1 mb-6">
              {seats.slice(0, 8).map((isOccupied, index) => (
                <div
                  key={index}
                  onClick={() => toggleSeat(index)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    isOccupied
                      ? 'bg-accent shadow-md hover:brightness-90 text-neutral'
                      : 'bg-secondary shadow-md hover:brightness-90 text-black'
                  }`}
                >
                  {isOccupied ? (
                    <div className="flex flex-col items-center">
                      <FaUser />
                      <span className="text-xs">
                        {`${calculateStayTime(seatTimers[index])}`}
                      </span>
                    </div>
                  ) : (
                    <FaChair />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-10">
              {/* テーブル1 */}
              <div className="flex items-center">
                {/* テーブル座席左 */}
                <div className="flex flex-col space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => toggleSeat(8 + i)}
                      className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                        seats[8 + i]
                          ? 'bg-accent shadow-md hover:brightness-90 text-neutral'
                          : 'bg-secondary shadow-md hover:brightness-90 text-black'
                      }`}
                    >
                      {seats[8 + i] ? (
                        <div className="flex flex-col items-center">
                          <FaUser />
                          <span className="text-xs">
                            {`${calculateStayTime(seatTimers[8 + i])}`}
                          </span>
                        </div>
                      ) : (
                        <FaChair />
                      )}
                    </div>
                  ))}
                </div>

                {/* テーブル */}
                <div className="bg-neutral shadow-md w-14 h-32 rounded-md mx-4"></div>

                {/* テーブル座席右 */}
                <div className="flex flex-col space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => toggleSeat(10 + i)}
                      className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                        seats[10 + i]
                          ? 'bg-accent shadow-md hover:brightness-90 text-neutral'
                          : 'bg-secondary shadow-md hover:brightness-90 text-black'
                      }`}
                    >
                      {seats[10 + i] ? (
                        <div className="flex flex-col items-center">
                          <FaUser />
                          <span className="text-xs">
                            {`${calculateStayTime(seatTimers[10 + i])}`}
                          </span>
                        </div>
                      ) : (
                        <FaChair />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* テーブル2 */}
              <div className="flex items-center">
                {/* テーブル座席左 */}
                <div className="flex flex-col space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => toggleSeat(12 + i)}
                      className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                        seats[12 + i]
                          ? 'bg-accent shadow-md hover:brightness-90 text-neutral'
                          : 'bg-secondary shadow-md hover:brightness-90 text-black'
                      }`}
                    >
                      {seats[12 + i] ? (
                        <div className="flex flex-col items-center">
                          <FaUser />
                          <span className="text-xs">
                            {`${calculateStayTime(seatTimers[12 + i])}`}
                          </span>
                        </div>
                      ) : (
                        <FaChair />
                      )}
                    </div>
                  ))}
                </div>

                {/* テーブル */}
                <div className="bg-neutral shadow-md w-14 h-32 rounded-md mx-4"></div>

                {/* テーブル座席右 */}
                <div className="flex flex-col space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => toggleSeat(14 + i)}
                      className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                        seats[14 + i]
                          ? 'bg-accent shadow-md hover:brightness-90 text-neutral'
                          : 'bg-secondary shadow-md hover:brightness-90 text-black'
                      }`}
                    >
                      {seats[14 + i] ? (
                        <div className="flex flex-col items-center">
                          <FaUser />
                          <span className="text-xs">
                            {`${calculateStayTime(seatTimers[14 + i])}`}
                          </span>
                        </div>
                      ) : (
                        <FaChair />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatManager;
