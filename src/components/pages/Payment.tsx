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
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  const printReceipt = (payment: Payment) => {
    const receiptWindow = window.open("", "_blank");

    if (!receiptWindow) return;

    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt #GYM-${payment.id}</title>
        </head>
        <body style="font-family: Arial; padding: 30px;">
          <h1>Hamro Gym</h1>
          <h2>Payment Receipt</h2>
          <hr />
          <p><strong>Receipt No:</strong> GYM-${payment.id}</p>
          <p><strong>Member:</strong> ${payment.member.user.fullName}</p>
          <p><strong>Email:</strong> ${payment.member.user.email}</p>
          <p><strong>Amount:</strong> $${payment.amount}</p>
          <p><strong>Status:</strong> ${payment.status}</p>
          <p><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleString()}</p>
          <hr />
          <p>Thank you for your payment.</p>
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);

    receiptWindow.document.close();
  };

  const filteredPayments =
    statusFilter === "ALL"
      ? payments
      : payments.filter((payment) => payment.status === statusFilter);

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Payments</h1>

      <form
        onSubmit={createPayment}
        className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-4"
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

        <input
          className="rounded bg-slate-900 p-3"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <select
          className="rounded bg-slate-900 p-3"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
        </select>

        <button className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700">
          Add Payment
        </button>
      </form>

      <div className="mb-4">
        <select
          className="rounded bg-slate-800 p-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Payments</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Receipt</th>
              <th className="p-3">Member</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-700">
                <td className="p-3">GYM-{payment.id}</td>
                <td className="p-3">{payment.member.user.fullName}</td>
                <td className="p-3">${payment.amount}</td>
                <td className="p-3">{payment.status}</td>
                <td className="p-3">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => printReceipt(payment)}
                    className="rounded bg-green-600 px-3 py-1"
                  >
                    Print Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}