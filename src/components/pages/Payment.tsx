import React, { useEffect, useState } from "react";
import api from "../../api/api";

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type Payment = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  member: Member;
};

export default function Payment() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [form, setForm] = useState({
    memberId: "",
    amount: "",
    status: "PAID",
  });

  const fetchData = async () => {
    const membersRes = await api.get("/members");
    const paymentsRes = await api.get("/payments");

    setMembers(membersRes.data);
    setPayments(paymentsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/payments", {
      memberId: Number(form.memberId),
      amount: Number(form.amount),
      status: form.status,
    });

    alert("Payment recorded");

    setForm({
      memberId: "",
      amount: "",
      status: "PAID",
    });

    fetchData();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      <form onSubmit={createPayment} className="bg-slate-800 p-6 rounded-xl mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select className="p-3 rounded bg-slate-900" value={form.memberId} onChange={(e) => setForm({ ...form, memberId: e.target.value })} required>
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.user.fullName}
            </option>
          ))}
        </select>

        <input className="p-3 rounded bg-slate-900" type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />

        <select className="p-3 rounded bg-slate-900" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
        </select>

        <button className="bg-pink-600 hover:bg-pink-700 rounded p-3 font-bold">
          Add Payment
        </button>
      </form>

      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-700">
                <td className="p-3">{payment.member.user.fullName}</td>
                <td className="p-3">${payment.amount}</td>
                <td className="p-3">{payment.status}</td>
                <td className="p-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}