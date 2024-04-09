"use client";
import React, { useContext, useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import Image from "next/image";
import { Books, types } from "@/types/types";
import { GlobalContext } from "@/context/Provider";
import { updateBook } from "@/api/api";

function BackgroundGradientDemo({ _id, author, genre, status, title, user, img, published_at }: Books) {
  const [isMenu, setisMenu] = useState(false);
  const context = useContext(GlobalContext);

  const changeStatus = async (type: types) => {
    console.log(type, status);
    context?.initialState[type.toLowerCase()].dispatch({ type: "ADD_ELEMENT", payload: { _id, author, genre, status, title, user, img, published_at } });
    context?.initialState[status.toLowerCase()].dispatch({ type: "REMOVE_ELEMENT", payload: _id });
    const res = await updateBook({ id: _id, status: { status: type } });
    alert(res.message);
  }

  return (
    <div className="flex m-5" >
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 relative">
        <div className="absolute top-2 right-2" >
          <button onClick={() => setisMenu(!isMenu)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className=" inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div id="dropdownDots" className={`${isMenu ? "visible" : "hidden"} z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
              {status === "PLAN" ? "" : <li onClick={() => changeStatus("PLAN")} >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add to Plan</a>
              </li>}
              {status === "COMPLETED" ? "" : <li onClick={() => changeStatus("COMPLETED")} >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add to Completed</a>
              </li>}
              {status === "READING" ? "" : <li onClick={() => changeStatus("READING")} >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add to Reading</a>
              </li>}
            </ul>
          </div>
        </div>
        <Image
          src={`data:image/jpeg;base64,${img.toString("base64")}`}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        <div className="flex items-center" >
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {author}
          </p>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">{genre}</span>
        </div>
        <p>{new Date(published_at).toLocaleDateString()}</p>
        {/* <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button> */}
      </BackgroundGradient>
    </div>
  );
}

export default BackgroundGradientDemo;