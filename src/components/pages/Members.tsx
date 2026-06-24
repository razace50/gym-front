import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {Link} from "react-router-dom";

type Membership = {
  id: number;
  name: string;
  duration: number;
  price: number;
};

type Trainer = {
  id: number;
  specialization?: string | null;
  user: {
    fullName: string;
    email: string;
  };
};

type Member = {
  id: number;
  age?: number | null;
  gender?: string | null;
  address?: string | null;
  joinDate: string;
  membershipStart?: string | null;
  membershipEnd?: string | null;
  status: string;
  user: {
    fullName: string;
    email: string;
    phone?: string | null;
  };
  membership?: Membership | null;
  trainer?: Trainer | null;
};

const emptyForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  gender: "",
  address: "",
  membershipId: "",
  trainerId: "",
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [membersRes, membershipsRes, trainersRes] = await Promise.all([
        api.get("/members"),
        api.get("/memberships"),
        api.get("/trainers"),
      ]);

      setMembers(membersRes.data);
      setMemberships(membershipsRes.data);
      setTrainers(trainersRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load members data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        age: form.age,
        gender: form.gender,
        address: form.address,
        membershipId: form.membershipId || null,
        trainerId: form.trainerId || null,
      };

      if (editingId) {
        await api.patch(`/members/${editingId}`, {
          ...payload,
          password: undefined,
        });
        alert("Member updated successfully");
      } else {
        await api.post("/members", payload);
        alert("Member created successfully");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  const editMember = (member: Member) => {
    setEditingId(member.id);
    setForm({
      fullName: member.user.fullName,
      email: member.user.email,
      password: "",
      phone: member.user.phone || "",
      age: member.age ? String(member.age) : "",
      gender: member.gender || "",
      address: member.address || "",
      membershipId: member.membership?.id ? String(member.membership.id) : "",
      trainerId: member.trainer?.id ? String(member.trainer.id) : "",
    });
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      await api.delete(`/members/${id}`);
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete member");
    }
  };

  const renewMember = async (id: number) => {
    try {
      await api.patch(`/members/${id}/renew`);
      alert("Membership renewed");
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to renew membership");
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/members/${id}/status`, { status });
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Members</h1>

      <form
        onSubmit={submitMember}
        className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3"
      >
        <input className="rounded bg-slate-900 p-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input className="rounded bg-slate-900 p-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        {!editingId && <input className="rounded bg-slate-900 p-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />}
        <input className="rounded bg-slate-900 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="rounded bg-slate-900 p-3" type="number" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
        <select className="rounded bg-slate-900 p-3" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input className="rounded bg-slate-900 p-3" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <select className="rounded bg-slate-900 p-3" value={form.membershipId} onChange={(e) => setForm({ ...form, membershipId: e.target.value })}>
          <option value="">No Membership</option>
          {memberships.map((membership) => (
            <option key={membership.id} value={membership.id}>{membership.name}</option>
          ))}
        </select>
        <select className="rounded bg-slate-900 p-3" value={form.trainerId} onChange={(e) => setForm({ ...form, trainerId: e.target.value })}>
          <option value="">No Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>{trainer.user.fullName}</option>
          ))}
        </select>

        <button disabled={loading} className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">
          {editingId ? "Update Member" : "Create Member"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} className="rounded bg-gray-600 p-3 font-bold hover:bg-gray-700">
            Cancel Edit
          </button>
        )}
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Trainer</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t border-slate-700">
                <td className="p-3">{member.user.fullName}</td>
                <td className="p-3">{member.user.email}</td>
                <td className="p-3">{member.user.phone || "N/A"}</td>
                <td className="p-3">{member.membership?.name || "No Plan"}</td>
                <td className="p-3">{member.trainer?.user.fullName || "N/A"}</td>
                <td className="p-3">{member.membershipEnd ? new Date(member.membershipEnd).toLocaleDateString() : "N/A"}</td>
                <td className="p-3">
                  <select className="rounded bg-slate-900 p-2" value={member.status} onChange={(e) => updateStatus(member.id, e.target.value)}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                    <option value="EXPIRED">EXPIRED</option>
                  </select>
                </td>
                <td className="flex flex-wrap gap-2 p-3">
                  <Link
  to={`/members/${member.id}`}
  className="rounded bg-purple-600 px-3 py-1"
>
  View
</Link>
                  <button onClick={() => editMember(member)} className="rounded bg-blue-600 px-3 py-1">Edit</button>
                  <button onClick={() => renewMember(member.id)} className="rounded bg-green-600 px-3 py-1">Renew</button>
                  <button onClick={() => deleteMember(member.id)} className="rounded bg-red-600 px-3 py-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
