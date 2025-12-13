import { Link } from "react-router-dom";
import { Mail, Phone, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { SacredGeometry } from "./SacredGeometry";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const quickLinks = [
  { name: "Serviços", path: "/services" },
  { name: "Oráculo", path: "/oracle" },
  { name: "Blog", path: "/blog" },
  { name: "Sobre", path: "/about" },
  { name: "Contato", path: "/contact" },
];

export const Footer = () => {
  const { getWhatsAppUrl, getEmailUrl, getInstagramUrl } = useSiteSettings();

  return (
    <footer className="relative bg-card border-t border-border/50">
      <SacredGeometry variant="background" className="opacity-30" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Caminho Celestial" className="h-20 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Orientação através do Tarot, Astrologia e a sabedoria sagrada da Árvore da Vida.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-display text-xl text-foreground mb-6">Links Rápidos</h3>
            <nav className="space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block text-muted-foreground hover:text-primary transition-colors text-lg"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-display text-xl text-foreground mb-6">Conecte-se</h3>
            <div className="space-y-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-3 text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                <Phone size={20} />
                <span>WhatsApp</span>
              </a>
              <a
                href={getEmailUrl()}
                className="flex items-center justify-center md:justify-end gap-3 text-muted-foreground hover:text-secondary transition-colors text-lg"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a
                href={getInstagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-3 text-muted-foreground hover:text-primary transition-colors text-lg"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <SacredGeometry variant="divider" className="my-8" />

        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Caminho Celestial Terapia Holística. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
