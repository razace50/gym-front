import React, { useEffect, useState } from "react";
import api from "../../api/api";

type Membership = {
  id: number;
  name: string;
  duration: number;
  price: number;
};

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [form, setForm] = useState({ name: "", duration: "", price: "" });

  const fetchMemberships = async () => {
    try {
      const res = await api.get("/memberships");
      setMemberships(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load memberships");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const createMembership = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/memberships", {
        name: form.name,
        duration: Number(form.duration),
        price: Number(form.price),
      });

      alert("Membership created");
      setForm({ name: "", duration: "", price: "" });
      fetchMemberships();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create membership");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Membership Plans</h1>

      <form onSubmit={createMembership} className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-4">
        <input className="rounded bg-slate-900 p-3" placeholder="Plan name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" type="number" placeholder="Duration in days" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <button className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">Create Plan</button>
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership) => (
              <tr key={membership.id} className="border-t border-slate-700">
                <td className="p-3">{membership.name}</td>
                <td className="p-3">{membership.duration} days</td>
                <td className="p-3">${membership.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
