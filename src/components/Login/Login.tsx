import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    phone?: string | null;
    role: "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER" | "MEMBER";
  };
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const role = response.data.user.role;

      if (role === "TRAINER") {
        navigate("/trainer-dashboard", { replace: true });
      } else if (role === "MEMBER") {
        navigate("/member-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error: unknown) {
      console.error(error);

      let message = "Login failed";

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        message = axiosError.response?.data?.message || message;
      }

      alert(`Login failed: ${message}`);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-950 py-6 sm:min-h-full lg:min-h-fit">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-gray-900 p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-gray-800 p-2 text-white"
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="block text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-gray-800 p-2 pr-10 text-white"
            placeholder="Enter your Password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-white">
          New user?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;