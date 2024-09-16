'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { FaUser, FaChair } from 'react-icons/fa';
import ViewerSignOutButton from '@/app/components/ViewerSignOutButton';
import { calculateStayTime } from '@/app/utils/calculateStayTime';
import RotateMessage from '../components/RotateMessage';

const SeatViewer = () => {
  const [seats, setSeats] = useState<boolean[]>(Array(12).fill(false));
  const [seatTimers, setSeatTimers] = useState<number[]>(Array(12).fill(0));
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      (!user || !['admin', 'editor', 'viewer'].includes(user?.role || ''))
    ) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const seatDocRef = doc(db, 'seats', 'currentStatus');

    // Firestoreから座席データをリアルタイムで取得
    const unsubscribe = onSnapshot(seatDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setSeats(data?.seats || Array(12).fill(false));
        setSeatTimers(data?.seatTimers || Array(12).fill(0));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <div className="rotate-message">
        <RotateMessage />
      </div>
      <div className="app-content"> */}
      <div className="bg-background text-primary min-h-screen p-4 font-stylish">
        <div className="container mx-auto max-w-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-light text-primary">
              TABLE VIEW <br />
              <small>for restaurant Note🍷</small>
            </h1>
            <ViewerSignOutButton />
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
                        className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center transition-colors duration-300 ${
                          seats[8 + i]
                            ? 'bg-accent shadow-md text-neutral'
                            : 'bg-secondary shadow-md text-black'
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
                        className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center transition-colors duration-300 ${
                          seats[10 + i]
                            ? 'bg-accent shadow-md text-neutral'
                            : 'bg-secondary shadow-md text-black'
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
                        className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center transition-colors duration-300 ${
                          seats[12 + i]
                            ? 'bg-accent shadow-md text-neutral'
                            : 'bg-secondary shadow-md text-black'
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
                        className={`w-10 h-10 mb-2 shadow-md rounded-full border flex items-center justify-center transition-colors duration-300 ${
                          seats[14 + i]
                            ? 'bg-accent shadow-md text-neutral'
                            : 'bg-secondary shadow-md text-black'
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
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                      isOccupied
                        ? 'bg-accent shadow-md text-neutral'
                        : 'bg-secondary shadow-md text-black'
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

export default SeatViewer;
