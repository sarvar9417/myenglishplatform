import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const MODULES = [
  {
    id: "verbs",
    icon: "📝",
    title: "Fe'llar Masteri",
    desc: "Noto'g'ri fe'llarning 3 shaklini o'rganing",
    color: "#6366f1",
    bg: "#eef2ff",
    route: "/play/verbs",
    badge: "Asosiy",
  },
  // So'z Boyligi, Grammar, Kunlik Test vaqtincha o'chirilgan
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-screen">
      <div className="dashboard-top-bar">
        <div className="dashboard-title">
          <span className="dashboard-logo">📚</span>
          <div>
            <h1>English Platform</h1>
            <p className="dashboard-subtitle">Ingliz tilini o'rganish platformasi</p>
          </div>
        </div>
        <Profile />
      </div>

      <div className="dashboard-modules">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            className="module-card"
            onClick={() => navigate(mod.route)}
            style={{ "--mod-color": mod.color, "--mod-bg": mod.bg }}
          >
            <div className="module-card-icon" style={{ background: mod.bg }}>
              {mod.icon}
            </div>
            <div className="module-card-info">
              <div className="module-card-header">
                <h3>{mod.title}</h3>
                <span className="module-card-badge" style={{ background: mod.bg, color: mod.color }}>
                  {mod.badge}
                </span>
              </div>
              <p>{mod.desc}</p>
            </div>
            <div className="module-card-arrow">→</div>
          </button>
        ))}
      </div>

      <div className="dashboard-footer">
        <p>💡 Har bir modulni o'zlashtiring va ingliz tilingizni rivojlantiring</p>
      </div>
    </div>
  );
}
