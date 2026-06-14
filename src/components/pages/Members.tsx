import React, { useState, useEffect } from "react";
import MemberCard from "../DashboardComponents/MemberCard";
import api from "../../api/api";

type Member = {
  id: number;
  joinDate: string;
  user: {
    fullName: string;
    email: string;
    phone?: string;
  };
  membership?: {
    name: string;
    duration: number;
    price: number;
  } | null;
};

export default function DashboardMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(9);
  

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members");
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const updateMembersPerPage = () => {
      setMembersPerPage(window.innerWidth < 768 ? 3 : 9);
    };

    updateMembersPerPage();
    window.addEventListener("resize", updateMembersPerPage);

    return () => window.removeEventListener("resize", updateMembersPerPage);
  }, []);

  const totalPages = Math.ceil(members.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = members.slice(startIndex, startIndex + membersPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Gym Members</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-6">
        {currentMembers.map((member) => (
          <MemberCard
  key={member.id}
  first_name={member.user.fullName}
  last_name=""
  membership_type={member.membership?.name || "No Plan"}
  membership_status="Active"
  join_date={new Date(member.joinDate).toLocaleDateString()}
  expiry_date="N/A"
/>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border-2 border-pink-600 text-pink-400"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className="w-10 h-10 rounded-lg bg-slate-800 text-gray-300"
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border-2 border-pink-600 text-pink-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}