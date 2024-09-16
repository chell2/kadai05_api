import { FaMobileAlt, FaSyncAlt } from 'react-icons/fa';

const RotateMessage = () => {
  return (
    <div className="rotate-message flex flex-col items-center justify-center">
      <FaMobileAlt size={50} className="mb-2 text-primary" />

      <div className="flex items-center space-x-2 text-xl text-primary">
        <span>横向きの画面で</span>
        <FaSyncAlt className="animate-spin text-secondary" />
        <span>ご利用ください</span>
      </div>
    </div>
  );
};

export default RotateMessage;
