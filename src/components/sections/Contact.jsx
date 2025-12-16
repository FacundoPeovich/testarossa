import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Send, ExternalLink } from "lucide-react";
import ItalianFlag from "../ui/ItalianFlag";
import { WHATSAPP_PHONE, INSTAGRAM_URL } from "../../data/contact";

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicación",
    details: [
      "Santos Vega 6972",
      "B1682AIZ Villa Bosch, Provincia de Buenos Aires",
    ],
  },
  {
    icon: Phone,
    title: "Teléfono",
    details: ["011 5881-4417"],
  },
  {
    icon: Clock,
    title: "Horario",
    details: ["10:00–13:00", "16:00–20:30"],
  },
];

function buildWhatsAppUrl({ phone, name, clientPhone, message, service }) {
  const lines = [
    "Hola Testarossa 👋",
    "",
    service ? `Quiero reservar: *${service}*` : "Quiero reservar una cita",
    name ? `Nombre: ${name}` : null,
    clientPhone ? `Teléfono: ${clientPhone}` : null,
    message ? `Mensaje: ${message}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${text}`;
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });

  const waUrl = useMemo(() => {
    return buildWhatsAppUrl({
      phone: WHATSAPP_PHONE,
      name: formState.name.trim(),
      clientPhone: formState.phone.trim(),
      message: formState.message.trim(),
      service: "",
    });
  }, [formState]);

  const handleChange = (e) =>
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // ✅ Google Maps
  const MAPS_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.9134488917516!2d-58.584027899999995!3d-34.581056499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9d05039a779%3A0xb66a717d5c390631!2sTestarossa%20Barber%C3%ADa!5e0!3m2!1ses-419!2sar!4v1765828637305!5m2!1ses-419!2sar";

  const MAPS_OPEN_URL =
    "https://www.google.com/maps/search/?api=1&query=Testarossa%20Barber%C3%ADa%2C%20Santos%20Vega%206972%2C%20Villa%20Bosch%2C%20Buenos%20Aires";

  return (
    <section
      id="contacto"
      className="py-24 md:py-32 bg-gradient-to-b from-black to-zinc-950 relative"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <ItalianFlag className="mx-auto mb-6 w-20" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.15em] text-white mb-4">
            CONTACTO
          </h2>
          <p className="text-gray-500 text-lg tracking-wide max-w-xl mx-auto">
            Reservá tu cita por WhatsApp y te confirmamos en el acto.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Seguinos:</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-amber-500/20 hover:border-amber-500/30 transition-colors"
                aria-label="Instagram Testarossa"
                title="Instagram Testarossa"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-amber-500" />
              </a>

              {/* Link a Maps */}
              <a
                href={MAPS_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Abrir en Google Maps"
                title="Abrir en Google Maps"
              >
                Ver en Maps <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* ✅ Google Maps embed real */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 rounded-lg overflow-hidden border border-white/10 aspect-video bg-zinc-900"
            >
              <iframe
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Testarossa Barbería"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Form → WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-white mb-2">Reservá tu cita</h3>
              <p className="text-gray-500 mb-8">Se abre WhatsApp con tu mensaje listo.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+54 11 0000 0000"
                    required
                    className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Mensaje (opcional)</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Ej: Quiero reservar para hoy a la tarde"
                    rows={4}
                    className="w-full rounded-md px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold tracking-wider py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar por WhatsApp
                </button>

                <p className="text-xs text-white/40 text-center">
                  Al enviar, se abrirá WhatsApp en una nueva pestaña.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
