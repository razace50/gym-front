import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../api/api";

type Role = "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER" | "MEMBER";

type LoggedInUser = {
  id: number;
  fullName: string;
  email: string;
  role: Role;
};

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
    phone?: string | null;
  };
};

type Attendance = {
  id: number;
  checkIn: string;
  checkOut: string | null;
  member: Member;
};

type AttendanceQueryParams = {
  memberId?: string;
  date?: string;
};

export default function AttendancePage() {
  const loggedInUser: LoggedInUser | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const [members, setMembers] = useState<Member[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [memberId, setMemberId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const canManageAttendance =
    loggedInUser?.role === "SUPER_ADMIN" ||
    loggedInUser?.role === "ADMIN" ||
    loggedInUser?.role === "RECEPTIONIST" ||
    loggedInUser?.role === "TRAINER";

  const handleAxiosError = useCallback(
    (error: unknown, fallbackMessage: string) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? error.message);
      } else {
        alert(fallbackMessage);
      }
    },
    []
  );

  const fetchMembers = useCallback(async () => {
    try {
      const res = await api.get<Member[]>("/members");
      setMembers(res.data);
    } catch (error: unknown) {
      console.error("Failed to fetch members:", error);
      handleAxiosError(error, "Failed to fetch members");
    }
  }, [handleAxiosError]);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);

    try {
      const params: AttendanceQueryParams = {};

      if (memberId) params.memberId = memberId;
      if (date) params.date = date;

      const res = await api.get<Attendance[]>("/attendance", { params });
      setAttendance(res.data);
    } catch (error: unknown) {
      console.error("Failed to fetch attendance:", error);
      handleAxiosError(error, "Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  }, [memberId, date, handleAxiosError]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleCheckIn = async () => {
    if (!memberId) {
      alert("Please select member first");
      return;
    }

    setActionLoading(true);

    try {
      await api.post("/attendance/check-in", {
        memberId: Number(memberId),
      });

      alert("Member checked in successfully");
      fetchAttendance();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to check in");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async (attendanceId: number) => {
    setActionLoading(true);

    try {
      await api.patch(`/attendance/${attendanceId}/check-out`);
      alert("Member checked out successfully");
      fetchAttendance();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to check out");
    } finally {
      setActionLoading(false);
    }
  };

  const clearFilters = () => {
    setMemberId("");
    setDate("");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Attendance</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-5 md:grid-cols-5">
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
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-3 font-bold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Filter"}
        </button>

        <button
          onClick={clearFilters}
          className="rounded bg-gray-600 px-4 py-3 font-bold hover:bg-gray-700"
        >
          Clear
        </button>

        {canManageAttendance && (
          <button
            onClick={handleCheckIn}
            disabled={actionLoading || !memberId}
            className="rounded bg-green-600 px-4 py-3 font-bold hover:bg-green-700 disabled:opacity-60"
          >
            {actionLoading ? "Processing..." : "Check In Selected"}
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Status</th>
              {canManageAttendance && <th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  className="p-5 text-center text-gray-400"
                  colSpan={canManageAttendance ? 7 : 6}
                >
                  Loading attendance...
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr key={item.id} className="border-t border-slate-700">
                  <td className="p-3">{item.member.user.fullName}</td>
                  <td className="p-3">{item.member.user.email}</td>
                  <td className="p-3">{item.member.user.phone || "N/A"}</td>

                  <td className="p-3">
                    {new Date(item.checkIn).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {item.checkOut
                      ? new Date(item.checkOut).toLocaleString()
                      : "Not checked out"}
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold ${
                        item.checkOut ? "bg-blue-600" : "bg-green-600"
                      }`}
                    >
                      {item.checkOut ? "Completed" : "Inside Gym"}
                    </span>
                  </td>

                  {canManageAttendance && (
                    <td className="p-3">
                      {!item.checkOut ? (
                        <button
                          onClick={() => handleCheckOut(item.id)}
                          disabled={actionLoading}
                          className="rounded bg-red-600 px-3 py-1 hover:bg-red-700 disabled:opacity-60"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-gray-400">Done</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}

            {!loading && attendance.length === 0 && (
              <tr>
                <td
                  className="p-4 text-center text-gray-400"
                  colSpan={canManageAttendance ? 7 : 6}
                >
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