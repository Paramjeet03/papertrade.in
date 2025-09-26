import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const pswd = e.target.password.value;

    try {
      const resp = await fetch("http://127.0.0.1:8001/user_service/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, plain_pass: pswd }),
      });

      const data = await resp.json();

      if (resp.ok) {
        localStorage.setItem("access_token", data.access_token);
        setErrorMessage("");
        navigate("/Dashboard");
      } else {
        setErrorMessage(data.detail || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] max-w-md h-auto rounded-3xl bg-purple-700 flex flex-col justify-center items-center p-8 shadow-lg"
      >
        <h1 className="font-bold text-4xl underline text-white mb-8">Login Now</h1>

        <form className="flex flex-col w-full" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-2 text-white font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-b-2 border-white p-2 bg-transparent rounded mb-4 w-full text-white placeholder-white focus:border-b-4 focus:outline-none"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="mb-2 text-white font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-b-2 border-white p-2 rounded mb-4 w-full text-white placeholder-white focus:border-b-4 focus:outline-none"
            placeholder="Enter your password"
            required
          />

          {errorMessage && (
            <div className="text-red-500 font-semibold mb-4 text-left underline">
              Error: {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-white text-purple-700 font-bold py-2 px-4 rounded w-full transition duration-200 hover:bg-gray-200 hover:text-gray-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
