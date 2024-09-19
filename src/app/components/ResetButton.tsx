import { FaRedoAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

type ResetButtonProps = {
  onReset: () => void;
};

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const handleReset = () => {
    const confirmReset = window.confirm('リセットしますか？');
    if (confirmReset) {
      onReset();
      toast.success('お疲れさまでした！全席リセット〜🈳');
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-primary text-fff px-4 py-3 mr-4 rounded-lg transition-all duration-300 hover:brightness-90 flex items-center space-x-1"
    >
      <small>
        <FaRedoAlt />
      </small>
      <span>Reset</span>
    </button>
  );
};

export default ResetButton;
