import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "guest";

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  guestLogin: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS = [
  { name: "Admin User", email: "admin@nyayveda.com", password: "admin123", role: "admin" as UserRole },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("nyayveda_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string, role: UserRole): boolean => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const u = { name: found.name, email: found.email, role: found.role };
      setUser(u);
      localStorage.setItem("nyayveda_user", JSON.stringify(u));
      return true;
    }
    // For demo, accept any email/password
    const u = { name: email.split("@")[0], email, role };
    setUser(u);
    localStorage.setItem("nyayveda_user", JSON.stringify(u));
    return true;
  };

  const signup = (name: string, email: string, _password: string, role: UserRole): boolean => {
    const u = { name, email, role };
    setUser(u);
    localStorage.setItem("nyayveda_user", JSON.stringify(u));
    return true;
  };

  const guestLogin = () => {
    const u = { name: "Guest User", email: "guest@nyayveda.com", role: "guest" as UserRole };
    setUser(u);
    localStorage.setItem("nyayveda_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nyayveda_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
