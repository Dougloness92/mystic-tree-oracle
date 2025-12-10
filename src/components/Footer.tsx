import { Link } from "react-router-dom";
import { Mail, Phone, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { SacredGeometry } from "./SacredGeometry";

export const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border/50">
      <SacredGeometry variant="background" className="opacity-30" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Celestial Path" className="h-20 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Guidance through Tarot, Astrology, and the sacred wisdom of the Tree of Life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-display text-xl text-foreground mb-6">Quick Links</h3>
            <nav className="space-y-3">
              {["Services", "Oracle", "Blog", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors text-lg"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-display text-xl text-foreground mb-6">Connect</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-3 text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                <Phone size={20} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:hello@celestialpath.com"
                className="flex items-center justify-center md:justify-end gap-3 text-muted-foreground hover:text-secondary transition-colors text-lg"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a
                href="https://instagram.com"
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
          © {new Date().getFullYear()} Celestial Path Holistic Therapy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
