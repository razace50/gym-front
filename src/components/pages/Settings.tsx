import React, { useEffect, useState } from "react";
import api from "../../api/api";

type User = {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
};

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await api.get("/auth/me");
      setUser(res.data);
    };

    fetchMe();
  }, []);

  if (!user) {
    return <div className="p-6 text-white">Loading settings...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-slate-800 p-6 rounded-xl max-w-xl">
        <p className="mb-3">
          <span className="font-bold">Name:</span> {user.fullName}
        </p>

        <p className="mb-3">
          <span className="font-bold">Email:</span> {user.email}
        </p>

        <p className="mb-3">
          <span className="font-bold">Phone:</span> {user.phone || "N/A"}
        </p>

        <p className="mb-3">
          <span className="font-bold">Role:</span> {user.role}
        </p>

        <p>
          <span className="font-bold">Joined:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}