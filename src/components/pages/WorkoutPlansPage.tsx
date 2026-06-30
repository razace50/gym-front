import React, { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../api/api";

type User = {
  id?: number;
  role: "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER" | "MEMBER";
};

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type Trainer = {
  id: number;
  user: {
    fullName: string;
    email: string;
  };
};

type WorkoutPlan = {
  id: number;
  title: string;
  description?: string | null;
  exercises: string;
  notes?: string | null;
  member?: Member | null;
  trainer?: Trainer | null;
};

const emptyForm = {
  title: "",
  description: "",
  exercises: "",
  notes: "",
  memberId: "",
  trainerId: "",
};

export default function WorkoutPlansPage() {
  const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const canCreatePlan =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "TRAINER";

  const canSelectTrainer = user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";

  const handleAxiosError = useCallback(
    (error: unknown, fallbackMessage: string) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? error.message);
      } else {
        alert(fallbackMessage);
      }
    },
    []
  );

  const fetchData = useCallback(async () => {
    try {
      const plansRes = await api.get("/workout-plans");
      setPlans(plansRes.data);

      if (canCreatePlan) {
        const membersRes = await api.get("/members");
        setMembers(membersRes.data);
      }

      if (canSelectTrainer) {
        const trainersRes = await api.get("/trainers");
        setTrainers(trainersRes.data);
      }
    } catch (error: unknown) {
      console.error("Failed to load workout plans:", error);
      handleAxiosError(error, "Failed to load workout plans");
    }
  }, [canCreatePlan, canSelectTrainer, handleAxiosError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/workout-plans", {
        title: form.title,
        description: form.description,
        exercises: form.exercises,
        notes: form.notes,
        memberId: Number(form.memberId),
        trainerId: form.trainerId ? Number(form.trainerId) : null,
      });

      alert("Workout plan created successfully");
      setForm(emptyForm);
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to create workout plan");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: number) => {
    if (!confirm("Delete this workout plan?")) return;

    try {
      await api.delete(`/workout-plans/${id}`);
      fetchData();
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to delete workout plan");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Workout Plans</h1>

      {canCreatePlan && (
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
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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

          {canSelectTrainer && (
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

          <button
            disabled={loading}
            className="rounded bg-pink-600 p-3 font-bold hover:bg-pink-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Workout Plan"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-xl bg-slate-800 p-5">
            <h2 className="text-xl font-bold">{plan.title}</h2>

            <p className="mt-2 text-gray-300">
              {plan.description || "No description"}
            </p>

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
              Member: {plan.member?.user?.fullName || "N/A"}
            </p>

            <p className="text-sm text-gray-400">
              Trainer: {plan.trainer?.user?.fullName || "N/A"}
            </p>

            {canCreatePlan && (
              <button
                onClick={() => deletePlan(plan.id)}
                className="mt-4 rounded bg-red-600 px-3 py-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {plans.length === 0 && (
          <p className="text-gray-400">No workout plans found.</p>
        )}
      </div>
    </div>
  );
}