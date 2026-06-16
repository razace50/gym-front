import React, { useEffect, useState } from "react";
import api from "../../api/api";

type Trainer = {
  id: number;
  specialization?: string | null;
  user: {
    fullName: string;
    email: string;
    phone?: string | null;
  };
  members?: { id: number }[];
};

const emptyForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  specialization: "",
};

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTrainers = async () => {
    try {
      const res = await api.get("/trainers");
      setTrainers(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load trainers");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submitTrainer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.patch(`/trainers/${editingId}`, {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          specialization: form.specialization,
        });
        alert("Trainer updated");
      } else {
        await api.post("/trainers", form);
        alert("Trainer created");
      }

      resetForm();
      fetchTrainers();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to save trainer");
    }
  };

  const editTrainer = (trainer: Trainer) => {
    setEditingId(trainer.id);
    setForm({
      fullName: trainer.user.fullName,
      email: trainer.user.email,
      password: "",
      phone: trainer.user.phone || "",
      specialization: trainer.specialization || "",
    });
  };

  const deleteTrainer = async (id: number) => {
    if (!confirm("Delete this trainer?")) return;

    try {
      await api.delete(`/trainers/${id}`);
      fetchTrainers();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete trainer");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Trainers</h1>

      <form onSubmit={submitTrainer} className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3">
        <input className="rounded bg-slate-900 p-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        {!editingId && <input className="rounded bg-slate-900 p-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />}
        <input className="rounded bg-slate-900 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="rounded bg-slate-900 p-3" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />

        <button className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">
          {editingId ? "Update Trainer" : "Create Trainer"}
        </button>

        {editingId && <button type="button" onClick={resetForm} className="rounded bg-gray-600 p-3 font-bold">Cancel</button>}
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Members</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="border-t border-slate-700">
                <td className="p-3">{trainer.user.fullName}</td>
                <td className="p-3">{trainer.user.email}</td>
                <td className="p-3">{trainer.user.phone || "N/A"}</td>
                <td className="p-3">{trainer.specialization || "N/A"}</td>
                <td className="p-3">{trainer.members?.length || 0}</td>
                <td className="flex gap-2 p-3">
                  <button onClick={() => editTrainer(trainer)} className="rounded bg-blue-600 px-3 py-1">Edit</button>
                  <button onClick={() => deleteTrainer(trainer.id)} className="rounded bg-red-600 px-3 py-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
