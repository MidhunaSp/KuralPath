import { Outlet, Link, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, User, Bookmark, Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const navItems = [
  { path: "/", label: "குறள்", sublabel: "Generate", icon: BookOpen },
  { path: "/dashboard", label: "முன்னேற்றம்", sublabel: "Dashboard", icon: LayoutDashboard },
  { path: "/bookmarks", label: "புத்தகக்குறி", sublabel: "Bookmarks", icon: Bookmark },
  { path: "/profile", label: "சுயவிவரம்", sublabel: "Profile", icon: User },
];

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background font-body">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-tamil font-bold text-sm">கு</span>
          </div>
          <span className="font-tamil font-semibold text-foreground">திருக்குறள்</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  <div>
                    <div className="font-tamil font-medium text-sm">{item.label}</div>
                    <div className="text-xs opacity-70">{item.sublabel}</div>
                  </div>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all mt-4"
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-border bg-card/50 backdrop-blur-sm p-6 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-tamil font-bold text-lg">கு</span>
          </div>
          <div>
            <h1 className="font-tamil font-bold text-foreground text-lg leading-tight">திருக்குறள்</h1>
            <p className="text-xs text-muted-foreground">Thirukkural</p>
          </div>
        </Link>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                <div>
                  <div className="font-tamil font-medium text-sm">{item.label}</div>
                  <div className="text-[11px] opacity-70">{item.sublabel}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}