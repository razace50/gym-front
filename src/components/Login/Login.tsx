import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Add login API call here
  };

  return (
    <div className="lg:min-h-fit sm:min-h-full flex items-center justify-center py-6 bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Login
        </h2>
        {/* Email input */}
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-gray-800 rounded mt-1 text-white"
            placeholder="Enter your Email"
            required
          />
        </div>
        {/* Password input field */}
        <div className="mb-6 relative">
          <label className="block text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white"
            placeholder="Enter your Password"
            required
            
          />
          <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 pt-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20}/>}

          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center text-sm text-white mt-4">
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
