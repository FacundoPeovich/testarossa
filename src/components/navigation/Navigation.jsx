// src/components/navigation/Navigation.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ItalianFlag from "../ui/ItalianFlag";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Link activo
  const [activeHref, setActiveHref] = useState("#inicio");

  // ✅ WhatsApp config (reserva general)
  const waPhone = "5491158814417";
  const waGeneralMsg =
    "Hola! Quiero hacer una reserva general en Testarossa. ¿Me decís disponibilidad?";

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const navLinks = useMemo(
    () => [
      { name: "Inicio", href: "#inicio" },
      { name: "Servicios", href: "#galeria" },
      { name: "Nosotros", href: "#bio" },
      { name: "Contacto", href: "#contacto" },
    ],
    []
  );

  // ✅ Scroll header blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Prevenir scroll del body cuando menú mobile está abierto
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // ✅ Cerrar menú con ESC (mobile)
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  // ✅ Link activo (scroll spy)
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActiveHref(`#${visible.target.id}`);
      },
      {
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

  // ✅ Fix mobile: cerrar menú → esperar animación → scrollear
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (!el) return;

    const shouldDelay = isMobileMenuOpen;

    setIsMobileMenuOpen(false);

    const doScroll = () =>
      el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (shouldDelay) setTimeout(doScroll, 150);
    else doScroll();
  };

  // ✅ Swipe para cerrar (deslizar hacia arriba)
  const touchStartY = useRef(null);

  const onTouchStart = (e) => {
    touchStartY.current = e.touches?.[0]?.clientY ?? null;
  };

  const onTouchEnd = (e) => {
    const startY = touchStartY.current;
    const endY = e.changedTouches?.[0]?.clientY ?? null;
    touchStartY.current = null;

    if (startY == null || endY == null) return;

    const dy = startY - endY; // swipe up => positivo
    if (dy > 60) setIsMobileMenuOpen(false);
  };

  const linkClass = (href) =>
    `text-sm tracking-widest uppercase transition-colors ${
      activeHref === href ? "text-amber-500" : "text-gray-300 hover:text-amber-500"
    }`;

  const mobileLinkClass = (href) =>
    `block w-full text-left py-3 uppercase tracking-widest transition-colors ${
      activeHref === href ? "text-amber-500" : "text-white/90 hover:text-amber-500"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col">
          <ItalianFlag className="mb-2" />
          <span className="text-2xl font-bold tracking-[0.3em] text-white">
            TESTAROSSA
          </span>
          <span className="text-[10px] tracking-[0.2em] text-amber-500/80 uppercase">
            Peluquería & Barbería
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={linkClass(link.href)}
            >
              {link.name}
            </button>
          ))}

          <button
            type="button"
            onClick={() => openWhatsApp(waGeneralMsg)}
            className="px-6 py-2 bg-amber-500 text-black font-semibold rounded uppercase"
          >
            Reservar
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile (Backdrop + Panel) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop (tap afuera cierra) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden fixed left-0 right-0 top-[72px] z-50 bg-black/95 px-6 py-6 border-t border-white/10"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={(e) => e.stopPropagation()} // evita cerrar si tocás adentro
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={mobileLinkClass(link.href)}
                >
                  {link.name}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWhatsApp(waGeneralMsg);
                }}
                className="mt-6 w-full px-6 py-3 bg-amber-500 text-black font-semibold rounded uppercase"
              >
                Reservar
              </button>

              <p className="mt-3 text-xs text-white/30">
                Tip: tocá afuera, presioná ESC o deslizá hacia arriba para cerrar
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
