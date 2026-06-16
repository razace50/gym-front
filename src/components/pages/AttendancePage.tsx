import React, { useEffect, useState } from "react";
import api from "../../api/api";

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type Attendance = {
  id: number;
  checkIn: string;
  checkOut?: string | null;
  member: Member;
};

export default function AttendancePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [memberId, setMemberId] = useState("");

  const fetchData = async () => {
    try {
      const [membersRes, attendanceRes] = await Promise.all([
        api.get("/members"),
        api.get("/attendance"),
      ]);

      setMembers(membersRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load attendance data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/attendance/check-in", { memberId: Number(memberId) });
      alert("Member checked in");
      setMemberId("");
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Check-in failed");
    }
  };

  const checkOut = async (attendanceId: number) => {
    try {
      await api.patch(`/attendance/${attendanceId}/check-out`);
      alert("Member checked out");
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Check-out failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Attendance</h1>

      <form onSubmit={checkIn} className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3">
        <select className="rounded bg-slate-900 p-3" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.user.fullName}</option>
          ))}
        </select>

        <button className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">Check In</button>
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item) => (
              <tr key={item.id} className="border-t border-slate-700">
                <td className="p-3">{item.member.user.fullName}</td>
                <td className="p-3">{new Date(item.checkIn).toLocaleString()}</td>
                <td className="p-3">{item.checkOut ? new Date(item.checkOut).toLocaleString() : "Still inside"}</td>
                <td className="p-3">
                  {!item.checkOut && (
                    <button onClick={() => checkOut(item.id)} className="rounded bg-green-600 px-3 py-1">
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
