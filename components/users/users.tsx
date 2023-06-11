import Link from "next/link";
import CollapsibleText from "../collapse/collapse-block";
import { Lesson } from "../../interfaces";
import React, { useEffect, useState } from "react";

export default function Users() {

  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://shparuta-cache.onrender.com/api/user/all");
      if (response.ok) {
        const jsonData = await response.json();
        setUsersList(jsonData);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateUserList = () => {
    setIsLoading(true);
  };

  return (
    <div className="md:w-1/3">
      <h1 className="text-3xl font-bold mb-2">Список пользователей</h1>
      <div>
        {usersList.map((item) => (
          <div
            key={item.id}
            className="hover:bg-gray-100 bg-white p-2 m-2 border-b-4 border-gray-200"
          >
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full mr-10"
                src={item.imageUrl}
                alt="User Avatar"
              />
              <div>
                <h2 className="pl-4 ml-3 text-lg font-medium">{item.name}</h2>
              </div>
            </div>
            <div className="mt-4 mx-3 px-3 w-fit border-x-2 border-deep-orange-600 rounded-lg">
              <p className="text-gray-700">Телефон: {item.phone}</p>
              <p className="text-gray-700">
                Количество уроков: {item.lessonCount}
              </p>
              <p className="text-gray-700">Город: {item.location}</p>
            </div>
            <div className="px-2 mb-8 pb-4 pt-3">
              <CollapsibleText lessons={item.lessons} user={item} setIsLoading={setIsLoading} />
            </div>
            <Link
              href={{
                pathname: "/record",
                query: item,
              }}
            ></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
