"use client";

import { Table } from "lucide-react";
import Link from 'next/link'

//Components 
import GooeyNav from '../components/GooeyNav'


import React from "react";

const letters = [
  { char: "C", shadow: "shadow-red-500" },
  { char: "R", shadow: "shadow-blue-500" },
  { char: "U", shadow: "shadow-green-500" },
  { char: "D", shadow: "shadow-yellow-500" },
  { char: "E", shadow: "shadow-purple-500" },
  { char: "S", shadow: "shadow-pink-500" },
];


export default function Home() {
  return (

    <div className="flex justify-center items-center h-full mt-20">
      <div className="flex gap-6">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`w-28 h-28 flex justify-center items-center rounded-2xl bg-black text-4xl font-bold shadow-lg ${letter.shadow} ${letter.hover} 
              transition-transform duration-300 ease-in-out hover:scale-110`}
          >
            {letter.char}
          </div>
        ))}
      </div>
    </div>




    // applicable of button is used and want to go to toher pages
    // <div className="w-full h-full p-4 flex items-center gap-2 px-3">
    //   <Link href="/dataTable">
    //     <button className="flex items-center gap-2 px-3 py-1 border border-gray-200 text-white rounded hover:bg-green-600 transition mb-4">
    //       <Table className="w-4 h-4" />
    //       <span>DataTable</span>
    //     </button>
    //   </Link>
    // </div>
  );
}
