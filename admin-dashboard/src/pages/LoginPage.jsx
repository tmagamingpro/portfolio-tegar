import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn, setPage }) {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login Admin </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded" onClick = {handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
