import React, { useState, useEffect } from "react";
import MemberCard from "../DashboardComponents/MemberCard";
import members from "../../../public/members.json";

export default function DashboardMembers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(9);

  // 🧠 Dynamically adjust members per page based on screen width
  useEffect(() => {
    const updateMembersPerPage = () => {
      if (window.innerWidth < 768) {
        setMembersPerPage(3); // Small screen
      } else {
        setMembersPerPage(9); // Large screen
      }
    };
    updateMembersPerPage();
    window.addEventListener("resize", updateMembersPerPage);
    return () => window.removeEventListener("resize", updateMembersPerPage);
  }, []);

  // 🧮 Pagination Logic
  const totalPages = Math.ceil(members.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = members.slice(startIndex, startIndex + membersPerPage);

  // 🔄 Handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Gym Members</h2>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-6">
        {currentMembers.map((member) => (
          <MemberCard
            key={member.member_id}
            first_name={member.first_name}
            last_name={member.last_name}
            membership_type={member.membership_type}
            membership_status={member.membership_status}
            join_date={member.join_date}
            expiry_date={member.expiry_date}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border-2 ${
            currentPage === 1
              ? "border-gray-500 text-gray-500 cursor-not-allowed"
              : "border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white transition"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border-2 ${
            currentPage === totalPages
              ? "border-gray-500 text-gray-500 cursor-not-allowed"
              : "border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
