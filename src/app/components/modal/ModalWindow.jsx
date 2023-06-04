import React from 'react'
import Portal from './Portal';

function ModalWindow({ onClick, text }) {
  return (
    <Portal>
    <div className=" fixed inset-0 flex items-center justify-center z-60">
      <div className="bg-gray-700 px-6 py-4 rounded shadow-lg">
        <h3 className="text-lg  text-white font-bold mb-2">{text}</h3>
        <button onClick={onClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-auto block">
          Close
        </button>
      </div>
    </div>
    </Portal>
  );
}

export default ModalWindow