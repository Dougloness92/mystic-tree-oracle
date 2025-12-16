import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/about" },
  { name: "Serviços", path: "/services" },
  { name: "Oráculo", path: "/oracle" },
  { name: "Blog", path: "/blog" },
  { name: "Contato", path: "/contact" },
];

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Caminho Celestial" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 text-lg tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu - Gentle Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors duration-500"
                aria-label="Abrir menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] bg-background/95 backdrop-blur-xl border-l border-border/30 shadow-lg shadow-black/5"
            >
              <nav className="flex flex-col mt-12 px-2">
                {navLinks.map((link, index) => (
                  <SheetClose asChild key={link.path}>
                    <Link
                      to={link.path}
                      className="py-3 px-4 text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-500 ease-out text-base font-light tracking-wide"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              
              {/* Subtle decorative element */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-20">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
