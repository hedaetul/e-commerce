import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  error?: string; // Add optional error prop
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, error }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-md shadow-lg relative w-96'>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        {error && <p className='text-red-500 mb-4'>{error}</p>} {/* Display error message */}
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
