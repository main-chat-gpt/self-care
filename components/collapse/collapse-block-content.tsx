import Link from "next/link";
import React, { useState } from "react";

const CollapsibleTextContent = ({ headerText, content, user, lesson }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mx-2 my-3 shadow-lg shadow-gray-400 border-1 rounded-lg">
      <button
        className="bg-gray-300 text-gray-800 flex items-center justify-between w-full 
        focus:outline-none rounded-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="rounded-xl p-2 mx-3 my-1 text-base md:pt-2">{headerText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          className={`h-6 w-6 mr-3  text-gray-800 transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isExpanded && (
        <div className="p-4 text-gray-800 bg-white">
          <p className="leading-6 p-2 m-3">{content}</p>
          <Link href={{
                pathname: "/record",
                query: {lessonId: lesson.id, username:user.name, userId: user.id, lessonName: lesson.name},
              }} className="bg-deep-orange-500 hover:bg-deep-orange-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
            Записать урок
          </Link>
        </div>
      )}
    </div>
  );
};
export default CollapsibleTextContent;