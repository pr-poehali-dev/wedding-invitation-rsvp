import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "hero", label: "Главная" },
  { id: "venue", label: "Место" },
  { id: "schedule", label: "Программа" },
  { id: "gallery", label: "Галерея" },
  { id: "rsvp", label: "Подтверждение" },
];



const SCHEDULE = [
  { time: "15:00", title: "Сбор гостей", desc: "Встреча на территории усадьбы, welcome-напитки", icon: "Users" },
  { time: "16:00", title: "Церемония", desc: "Торжественная регистрация брака в саду", icon: "Heart" },
  { time: "17:00", title: "Фуршет", desc: "Угощения, живая музыка, фотосессия", icon: "Music" },
  { time: "18:30", title: "Банкет", desc: "Праздничный ужин в главном зале", icon: "Utensils" },
  { time: "20:00", title: "Торт и танцы", desc: "Первый танец молодожёнов, дискотека", icon: "Cake" },
  { time: "23:00", title: "Финал", desc: "Фейерверк и прощальный бокал", icon: "Sparkles" },
];

const GALLERY_ITEMS = [
  { bg: "from-rose-900 to-pink-800", label: "Помолвка" },
  { bg: "from-amber-800 to-yellow-700", label: "Тбилиси 2019" },
  { bg: "from-purple-900 to-indigo-800", label: "Новый год" },
  { bg: "from-emerald-800 to-teal-700", label: "Горы" },
  { bg: "from-red-900 to-rose-800", label: "Первое свидание" },
  { bg: "from-blue-900 to-cyan-800", label: "Море" },
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

          <h1 className="font-display text-7xl md:text-9xl font-bold animate-fade-up leading-none tracking-tight text-gray-50 my-2 mx-0 px-0 py-12">Артем
&
Екатерина</h1>

          <p className="font-display text-2xl md:text-3xl italic mb-10 animate-fade-up text-[#ffffff]" style={{ animationDelay: "0.2s" }}>12 июня 2026 года</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => scrollTo("rsvp")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C2185B] to-[#D4A843] text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-pulse-glow"
            >
              Подтвердить участие
            </button>
            <button
              onClick={() => scrollTo("couple")}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              Наша история
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
            <span className="text-[#D4A843] text-sm font-medium tracking-[0.3em] uppercase">Место торжества</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mt-3">
              Усадьба <span className="animate-shimmer">"Берёзовая"</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "MapPin", title: "Адрес", value: "Подмосковье, Рублёво-Успенское ш., 42 км" },
              { icon: "Calendar", title: "Дата", value: "19 июля 2025, суббота" },
              { icon: "Clock", title: "Начало", value: "15:00 — сбор гостей" },
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

          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden h-72 bg-gradient-to-br from-[#2D0A1E] to-[#1A0A0F] border border-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Icon name="Map" size={200} className="text-white" />
              </div>
              <div className="text-center z-10">
                <div className="text-5xl mb-4">📍</div>
                <div className="text-white font-semibold mb-2">Усадьба «Берёзовая»</div>
                <div className="text-white/50 text-sm mb-5">Рублёво-Успенское ш., 42 км от МКАД</div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C2185B] to-[#D4A843] text-white text-sm font-medium hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
                  <Icon name="Navigation" size={16} />
                  Открыть маршрут
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/50 to-transparent" />
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-[#C2185B] text-sm font-medium tracking-[0.3em] uppercase">День свадьбы</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mt-3">
              Программа <span className="text-gradient">вечера</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C2185B]/20 via-[#D4A843]/60 to-[#C2185B]/20 md:left-1/2 md:-translate-x-0.5" />
            {SCHEDULE.map((item, i) => (
              <AnimatedSection key={i} className="relative flex items-start gap-6 mb-12">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#C2185B] to-[#D4A843] flex items-center justify-center shadow-lg z-10 flex-shrink-0 md:left-1/2 md:-translate-x-1/2">
                  <Icon name={item.icon as "Users"} size={18} className="text-white" />
                </div>
                <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-[calc(50%+3rem)] md:text-right" : "md:pl-[calc(50%+3rem)]"}`}>
                  <div className="font-display text-3xl font-bold text-gray-900 mb-1">{item.time}</div>
                  <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#C2185B] text-sm font-medium tracking-[0.3em] uppercase">Моменты</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mt-3">
              Наша <span className="text-gradient">галерея</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">Здесь скоро появятся свадебные фотографии. А пока — воспоминания о нашем пути</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <AnimatedSection key={i} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <div className={`rounded-2xl bg-gradient-to-br ${item.bg} flex flex-col items-center justify-center group cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-lg overflow-hidden ${i === 0 ? "h-64 md:h-96" : "h-44"}`}>
                  <div className="text-white/20 text-6xl font-display font-bold group-hover:text-white/40 transition-all duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-white/60 text-sm font-medium mt-2 group-hover:text-white/90 transition-all duration-300">
                    {item.label}
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Icon name="ImagePlus" size={20} className="text-white/60" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
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
              Пожалуйста, подтвердите своё участие до <strong className="text-white">1 июля 2025</strong>
            </p>
          </AnimatedSection>

          {rsvpStatus === "sent" ? (
            <AnimatedSection>
              <div className="text-center py-16 px-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="font-display text-3xl font-bold text-white mb-3">Спасибо!</h3>
                <p className="text-white/70">Мы очень рады, что вы будете с нами. Ждём вас 19 июля!</p>
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
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Пожелание молодожёнам</label>
                  <textarea
                    rows={3}
                    placeholder="Напишите что-нибудь тёплое..."
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#D4A843] transition-all resize-none"
                  />
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
        <div className="text-gray-500 text-sm mb-6">19 · 07 · 2025</div>
        <div className="flex justify-center items-center gap-2 text-gray-600 text-xs">
          <span>Сделано с</span>
          <span className="text-[#C2185B]">♥</span>
          <span>для наших близких</span>
        </div>
      </footer>
    </div>
  );
}