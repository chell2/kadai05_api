import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Confirmation
        </h2> */}
        <p className="text-black">{message}</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral text-black rounded hover:brightness-90"
          >
            まってー
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-white rounded hover:brightness-90"
          >
            いいよ！
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
