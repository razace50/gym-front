import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Settings() {
  const [form, setForm] = useState({
    gymName: "",
    logoUrl: "",
    phone: "",
    email: "",
    address: "",
    currency: "AUD",
    openingHours: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setForm({
          gymName: res.data.gymName || "",
          logoUrl: res.data.logoUrl || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          address: res.data.address || "",
          currency: res.data.currency || "AUD",
          openingHours: res.data.openingHours || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load settings");
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch("/settings", form);
      alert("Settings updated successfully");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Gym Settings</h1>

      <form
        onSubmit={updateSettings}
        className="grid max-w-3xl grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6"
      >
        <input
          className="rounded bg-slate-900 p-3"
          placeholder="Gym Name"
          value={form.gymName}
          onChange={(e) => setForm({ ...form, gymName: e.target.value })}
          required
        />

        <input
          className="rounded bg-slate-900 p-3"
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
        />

        <input
          className="rounded bg-slate-900 p-3"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="rounded bg-slate-900 p-3"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="rounded bg-slate-900 p-3"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <select
          className="rounded bg-slate-900 p-3"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        >
          <option value="AUD">AUD</option>
          <option value="NPR">NPR</option>
          <option value="USD">USD</option>
        </select>

        <input
          className="rounded bg-slate-900 p-3"
          placeholder="Opening Hours e.g. Mon-Sat 6AM - 9PM"
          value={form.openingHours}
          onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
        />

        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="Gym Logo"
            className="h-24 w-24 rounded object-cover"
          />
        )}

        <button
          disabled={loading}
          className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}