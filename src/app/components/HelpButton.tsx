import { toast } from 'react-hot-toast';

// exportでhandleHelpClick関数も外部から呼び出せる
export const handleHelpClick = async () => {
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
        position: 'top-center',
        duration: 6000,
        style: {
          background: '#fff',
          color: '#7B3F61',
        },
      });
    } else {
      toast.error('送信エラー！ごめんー😣', {
        position: 'top-center',
        duration: 6000,
        style: {
          background: '#fff',
          color: '#7B3F61',
        },
      });
    }
  } catch (error) {
    toast.error('送信エラー！ごめんー😣', {
      position: 'top-center',
      duration: 6000,
      style: {
        background: '#fff',
        color: '#7B3F61',
      },
    });
  }
};

const HelpButton = () => {
  return (
    <button
      onClick={handleHelpClick}
      className="bg-[#7B3F61] text-fff px-4 py-3 mr-2 rounded-lg transition-all duration-300 hover:brightness-90"
    >
      Help!!!
    </button>
  );
};

export default HelpButton;