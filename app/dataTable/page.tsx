"use client";

import React, { useState, useMemo } from "react";
import { User } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin" },
  { id: 5, name: "Robert White", email: "robert@example.com", role: "User" },
];

const MyTablePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleEdit = (user: User) => {
    console.log("Edit:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete:", user);
  };

  const sortedAndFilteredData = useMemo(() => {
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortKey].toString().toLowerCase();
        const valB = b[sortKey].toString().toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [search, sortKey, sortOrder]);

  const toggleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Data Table</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

    <button className="flex items-center gap-2 px-3 py-1 border border-gray-200 text-white rounded hover:bg-green-600 transition mb-4">
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
                onClick={() => toggleSort("role")}
              >
                Role {sortKey === "role" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.length > 0 ? (
              sortedAndFilteredData.map((user) => (
                <tr
                  key={user.id}
                  className="border-t transition-colors"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1  text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="px-3 py-1 text-white rounded hover:bg-red-600 transition"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
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
    </div>
  );
};

export default MyTablePage;
