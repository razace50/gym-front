import React, { useEffect, useState } from "react";
import api from "../../api/api";

type StaffRole = "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER";

type User = {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  role: StaffRole | "MEMBER";
};

export default function Admins() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "ADMIN" as StaffRole,
    specialization: "",
    shift: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Account created successfully");
      setForm({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role: "ADMIN",
        specialization: "",
        shift: "",
      });
      fetchUsers();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Admin / Staff Management</h1>

      <form onSubmit={createUser} className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-2">
        <input className="rounded bg-slate-900 p-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <select className="rounded bg-slate-900 p-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as StaffRole })}>
          <option value="ADMIN">ADMIN</option>
          <option value="RECEPTIONIST">RECEPTIONIST</option>
          <option value="TRAINER">TRAINER</option>
        </select>

        {form.role === "TRAINER" && (
          <input className="rounded bg-slate-900 p-3" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        )}

        {form.role === "RECEPTIONIST" && (
          <input className="rounded bg-slate-900 p-3" placeholder="Shift" value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} />
        )}

        <button className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">
          Create Account
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-700">
                <td className="p-3">{user.fullName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone || "N/A"}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
