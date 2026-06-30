import React, { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../api/api";

type User = {
  id?: number;
  role: "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER" | "MEMBER";
};

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type Trainer = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type ProgressRecord = {
  id: number;
  recordedDate: string;
  weight?: string | number | null;
  height?: string | number | null;
  chest?: string | number | null;
  waist?: string | number | null;
  arms?: string | number | null;
  notes?: string | null;
  member?: Member | null;
  trainer?: Trainer | null;
};

const emptyForm = {
  memberId: "",
  trainerId: "",
  weight: "",
  height: "",
  chest: "",
  waist: "",
  arms: "",
  notes: "",
  recordedDate: "",
};

export default function ProgressPage() {
  const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const canCreateRecord =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TRAINER";

  const canSelectTrainer = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

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

  const fetchData = useCallback(async () => {
    try {
      const recordsRes = await api.get("/progress");
      setRecords(recordsRes.data);

      if (canCreateRecord) {
        const membersRes = await api.get("/members");
        setMembers(membersRes.data);
      }

      if (canSelectTrainer) {
        const trainersRes = await api.get("/trainers");
        setTrainers(trainersRes.data);
      }
    } catch (error: unknown) {
      console.error("Failed to load progress records:", error);
      handleAxiosError(error, "Failed to load progress records");
    }
  }, [canCreateRecord, canSelectTrainer, handleAxiosError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/progress", {
        memberId: Number(form.memberId),
        trainerId: form.trainerId ? Number(form.trainerId) : null,
        weight: form.weight ? Number(form.weight) : null,
        height: form.height ? Number(form.height) : null,
        chest: form.chest ? Number(form.chest) : null,
        waist: form.waist ? Number(form.waist) : null,
        arms: form.arms ? Number(form.arms) : null,
        notes: form.notes,
        recordedDate: form.recordedDate || undefined,
      });

      alert("Progress record added successfully");
      setForm(emptyForm);
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to create progress record");
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: number) => {
    if (!confirm("Delete this progress record?")) return;

    try {
      await api.delete(`/progress/${id}`);
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to delete progress record");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Progress Tracking</h1>

      {canCreateRecord && (
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

          {canSelectTrainer && (
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

          <button
            disabled={loading}
            className="rounded bg-pink-600 p-3 font-bold md:col-span-3 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Progress Record"}
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
              {canCreateRecord && <th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-slate-700">
                <td className="p-3">
                  {record.member?.user?.fullName || "N/A"}
                </td>

                <td className="p-3">
                  {record.trainer?.user?.fullName || "N/A"}
                </td>

                <td className="p-3">
                  {record.recordedDate
                    ? new Date(record.recordedDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-3">{record.weight ?? "-"}</td>
                <td className="p-3">{record.height ?? "-"}</td>
                <td className="p-3">{record.chest ?? "-"}</td>
                <td className="p-3">{record.waist ?? "-"}</td>
                <td className="p-3">{record.arms ?? "-"}</td>
                <td className="p-3">{record.notes || "-"}</td>

                {canCreateRecord && (
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
                  colSpan={canCreateRecord ? 10 : 9}
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