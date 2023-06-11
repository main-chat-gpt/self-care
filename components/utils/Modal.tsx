import React, { useState } from "react";
import { Lesson, User } from "../../interfaces";

type Props = {
  user: User;
  lessons: Lesson[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ user, lessons, setIsLoading }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [newLesson, setNewLesson] = useState("Урок " + (lessons.length + 1));

  const [postData, setPostData] = useState({
    text: "",
    name: "Урок по парковкам " + (lessons.length + 1),
    userId: user.id,
  });

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://shparuta-cache.onrender.com/api/lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        console.log("Post request successful!");
        setShowModal(false);
        setIsLoading(true);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Новый урок
      </button>
      {showModal ? (
        <>
          <div className="bg-black/60 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between  p-4 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">
                    Создание нового урока
                  </h3>
                  <button
                    className="ml-6 bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-7 w-7 text-xl block bg-gray-400 py-0">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Название нового урока
                    </label>
                    <input
                      value={postData.name}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Закрыть
                  </button>
                  <button
                    className="text-white bg-blue-gray-600 active:bg-blue-gray-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default Modal;
