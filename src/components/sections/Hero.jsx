import { motion } from "framer-motion";
import { ChevronDown, Scissors } from "lucide-react";
import ItalianFlag from "../ui/ItalianFlag";

export default function Hero() {
  const scrollToGallery = () => {
    const el = document.querySelector("#galeria");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80"
          alt="Barbería"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#009246] via-white to-[#ce2b37] opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Flag */}
          <ItalianFlag className="mb-8 w-32" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6"
          >
            <Scissors className="w-12 h-12 text-amber-500 rotate-[-45deg]" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-white mb-4">
            TESTAROSSA
          </h1>

          {/* Subtitle */}
          <p className="text-amber-500/90 text-sm md:text-base tracking-[0.4em] uppercase mb-8">
            Peluquería & Barbería
          </p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            Experiencia premium en cortes y afeitados con el estilo y la precisión
            de la tradición italiana
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToContact}
              className="group px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold tracking-widest rounded hover:from-amber-500 hover:to-amber-400 transition-all duration-300 uppercase flex items-center justify-center gap-3"
            >
              Reservar cita
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button
              onClick={scrollToGallery}
              className="px-10 py-4 border border-white/30 text-white font-medium tracking-widest rounded hover:bg-white/10 hover:border-white/50 transition-all duration-300 uppercase"
            >
              Ver trabajos
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={scrollToGallery}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
