"use client";

import React, { useState, useMemo } from "react";
import { User } from "lucide-react";
import { useNiggas } from "@/hooks/useNiggas";
import { Nigga } from "@/types/niggas";
import NiggaModal from "@/components/NiggaModal";
import Swal from "sweetalert2";

//sweet alert for duplicate adding of niggas
const createUser = async (newUser: { name: string; email: string; address: string }) => {
  try {
    const res = await fetch("/api/niggas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (res.status === 409) {
      const data = await res.json();
      Swal.fire({
        icon: "warning",
        title: "Duplicate User",
        text: data.error,
      });
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "User Created",
      text: `${data.name} has been added successfully. REFRESH THE PAGE TO SEE`,
    });
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
};






const MyTablePage: React.FC = () => {
  const { niggas } = useNiggas();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Nigga>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");



  // 👉 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // Sorting & filtering
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




  // 👉 Slice rows based on page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedAndFilteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sortedAndFilteredData.length / rowsPerPage);

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
        placeholder="Search by name, email, or address..."
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
                onClick={() => toggleSort("address")}
              >
                Address {sortKey === "address" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((niggass) => (
                <tr key={niggass.id} className="border-t transition-colors">
                  <td className="px-4 py-2">{niggass.name}</td>
                  <td className="px-4 py-2">{niggass.email}</td>
                  <td className="px-4 py-2">{niggass.address}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button className="px-3 py-1 text-white rounded hover:bg-blue-600 transition bg-blue-500">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white rounded hover:bg-red-600 transition bg-red-500">
                      Archive
                    </button>
                    <button className="px-3 py-1 text-white rounded hover:bg-green-600 transition bg-green-500">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500 italic">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black"
        >
          Next
        </button>
      </div>

      <NiggaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (formData) => {
          await createUser(formData);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default MyTablePage;
