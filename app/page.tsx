"use client";

import { Table } from "lucide-react";
import Link from 'next/link'

//Components 
import GooeyNav from '../components/GooeyNav'



export default function Home() {
    

  return (

    <div className="flex items-center justify-center h-full">
      <h1 className="text-3xl font-bold">Main page</h1>
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
