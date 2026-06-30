import React, { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../api/api";
import { Link } from "react-router-dom";

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
  createdBy?: {
    fullName: string;
    email: string;
    role: string;
  } | null;
  updatedBy?: {
    fullName: string;
    email: string;
    role: string;
  } | null;
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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [renewMemberId, setRenewMemberId] = useState<number | null>(null);
  const [renewPlanId, setRenewPlanId] = useState("");
  const [renewAmount, setRenewAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  const canManageMembers =
    role === "SUPER_ADMIN" || role === "ADMIN" || role === "RECEPTIONIST";

  const handleAxiosError = (error: unknown, fallbackMessage: string) => {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message ?? error.message);
    } else {
      alert(fallbackMessage);
    }
  };

  const fetchData = useCallback(async () => {
  try {
    const membersRes = await api.get("/members");
    setMembers(membersRes.data);

    if (canManageMembers) {
      const [membershipsRes, trainersRes] = await Promise.all([
        api.get("/memberships"),
        api.get("/trainers"),
      ]);

      setMemberships(membershipsRes.data);
      setTrainers(trainersRes.data);
    }
  } catch (error: unknown) {
    console.error("Failed to load members", error);
    handleAxiosError(error, "Failed to load members data");
  }
}, [canManageMembers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        age: form.age ? Number(form.age) : null,
        gender: form.gender,
        address: form.address,
        membershipId: form.membershipId ? Number(form.membershipId) : null,
        trainerId: form.trainerId ? Number(form.trainerId) : null,
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
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to save member");
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
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to delete member");
    }
  };

  const openRenewModal = (member: Member) => {
    setRenewMemberId(member.id);
    setRenewPlanId(member.membership?.id ? String(member.membership.id) : "");
    setRenewAmount(
      member.membership?.price ? String(member.membership.price) : ""
    );
  };

  const submitRenewal = async () => {
    if (!renewMemberId || !renewPlanId || !renewAmount) {
      alert("Please select plan and amount");
      return;
    }

    try {
      await api.post(`/renewals/${renewMemberId}`, {
        newMembershipId: Number(renewPlanId),
        amount: Number(renewAmount),
      });

      alert("Membership renewed and history saved");
      setRenewMemberId(null);
      setRenewPlanId("");
      setRenewAmount("");
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to renew membership");
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/members/${id}/status`, { status });
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to update status");
    }
  };

  const filteredMembers = members.filter((member) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      member.user.fullName.toLowerCase().includes(keyword) ||
      member.user.email.toLowerCase().includes(keyword) ||
      (member.user.phone || "").toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedRenewPlan = memberships.find(
    (membership) => String(membership.id) === renewPlanId
  );

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Members</h1>

      {canManageMembers && (
        <form
          onSubmit={submitMember}
          className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3"
        >
          <input
            className="rounded bg-slate-900 p-3"
            placeholder="Full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            className="rounded bg-slate-900 p-3"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {!editingId && (
            <input
              className="rounded bg-slate-900 p-3"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          )}

          <input
            className="rounded bg-slate-900 p-3"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="rounded bg-slate-900 p-3"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <select
            className="rounded bg-slate-900 p-3"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="rounded bg-slate-900 p-3"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <select
            className="rounded bg-slate-900 p-3"
            value={form.membershipId}
            onChange={(e) =>
              setForm({ ...form, membershipId: e.target.value })
            }
          >
            <option value="">No Membership</option>
            {memberships.map((membership) => (
              <option key={membership.id} value={membership.id}>
                {membership.name}
              </option>
            ))}
          </select>

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

          <button
            disabled={loading}
            className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700"
          >
            {editingId ? "Update Member" : "Create Member"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded bg-gray-600 p-3 font-bold hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </form>
      )}

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          className="rounded bg-slate-800 p-3"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded bg-slate-800 p-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
          <option value="EXPIRED">EXPIRED</option>
        </select>
      </div>

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
              <th className="p-3">Added By</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t border-slate-700">
                <td className="p-3">{member.user.fullName}</td>
                <td className="p-3">{member.user.email}</td>
                <td className="p-3">{member.user.phone || "N/A"}</td>
                <td className="p-3">{member.membership?.name || "No Plan"}</td>
                <td className="p-3">
                  {member.trainer?.user.fullName || "N/A"}
                </td>
                <td className="p-3">
                  {member.membershipEnd
                    ? new Date(member.membershipEnd).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-3">
                  {canManageMembers ? (
                    <select
                      className="rounded bg-slate-900 p-2"
                      value={member.status}
                      onChange={(e) =>
                        updateStatus(member.id, e.target.value)
                      }
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  ) : (
                    <span>{member.status}</span>
                  )}
                </td>

                <td className="p-3">
                  {member.createdBy
                    ? `${member.createdBy.fullName} (${member.createdBy.role})`
                    : "N/A"}
                </td>

                <td className="flex flex-wrap gap-2 p-3">
                  <Link
                    to={`/members/${member.id}`}
                    className="rounded bg-purple-600 px-3 py-1"
                  >
                    View
                  </Link>

                  {canManageMembers && (
                    <>
                      <button
                        onClick={() => editMember(member)}
                        className="rounded bg-blue-600 px-3 py-1"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openRenewModal(member)}
                        className="rounded bg-green-600 px-3 py-1"
                      >
                        Renew
                      </button>

                      <button
                        onClick={() => deleteMember(member.id)}
                        className="rounded bg-red-600 px-3 py-1"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={9} className="p-5 text-center text-gray-400">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renewMemberId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-bold">Renew Membership</h2>

            <select
              className="mb-4 w-full rounded bg-slate-900 p-3"
              value={renewPlanId}
              onChange={(e) => {
                setRenewPlanId(e.target.value);
                const plan = memberships.find(
                  (membership) => String(membership.id) === e.target.value
                );
                setRenewAmount(plan?.price ? String(plan.price) : "");
              }}
            >
              <option value="">Select Plan</option>
              {memberships.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.name} - {membership.duration} month - $
                  {membership.price}
                </option>
              ))}
            </select>

            <input
              className="mb-4 w-full rounded bg-slate-900 p-3"
              type="number"
              placeholder="Amount"
              value={renewAmount}
              onChange={(e) => setRenewAmount(e.target.value)}
            />

            {selectedRenewPlan && (
              <p className="mb-4 text-sm text-gray-300">
                Selected: {selectedRenewPlan.name}, duration{" "}
                {selectedRenewPlan.duration} month
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={submitRenewal}
                className="flex-1 rounded bg-green-600 p-3 font-bold"
              >
                Confirm Renew
              </button>

              <button
                onClick={() => setRenewMemberId(null)}
                className="flex-1 rounded bg-gray-600 p-3 font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}