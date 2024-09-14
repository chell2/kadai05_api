import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

// Firestoreに座席データを保存
const saveSeatData = async (seats: boolean[], seatTimers: number[]) => {
  try {
    const docRef = doc(db, 'seats', 'currentStatus');
    await setDoc(docRef, {
      seats,
      seatTimers,
    });
  } catch (error) {
    console.error('Error saving seat data:', error);
  }
};

// Firestoreから座席データを取得
const getSeatData = async () => {
  try {
    const docRef = doc(db, 'seats', 'currentStatus');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching seat data:', error);
  }

  return { seats: Array(12).fill(false), seatTimers: Array(12).fill(0) }; // 初期データ
};

export { saveSeatData, getSeatData };
