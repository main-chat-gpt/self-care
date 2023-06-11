import React, { useState } from "react";
import CollapsibleTextContent from "./collapse-block-content";
import { Lesson, User } from "../../interfaces";
import Modal from "../utils/Modal";

type Props = {
  lessons: Lesson[];
  user: User
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const CollapsibleText = ({ lessons, user, setIsLoading }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pb-1">
      <button
        className="bg-brown-300 text-white flex items-center justify-between w-full 
        focus:outline-none rounded-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="rounded-xl p-2 mx-3 my-1 text-base md:pt-2">
          Список уроков
        </span>
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
      {isExpanded &&
        lessons.map((service) => (
          <CollapsibleTextContent
            headerText={service.name}
            content={service.text}
            user={user}
            lesson={service}
          />
        ))}

      {isExpanded && (
        <div>
          <Modal user={user} lessons={lessons} setIsLoading={setIsLoading}/>
        </div>
      )}
    </div>
  );
};
export default CollapsibleText;
