import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import ItalianFlag from "../ui/ItalianFlag";
import { galleryData } from "../../data/gallery";
import { WHATSAPP_PHONE } from "../../data/contact";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestedTime, setSuggestedTime] = useState("");

  // ✅ Cerrar lightbox con tecla ESC
  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  // ✅ Reset horario al cambiar / cerrar
  useEffect(() => {
    if (!selectedImage) setSuggestedTime("");
  }, [selectedImage]);

  const whatsappLink = useMemo(() => {
    if (!selectedImage) return "#";

    const horario = suggestedTime?.trim()
      ? suggestedTime.trim()
      : "Sin horario sugerido";

    const text =
      `Hola Testarossa 👋\n\n` +
      `Quiero este servicio: *${selectedImage.title}*\n` +
      `Horario sugerido: *${horario}*\n\n` +
      `Mi nombre es: `;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }, [selectedImage, suggestedTime]);

  return (
    <section
      id="galeria"
      className="py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <ItalianFlag className="mx-auto mb-6 w-20" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.15em] text-white mb-4">
            SERVICIOS
          </h2>
          <p className="text-gray-500 text-lg tracking-wide max-w-xl mx-auto">
            Servicios profesionales pensados para potenciar tu estilo
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(item)}
            >
              <div
                className={`aspect-square ${
                  index === 0 ? "md:aspect-auto md:h-full" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt ?? item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 md:p-6">
                <div>
                  <p className="text-white font-semibold tracking-wide">
                    {item.title}
                  </p>
                  {item.category && (
                    <p className="text-amber-500/80 text-sm">{item.category}</p>
                  )}
                </div>
                <ZoomIn className="text-white/70 w-5 h-5" />
              </div>

              {/* Border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009246] via-white to-[#ce2b37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt ?? selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
                <p className="text-white font-semibold text-lg">
                  {selectedImage.title}
                </p>

                {selectedImage.category && (
                  <p className="text-amber-500/80 mb-4">
                    {selectedImage.category}
                  </p>
                )}

                {/* ✅ Horario sugerido (opcional) */}
                <div className="mb-4 max-w-md">
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                    Horario sugerido (opcional)
                  </label>
                  <input
                    value={suggestedTime}
                    onChange={(e) => setSuggestedTime(e.target.value)}
                    placeholder="Ej: Hoy 18:30 / Mañana 10:00 / Sábado por la tarde"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/40"
                  />
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold tracking-wider hover:from-amber-500 hover:to-amber-400 transition-all"
                >
                  Quiero este servicio
                </a>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={28} />
              </button>

              <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/40">
                Presioná ESC para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
