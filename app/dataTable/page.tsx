"use client";

import React, { useState, useMemo } from "react";
import { User, X } from "lucide-react";
import { useNiggas } from "@/hooks/useNiggas";
import { Nigga } from "@/types/niggas";
import NiggaModal from "@/components/NiggaModal";

const MyTablePage: React.FC = () => {
  const { niggas, addNigga } = useNiggas();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Sorting & filtering (same as before)
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Nigga>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedAndFilteredData = useMemo(() => {
    return niggas
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortKey]?.toString().toLowerCase() ?? "";
        const valB = b[sortKey]?.toString().toLowerCase() ?? "";
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [niggas, search, sortKey, sortOrder]);

  const toggleSort = (key: keyof Nigga) => {
    if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };


 
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nigga's Data Table</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-1 border border-gray-200 text-white rounded hover:bg-green-600 transition mb-4 bg-green-500"
        >
          <User className="w-4 h-4" />
          <span>Create New</span>
      </button>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("name")}
              >
                Name {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("email")}
              >
                Email {sortKey === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggleSort("email")}
              >
                Address {sortKey === "address" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.length > 0 ? (
              sortedAndFilteredData.map((niggass) => (
                <tr
                  key={niggass.id}
                  className="border-t transition-colors"
                >
                  <td className="px-4 py-2">{niggass.name}</td>
                  <td className="px-4 py-2">{niggass.email}</td>
                  <td className="px-4 py-2">{niggass.address}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      // onClick={() => handleEdit(niggass)}
                      className="px-3 py-1  text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => handleArchive(niggass)}
                      className="px-3 py-1 text-white rounded hover:bg-red-600 transition"
                    >
                      Archive
                    </button>
                    <button
                      // onClick={() => handleView(niggass)}
                      className="px-3 py-1 text-white rounded hover:bg-green-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-500 italic"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <NiggaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (formData) => {
          await addNigga(formData);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default MyTablePage;
