import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Shield, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<UserRole>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup, guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      login(email, password, role);
      toast.success("Welcome back!");
    } else {
      signup(name, email, password, role);
      toast.success("Account created!");
    }
    navigate("/dashboard");
  };

  const handleGuest = () => {
    guestLogin();
    toast.success("Logged in as Guest");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/3 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mx-auto mb-4">
            <Scale className="w-7 h-7 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary-foreground">NYAY Veda</h1>
          <p className="text-sm text-primary-foreground/50 mt-1">Justice, Transparency, Trust</p>
        </div>

        <div className="bg-card/10 backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-8">
          {/* Mode Toggle */}
          <div className="flex rounded-lg bg-primary-foreground/5 p-1 mb-6">
            <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "login" ? "gradient-gold text-accent-foreground" : "text-primary-foreground/60"}`}>
              Sign In
            </button>
            <button onClick={() => setMode("signup")} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "signup" ? "gradient-gold text-accent-foreground" : "text-primary-foreground/60"}`}>
              Sign Up
            </button>
          </div>

          {/* Role Selection */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => setRole("admin")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${role === "admin" ? "border-gold bg-gold/10 text-gold" : "border-primary-foreground/10 text-primary-foreground/50 hover:border-primary-foreground/20"}`}>
              <Shield className="w-4 h-4" /> Admin
            </button>
            <button onClick={() => setRole("guest")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${role === "guest" ? "border-gold bg-gold/10 text-gold" : "border-primary-foreground/10 text-primary-foreground/50 hover:border-primary-foreground/20"}`}>
              <User className="w-4 h-4" /> Guest
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="text-xs text-primary-foreground/50 mb-1 block">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" className="w-full px-4 py-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs text-primary-foreground/50 mb-1 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
            </div>

            <div>
              <label className="text-xs text-primary-foreground/50 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:border-gold/50 transition-colors pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg gradient-gold text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-primary-foreground/10" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs text-primary-foreground/40 bg-transparent">or</span></div>
          </div>

          <button onClick={handleGuest} className="w-full py-3 rounded-lg border border-primary-foreground/10 text-primary-foreground/70 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-foreground/5 transition-colors">
            <Sparkles className="w-4 h-4" /> Continue as Guest
          </button>
        </div>

        <p className="text-xs text-primary-foreground/30 text-center mt-6">Demo: Use any email & password to sign in</p>
      </motion.div>
    </div>
  );
}
