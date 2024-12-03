"use client";
import { useState } from "react";

export default function Modal({heading, content}) {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="btn-add-student cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Add Student
      </button>

      {isModalOpen && (
        <div className="modal-content fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal bg-white rounded-lg shadow-lg p-6 w-1/3">
            <span
              className="close text-gray-500 hover:text-gray-700 cursor-pointer float-right text-xl"
              onClick={toggleModal}
            >
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4">{heading || "Heading"}</h2>
            {/* Additional modal content can go here */}
            {content}
          </div>
        </div>
      )}
    </>
  );
}