'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { FaUser, FaChair } from 'react-icons/fa';
import { saveSeatData, getSeatData } from '@/app/utils/seatService';
import { calculateStayTime } from '@/app/utils/calculateStayTime';
import Navbar from '@/app/components/Navbar';
import RotateMessage from '../components/RotateMessage';

const SeatManager = () => {
  const [seats, setSeats] = useState<boolean[]>(Array(12).fill(false));
  const [seatTimers, setSeatTimers] = useState<number[]>(Array(12).fill(0));
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      (!user || !['admin', 'editor'].includes(user?.role || ''))
    ) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // 初期データをFirestoreから取得
    const fetchSeatData = async () => {
      const data = await getSeatData();
      setSeats(data.seats);
      setSeatTimers(data.seatTimers);
    };
    fetchSeatData();
  }, []);

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
    saveSeatData(newSeats, newSeatTimers); // Firestoreに保存
  };

  return (
    <>
      {/* <div className="rotate-message">
        <RotateMessage />
      </div>
      <div className="app-content"> */}
      <div className="bg-background text-primary min-h-screen p-4 font-stylish">
        <Toaster />
        <Navbar />
        <div className="container mx-auto max-w-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-light text-primary">
              TABLE VIEW <br />
              <small>for restaurant Note🍷</small>
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-screen-lg px-4">
              <div className="flex items-center justify-between mt-6 mb-20">
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
                          <FaChair style={{ transform: 'rotate(-90deg)' }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* テーブル */}
                  <div className="bg-neutral shadow-md w-14 h-28 rounded-md mx-1"></div>

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
                          <FaChair style={{ transform: 'rotate(90deg)' }} />
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
                          <FaChair style={{ transform: 'rotate(-90deg)' }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* テーブル */}
                  <div className="bg-neutral shadow-md w-14 h-28 rounded-md mx-1"></div>

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
                          <FaChair style={{ transform: 'rotate(90deg)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* カウンター座席 */}
              <div className="flex justify-between gap-1 mt-6 mb-1">
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

              {/* カウンター */}
              <div className="bg-neutral shadow-md rounded-md w-full h-14 mt-0 mb-2 flex-grow"></div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SeatManager;
