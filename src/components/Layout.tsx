import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Scale, Users, Menu, X, FileSearch, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/my-cases", label: "My Cases", icon: FileSearch },
  { path: "/cases", label: "All Cases", icon: Briefcase, admin: true },
  { path: "/judges", label: "Judges", icon: Scale },
  { path: "/allocate", label: "Allocate", icon: Users, admin: true },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredNav = navItems.filter((item) => !item.admin || user?.role === "admin");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col gradient-navy text-primary-foreground flex-shrink-0">
        <div className="p-6 border-b border-navy-light/30">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight text-primary-foreground">NYAY Veda</h1>
              <p className="text-xs text-primary-foreground/60">Case Management</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="px-6 py-4 border-b border-navy-light/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-xs font-bold text-accent-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">{user.name}</p>
                <p className="text-xs text-primary-foreground/50 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {filteredNav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  active ? "bg-sidebar-accent text-gold" : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-light/30">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50 transition-all w-full">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 gradient-navy text-primary-foreground p-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
            <Scale className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-primary-foreground">NYAY Veda</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -300 }} className="md:hidden fixed inset-0 z-40 gradient-navy text-primary-foreground pt-20 p-4">
            <nav className="space-y-1">
              {filteredNav.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${active ? "bg-sidebar-accent text-gold" : "text-primary-foreground/70"}`}>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/70 w-full mt-4">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 mt-16 md:mt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
