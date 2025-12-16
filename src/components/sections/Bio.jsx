import { motion } from "framer-motion";
import { Award, Clock, Star, Users } from "lucide-react";
import ItalianFlag from "../ui/ItalianFlag";

const stats = [
  { icon: Clock, value: "10+", label: "Años de experiencia" },
  { icon: Users, value: "5000+", label: "Clientes satisfechos" },
  { icon: Star, value: "4.8", label: "Valoración media" },
  { icon: Award, value: "15+", label: "Premios ganados" },
];

export default function Bio() {
  return (
    <section
      id="bio"
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80"
                  alt="Barbero profesional"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-500/30 rounded-lg -z-0" />

              {/* Flag accent */}
              <div className="absolute -left-4 top-1/4 w-1 h-32 overflow-hidden flex flex-col rounded-full">
                <div className="flex-1 bg-[#009246]" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-[#ce2b37]" />
              </div>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-6 -right-6 md:right-8 bg-gradient-to-br from-amber-600 to-amber-500 text-black p-6 rounded-lg shadow-2xl z-20"
            >
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm font-medium uppercase tracking-wider">
                Años
              </p>
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <ItalianFlag className="mb-6 w-16" />

            <h2 className="text-4xl md:text-5xl font-bold tracking-[0.1em] text-white mb-6">
              NUESTRA HISTORIA
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p className="text-lg">
                <span className="text-amber-500 font-semibold">
                  Testarossa
                </span>{" "}
                nace de la pasión por el arte del barbero tradicional italiano,
                fusionado con las técnicas más modernas del sector.
              </p>
              <p>
                Con más de una década de experiencia, nos hemos convertido en
                referente de excelencia en cortes masculinos, afeitados clásicos
                y tratamientos de barba.
              </p>
              <p>
                Nuestro compromiso es simple: ofrecer el mejor servicio con la
                máxima atención al detalle. Porque en Testarossa, cada corte es
                una obra de arte.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-amber-500/30 transition-colors"
                >
                  <stat.icon className="w-6 h-6 text-amber-500 mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
