import { useEffect, useState } from "react";
import api from "../../api/api";

const emptyForm = {
  title: "",
  category: "RENT",
  amount: "",
  expenseDate: "",
  notes: "",
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const submitExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (editingId) {
      await api.patch(`/expenses/${editingId}`, payload);
      alert("Expense updated");
    } else {
      await api.post("/expenses", payload);
      alert("Expense added");
    }

    setForm(emptyForm);
    setEditingId(null);
    fetchExpenses();
  };

  const editExpense = (expense: any) => {
    setEditingId(expense.id);
    setForm({
      title: expense.title,
      category: expense.category,
      amount: String(expense.amount),
      expenseDate: expense.expenseDate
        ? expense.expenseDate.slice(0, 10)
        : "",
      notes: expense.notes || "",
    });
  };

  const deleteExpense = async (id: number) => {
    if (!confirm("Delete this expense?")) return;

    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Expenses</h1>

      <div className="mb-6 rounded-xl bg-slate-800 p-5">
        <p className="text-gray-400">Total Expenses</p>
        <h2 className="text-3xl font-bold">${totalExpenses}</h2>
      </div>

      <form
        onSubmit={submitExpense}
        className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6 md:grid-cols-3"
      >
        <input
          className="rounded bg-slate-900 p-3"
          placeholder="Expense Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <select
          className="rounded bg-slate-900 p-3"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="RENT">Rent</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="SALARY">Salary</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="number"
          className="rounded bg-slate-900 p-3"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          type="date"
          className="rounded bg-slate-900 p-3"
          value={form.expenseDate}
          onChange={(e) => setForm({ ...form, expenseDate: e.target.value })}
        />

        <textarea
          className="rounded bg-slate-900 p-3 md:col-span-2"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button className="rounded bg-pink-600 p-3 font-bold md:col-span-3">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
            }}
            className="rounded bg-gray-600 p-3 font-bold md:col-span-3"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-t border-slate-700">
                <td className="p-3">{expense.title}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">${expense.amount}</td>
                <td className="p-3">
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </td>
                <td className="p-3">{expense.notes || "-"}</td>
                <td className="flex gap-2 p-3">
                  <button
                    onClick={() => editExpense(expense)}
                    className="rounded bg-blue-600 px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="rounded bg-red-600 px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {expenses.length === 0 && (
              <tr>
                <td colSpan={6} className="p-5 text-center text-gray-400">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}