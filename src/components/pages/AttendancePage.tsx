import { useEffect, useState } from "react";
import api from "../../api/api";

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
    phone?: string;
  };
};

type Attendance = {
  id: number;
  checkIn: string;
  checkOut: string | null;
  member: Member;
};

export default function AttendancePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [memberId, setMemberId] = useState("");
  const [date, setDate] = useState("");

  const fetchMembers = async () => {
    const res = await api.get("/members");
    setMembers(res.data);
  };

  const fetchAttendance = async () => {
    const params: any = {};

    if (memberId) params.memberId = memberId;
    if (date) params.date = date;

    const res = await api.get("/attendance", { params });
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchMembers();
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    if (!memberId) {
      alert("Please select member first");
      return;
    }

    await api.post("/attendance/check-in", {
      memberId: Number(memberId),
    });

    fetchAttendance();
  };

  const handleCheckOut = async (attendanceId: number) => {
    await api.patch(`/attendance/${attendanceId}/check-out`);
    fetchAttendance();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Attendance</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-5 md:grid-cols-4">
        <select
          className="rounded bg-slate-900 p-3"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        >
          <option value="">All Members</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.user.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="rounded bg-slate-900 p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={fetchAttendance}
          className="rounded bg-blue-600 px-4 py-3 font-bold"
        >
          Filter
        </button>

        <button
          onClick={handleCheckIn}
          className="rounded bg-green-600 px-4 py-3 font-bold"
        >
          Check In Selected
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Email</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr key={item.id} className="border-t border-slate-700">
                <td className="p-3">{item.member.user.fullName}</td>
                <td className="p-3">{item.member.user.email}</td>
                <td className="p-3">
                  {new Date(item.checkIn).toLocaleString()}
                </td>
                <td className="p-3">
                  {item.checkOut
                    ? new Date(item.checkOut).toLocaleString()
                    : "Not checked out"}
                </td>
                <td className="p-3">
                  {item.checkOut ? "Completed" : "Inside Gym"}
                </td>
                <td className="p-3">
                  {!item.checkOut && (
                    <button
                      onClick={() => handleCheckOut(item.id)}
                      className="rounded bg-red-600 px-3 py-1"
                    >
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {attendance.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan={6}>
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}