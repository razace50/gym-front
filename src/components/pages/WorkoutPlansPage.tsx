import { useEffect, useState } from "react";
import api from "../../api/api";

type User = {
  role: string;
};

export default function WorkoutPlansPage() {
  const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const [plans, setPlans] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    exercises: "",
    notes: "",
    memberId: "",
    trainerId: "",
  });

  const canManage =
    user?.role === "SUPER_ADMIN" || user?.role === "ADMIN" || user?.role === "TRAINER";

  const fetchData = async () => {
    const plansRes = await api.get("/workout-plans");
    setPlans(plansRes.data);

    if (canManage) {
      const membersRes = await api.get("/members");
      setMembers(membersRes.data);

      if (user?.role !== "TRAINER") {
        const trainersRes = await api.get("/trainers");
        setTrainers(trainersRes.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPlan = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/workout-plans", {
      ...form,
      memberId: Number(form.memberId),
      trainerId: form.trainerId ? Number(form.trainerId) : null,
    });

    setForm({
      title: "",
      description: "",
      exercises: "",
      notes: "",
      memberId: "",
      trainerId: "",
    });

    fetchData();
  };

  const deletePlan = async (id: number) => {
    if (!confirm("Delete this workout plan?")) return;

    await api.delete(`/workout-plans/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Workout Plans</h1>

      {canManage && (
        <form
          onSubmit={createPlan}
          className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-slate-800 p-6"
        >
          <input
            className="rounded bg-slate-900 p-3"
            placeholder="Workout title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="rounded bg-slate-900 p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <textarea
            className="rounded bg-slate-900 p-3"
            placeholder="Exercises e.g. Bench Press 3x10, Squat 4x8"
            value={form.exercises}
            onChange={(e) => setForm({ ...form, exercises: e.target.value })}
            required
          />

          <textarea
            className="rounded bg-slate-900 p-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

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

          {user?.role !== "TRAINER" && (
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

          <button className="rounded bg-pink-600 p-3 font-bold">
            Create Workout Plan
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-xl bg-slate-800 p-5">
            <h2 className="text-xl font-bold">{plan.title}</h2>

            <p className="mt-2 text-gray-300">{plan.description}</p>

            <div className="mt-4 rounded bg-slate-900 p-4">
              <p className="font-bold">Exercises:</p>
              <p className="whitespace-pre-wrap text-gray-300">
                {plan.exercises}
              </p>
            </div>

            {plan.notes && (
              <p className="mt-3 text-sm text-gray-400">Notes: {plan.notes}</p>
            )}

            <p className="mt-3 text-sm text-gray-400">
              Member: {plan.member?.user?.fullName}
            </p>

            <p className="text-sm text-gray-400">
              Trainer: {plan.trainer?.user?.fullName || "N/A"}
            </p>

            {canManage && (
              <button
                onClick={() => deletePlan(plan.id)}
                className="mt-4 rounded bg-red-600 px-3 py-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}