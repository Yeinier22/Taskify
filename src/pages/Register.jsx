import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register: registerUser  } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (err) {
      console.error(err); // log para depuración
      setError("Registration failed");
    }
  };


  return (
    <div className="form-container max-w-sm mx-auto mt-16 p-6 border rounded">
      <h2 className="text-xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
          >
             {showPassword ? (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        {error && <p className="error text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
