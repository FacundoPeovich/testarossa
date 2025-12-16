// src/components/navigation/Navigation.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ItalianFlag from "../ui/ItalianFlag";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ WhatsApp config (reserva general)
  const waPhone = "5491158814417"; // AR: +54 9 + número (sin +, sin espacios)
  const waGeneralMsg =
    "Hola! Quiero hacer una reserva general en Testarossa. ¿Me decís disponibilidad?";

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#galeria" },
    { name: "Nosotros", href: "#bio" },
    { name: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md py-3"
          : "bg-transparent py-6"
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
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm tracking-widest text-gray-300 hover:text-amber-500 uppercase"
            >
              {link.name}
            </button>
          ))}

          {/* ✅ Reservar -> WhatsApp */}
          <button
            onClick={() => openWhatsApp(waGeneralMsg)}
            className="px-6 py-2 bg-amber-500 text-black font-semibold rounded uppercase"
          >
            Reservar
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black px-6 py-6 border-t border-white/10"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-white py-2 uppercase"
              >
                {link.name}
              </button>
            ))}

            {/* ✅ Tip aplicado: botón Reservar en mobile también a WhatsApp */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWhatsApp(waGeneralMsg);
              }}
              className="mt-5 w-full px-6 py-3 bg-amber-500 text-black font-semibold rounded uppercase"
            >
              Reservar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
