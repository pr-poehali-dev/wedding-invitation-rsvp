import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "hero", label: "Главная" },
  { id: "venue", label: "Место" },
  { id: "rsvp", label: "Подтверждение" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(({ id }) => document.getElementById(id));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top <= 80);
      if (current) setActiveNav(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-gradient">А & Е</span>
          <div className="hidden md:flex gap-1">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeNav === id
                    ? "bg-gradient-to-r from-[#C2185B] to-[#D4A843] text-white shadow-md"
                    : "text-gray-600 hover:text-[#C2185B]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#C2185B]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-[#C2185B] transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-wedding noise-bg"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C2185B]/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D4A843]/20 blur-[100px] animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E91E8C]/10 blur-[150px]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="text-[#D4A843] text-sm">✦</span>
            <span className="text-white/80 text-xs font-medium tracking-[0.2em] uppercase">Приглашение на свадьбу</span>
            <span className="text-[#D4A843] text-sm">✦</span>
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-bold text-white animate-fade-up leading-none tracking-tight mb-4">
            Артём
            <span className="text-[#D4A843]"> & </span>
            Екатерина
          </h1>

          <p className="font-display text-2xl md:text-3xl text-white/70 italic mb-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            12 июня 2026 года
          </p>
          <p className="font-display text-xl md:text-2xl text-[#D4A843]/90 italic mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            Начало в 11:20
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => scrollTo("rsvp")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C2185B] to-[#D4A843] text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-pulse-glow"
            >
              Подтвердить участие
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-float">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="py-28 px-6 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C2185B]/50 to-transparent" />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C2185B 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#D4A843] text-sm font-medium tracking-[0.3em] uppercase">место регистрации</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mt-3">
              <span className="animate-shimmer">Дом Дружбы народов</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "MapPin", title: "Адрес", value: "г. Ижевск, ул. Орджоникидзе, 33А" },
              { icon: "Calendar", title: "Дата", value: "12 июня 2026, пятница" },
              { icon: "Clock", title: "Начало", value: "11:00 — сбор гостей" },
            ].map(({ icon, title, value }) => (
              <AnimatedSection key={title}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C2185B]/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C2185B] to-[#D4A843] flex items-center justify-center mb-4">
                    <Icon name={icon as "MapPin"} size={22} className="text-white" />
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mb-1">{title}</div>
                  <div className="text-white font-semibold text-sm leading-relaxed">{value}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/50 to-transparent" />
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-28 px-6 bg-gradient-wedding noise-bg relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#C2185B]/15 blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#D4A843]/15 blur-[60px]" />
        <div className="max-w-xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[#D4A843] text-sm font-medium tracking-[0.3em] uppercase">Ваше присутствие</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3">
              Вы придёте?
            </h2>
            <p className="text-white/60 mt-4 leading-relaxed">
              Пожалуйста, подтвердите своё участие до <strong className="text-white">26 апреля 2026</strong>
            </p>
          </AnimatedSection>

          {rsvpStatus === "sent" ? (
            <AnimatedSection>
              <div className="text-center py-16 px-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="font-display text-3xl font-bold text-white mb-3">Спасибо!</h3>
                <p className="text-white/70">Мы очень рады, что вы будете с нами. Ждём вас 12 июня!</p>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm space-y-5">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Ваше имя</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#D4A843] transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Количество гостей</label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4A843] transition-all appearance-none"
                  >
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n} value={n} className="bg-gray-900">{n} {n === "1" ? "гость" : "гостя"}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => { if (rsvpName.trim()) setRsvpStatus("sent"); }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#D4A843] text-white font-semibold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Подтвердить участие ✦
                </button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-gray-950 text-center">
        <div className="font-display text-4xl font-bold text-gradient mb-3">А & Е</div>
        <div className="text-gray-500 text-sm">12 · 06 · 2026</div>
      </footer>
    </div>
  );
}