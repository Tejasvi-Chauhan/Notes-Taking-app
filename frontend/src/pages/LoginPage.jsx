import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../lib/Api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await api.post("/auth/login", { email, password });
      toast.success("Login succesfully");
      navigate("/"); //  HomePage
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin} noValidate>
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            {/* IMPORTANT: relative wrapper */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-control mt-4">
            <button className="btn btn-info w-full" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <p className="text-center mt-2 text-sm">
            New user?{" "}
            <Link to="/signup" className="link link-primary">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
