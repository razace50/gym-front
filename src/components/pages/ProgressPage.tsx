import { useEffect, useState } from "react";
import api from "../../api/api";

type User = {
  role: string;
};

export default function ProgressPage() {
  const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const canManage =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TRAINER";

  const [records, setRecords] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);

  const [form, setForm] = useState({
    memberId: "",
    trainerId: "",
    weight: "",
    height: "",
    chest: "",
    waist: "",
    arms: "",
    notes: "",
    recordedDate: "",
  });

  const fetchData = async () => {
    const recordsRes = await api.get("/progress");
    setRecords(recordsRes.data);

    if (canManage) {
      const membersRes = await api.get("/members");
      setMembers(membersRes.data);

      if (user?.role !== "TRAINER") {
        const trainersRes = await api.get("/trainers");
        setTrainers(trainersRes.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createRecord = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/progress", {
      memberId: Number(form.memberId),
      trainerId: form.trainerId ? Number(form.trainerId) : null,
      weight: form.weight,
      height: form.height,
      chest: form.chest,
      waist: form.waist,
      arms: form.arms,
      notes: form.notes,
      recordedDate: form.recordedDate,
    });

    setForm({
      memberId: "",
      trainerId: "",
      weight: "",
      height: "",
      chest: "",
      waist: "",
      arms: "",
      notes: "",
      recordedDate: "",
    });

    fetchData();
  };

  const deleteRecord = async (id: number) => {
    if (!confirm("Delete this progress record?")) return;

    await api.delete(`/progress/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Progress Tracking</h1>

      {canManage && (
        <form
          onSubmit={createRecord}
          className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3"
        >
          <select
            className="rounded bg-slate-900 p-3"
            value={form.memberId}
            onChange={(e) => setForm({ ...form, memberId: e.target.value })}
            required
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.user.fullName}
              </option>
            ))}
          </select>

          {user?.role !== "TRAINER" && (
            <select
              className="rounded bg-slate-900 p-3"
              value={form.trainerId}
              onChange={(e) => setForm({ ...form, trainerId: e.target.value })}
            >
              <option value="">No Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.user.fullName}
                </option>
              ))}
            </select>
          )}

          <input
            type="date"
            className="rounded bg-slate-900 p-3"
            value={form.recordedDate}
            onChange={(e) =>
              setForm({ ...form, recordedDate: e.target.value })
            }
          />

          <input
            type="number"
            step="0.1"
            className="rounded bg-slate-900 p-3"
            placeholder="Weight kg"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />

          <input
            type="number"
            step="0.1"
            className="rounded bg-slate-900 p-3"
            placeholder="Height cm"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />

          <input
            type="number"
            step="0.1"
            className="rounded bg-slate-900 p-3"
            placeholder="Chest cm"
            value={form.chest}
            onChange={(e) => setForm({ ...form, chest: e.target.value })}
          />

          <input
            type="number"
            step="0.1"
            className="rounded bg-slate-900 p-3"
            placeholder="Waist cm"
            value={form.waist}
            onChange={(e) => setForm({ ...form, waist: e.target.value })}
          />

          <input
            type="number"
            step="0.1"
            className="rounded bg-slate-900 p-3"
            placeholder="Arms cm"
            value={form.arms}
            onChange={(e) => setForm({ ...form, arms: e.target.value })}
          />

          <textarea
            className="rounded bg-slate-900 p-3 md:col-span-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <button className="rounded bg-pink-600 p-3 font-bold md:col-span-3">
            Add Progress Record
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Trainer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Weight</th>
              <th className="p-3">Height</th>
              <th className="p-3">Chest</th>
              <th className="p-3">Waist</th>
              <th className="p-3">Arms</th>
              <th className="p-3">Notes</th>
              {canManage && <th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-slate-700">
                <td className="p-3">{record.member?.user?.fullName}</td>
                <td className="p-3">
                  {record.trainer?.user?.fullName || "N/A"}
                </td>
                <td className="p-3">
                  {new Date(record.recordedDate).toLocaleDateString()}
                </td>
                <td className="p-3">{record.weight || "-"}</td>
                <td className="p-3">{record.height || "-"}</td>
                <td className="p-3">{record.chest || "-"}</td>
                <td className="p-3">{record.waist || "-"}</td>
                <td className="p-3">{record.arms || "-"}</td>
                <td className="p-3">{record.notes || "-"}</td>

                {canManage && (
                  <td className="p-3">
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="rounded bg-red-600 px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan={canManage ? 10 : 9}
                  className="p-5 text-center text-gray-400"
                >
                  No progress records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}