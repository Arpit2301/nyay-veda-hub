import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Shield, Eye, ArrowRight, Briefcase, Users, BarChart3, Clock, CheckCircle, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Briefcase, title: "Case Management", desc: "Organize, track, and manage all legal cases in a centralized digital repository." },
  { icon: Users, title: "Judge Allocation", desc: "Smart allocation based on specialization, availability, and caseload balance." },
  { icon: Eye, title: "Full Transparency", desc: "Track every step of your case — from filing to verdict — in real time." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Comprehensive dashboards with insights into case trends and performance." },
  { icon: Clock, title: "Status Tracking", desc: "Real-time updates on hearing dates, case progress, and milestones." },
  { icon: Shield, title: "Secure & Reliable", desc: "Role-based access ensures data privacy and secure case handling." },
];

const stats = [
  { value: "10,000+", label: "Cases Managed" },
  { value: "500+", label: "Judges Connected" },
  { value: "98%", label: "Transparency Score" },
  { value: "24/7", label: "System Uptime" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Justice Hall" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        </div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-primary-foreground">NYAY Veda</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="px-5 py-2.5 rounded-lg border border-primary-foreground/20 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/5 transition-colors">
              Sign In
            </Link>
            <Link to="/auth" className="px-5 py-2.5 rounded-lg gradient-gold text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 md:px-12 pt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" /> India's Premier Legal Case Management
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Justice Made <span className="text-gradient-gold">Transparent</span> & Accessible
            </h1>
            <p className="text-lg text-primary-foreground/60 mt-6 leading-relaxed max-w-xl">
              NYAY Veda empowers citizens, lawyers, and administrators with a unified platform for managing, tracking, and ensuring transparency in every legal proceeding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => navigate("/auth")} className="px-8 py-4 rounded-xl gradient-gold text-accent-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-base">
                Start Managing Cases <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => { navigate("/auth"); }} className="px-8 py-4 rounded-xl border border-primary-foreground/20 text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary-foreground/5 transition-colors text-base">
                <Eye className="w-5 h-5" /> Guest Preview
              </button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {stats.map((s, i) => (
              <div key={i} className="bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 rounded-xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">{s.value}</p>
                <p className="text-xs text-primary-foreground/50 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">Features</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
                Everything You Need for <span className="text-gradient-gold">Legal Excellence</span>
              </h2>
              <p className="text-muted-foreground mt-4">A comprehensive platform designed to bring order, transparency, and efficiency to the legal process.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-card border rounded-2xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-24 gradient-navy">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Your Case, <span className="text-gradient-gold">Your Right to Know</span>
            </h2>
            <p className="text-primary-foreground/50 mt-4 text-lg">Every citizen deserves to know the status of their case. NYAY Veda makes the entire judicial process transparent — from filing to final verdict.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              {[
                { step: "01", title: "File Case", desc: "Register your case digitally" },
                { step: "02", title: "Track Progress", desc: "Real-time status updates" },
                { step: "03", title: "Get Verdict", desc: "Transparent final outcome" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex items-center gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-5 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-lg font-display font-bold text-accent-foreground flex-shrink-0">{s.step}</div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-primary-foreground">{s.title}</p>
                    <p className="text-xs text-primary-foreground/50">{s.desc}</p>
                  </div>
                  {i < 2 && <ArrowRight className="w-5 h-5 text-gold/40 hidden sm:block ml-2" />}
                </motion.div>
              ))}
            </div>

            <button onClick={() => navigate("/auth")} className="mt-12 px-8 py-4 rounded-xl gradient-gold text-accent-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              <CheckCircle className="w-5 h-5" /> Track Your Case Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Scale className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">NYAY Veda</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 NYAY Veda. Empowering Justice Through Technology.</p>
        </div>
      </footer>
    </div>
  );
}
