"use client";

import { Table } from "lucide-react";
import Link from 'next/link'

//Components 
import GooeyNav from '../components/GooeyNav'
import MagicBento from '../components/MagicBento'

import React from "react";

const letters = [
  { char: "C", shadow: "shadow-red-500", word: "Create" },
  { char: "R", shadow: "shadow-blue-500", word: "Read" },
  { char: "U", shadow: "shadow-green-500", word: "Update" },
  { char: "D", shadow: "shadow-yellow-500", word: "Delete" },
  { char: "E", shadow: "shadow-purple-500", word: "Explore" },
  { char: "S", shadow: "shadow-pink-500", word: "Share" },
];


export default function Home() {
    return (
    // <div className="flex justify-center items-center h-full mt-20">
    //   <div className="flex gap-6">
    //     {letters.map((letter, index) => (
    //       <div
    //         key={index}
    //         className={`relative group w-28 h-28 flex justify-center items-center rounded-2xl bg-black text-4xl font-bold shadow-lg ${letter.shadow}
    //           transition-transform duration-300 ease-in-out hover:scale-110`}
    //       >
    //         {letter.char}
    //         {/* Tooltip */}
    //         <span className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //           {letter.word}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <MagicBento 
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="132, 0, 255"
    />




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
