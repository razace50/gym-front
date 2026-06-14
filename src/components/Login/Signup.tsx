import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../api/api";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await api.post("/auth/signup", {
      fullName: name,
      email,
      password,
    });

    alert("Signup successful. Please login.");
    window.location.href = "/login";
  } catch (error) {
    console.error(error);
    alert("Signup failed");
  }
};

  return (
    <div className="lg:min-h-fit sm:min-h-full flex items-center justify-center py-6 bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-white bg-gray-800"
            placeholder="Enter your fullname"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-white bg-gray-800 "
            placeholder="Enter you email"
            required
          />
        </div>
        <div className="mb-6 relative">
  <label className="block text-white">Password</label>
  
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mt-1 text-white bg-gray-800 pr-10"
      placeholder="Enter your Password"
      required
    />

    {/* Eye toggle button */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
