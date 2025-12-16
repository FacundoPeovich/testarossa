import ItalianFlag from "../ui/ItalianFlag";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <ItalianFlag className="mb-3 w-20" />
            <span className="text-xl font-bold tracking-[0.2em] text-white">
              TESTAROSSA
            </span>
            <span className="text-[10px] tracking-[0.15em] text-amber-500/70 uppercase">
              Peluquería & Barbería
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Testarossa. Todos los derechos
              reservados.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Diseñado con pasión italiana
            </p>
          </div>
        </div>

        {/* Bottom Italian Flag Line */}
        <div className="mt-10 h-0.5 bg-gradient-to-r from-[#009246] via-white to-[#ce2b37] opacity-30 rounded-full" />
      </div>
    </footer>
  );
}
