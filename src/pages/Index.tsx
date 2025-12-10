import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Star, Moon, Sun, Compass, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OracleModal } from "@/components/OracleModal";
import { ServiceCard } from "@/components/ServiceCard";
import { SacredGeometry } from "@/components/SacredGeometry";
import logo from "@/assets/logo.png";

const services = [
  {
    title: "Orientação com Tarot",
    description: "Descubra insights e clareza através da sabedoria ancestral dos arquétipos do Tarot.",
    icon: Sparkles,
    href: "/services/tarot",
  },
  {
    title: "Leituras de Astrologia",
    description: "Explore seu mapa astral e entenda as influências cósmicas que moldam seu caminho.",
    icon: Star,
    href: "/services/astrology",
  },
  {
    title: "Numerologia Cabalística",
    description: "Descubra os números sagrados que revelam seu propósito de vida e dons espirituais.",
    icon: Compass,
    href: "/services/numerology",
  },
];

const Index = () => {
  const [isOracleOpen, setIsOracleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <SacredGeometry variant="background" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 opacity-20 animate-float">
          <Moon className="w-12 h-12 text-secondary" />
        </div>
        <div className="absolute bottom-1/3 right-10 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
          <Sun className="w-16 h-16 text-secondary" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20 animate-float" style={{ animationDelay: "4s" }}>
          <Star className="w-8 h-8 text-secondary" />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 animate-fade-in">
              <img 
                src={logo} 
                alt="Caminho Celestial Terapia Holística" 
                className="h-48 md:h-64 w-auto mx-auto animate-float"
              />
            </div>
            
            {/* Tagline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Orientação Através do{" "}
              <span className="text-gradient-wine">Tarot</span>,{" "}
              <span className="text-gradient-gold">Astrologia</span> e da{" "}
              <span className="text-accent">Árvore da Vida</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Embarque em uma jornada de autoconhecimento e transformação espiritual 
              com orientação compassiva e fundamentada.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button
                onClick={() => setIsOracleOpen(true)}
                className="btn-mystical bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Receber Orientação
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-lg"
              >
                <Link to="/contact">Agendar Sessão</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-secondary/50 flex justify-center pt-2">
            <div className="w-1 h-2 bg-secondary/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <SacredGeometry variant="divider" className="mb-8" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Bem-vindo, Buscador
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Acredito que cada um de nós carrega uma bússola interior — um conhecimento profundo que nos guia 
              em direção ao nosso caminho mais elevado. Através das artes sagradas do Tarot, Astrologia e da 
              Árvore da Vida Cabalística, ofereço um espelho para sua alma, ajudando você a reconectar-se 
              com sua sabedoria inata e navegar pelos mistérios da vida com maior clareza e propósito.
            </p>
            <SacredGeometry variant="divider" className="mt-8" />
          </div>
        </div>
      </section>

      {/* Oracle Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <SacredGeometry variant="background" className="opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-8">
              <Layers className="w-10 h-10 text-secondary" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Oráculo da Árvore da Vida
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              As dez Sephiroth da Árvore da Vida Cabalística guardam sabedoria ancestral, cada uma representando 
              um aspecto diferente da consciência divina. Clique abaixo para receber uma mensagem 
              do Oráculo — uma luz guia para sua jornada.
            </p>
            
            <Button
              onClick={() => setIsOracleOpen(true)}
              className="btn-mystical bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Receba Sua Mensagem
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Serviços Sagrados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada sessão é um espaço sagrado para exploração, cura e transformação.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-secondary/50 text-foreground hover:bg-secondary/10 px-8 py-6 text-lg"
            >
              <Link to="/services">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial/Quote Section */}
      <section className="py-24 relative overflow-hidden">
        <SacredGeometry variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
              "Assim como em cima, assim embaixo; assim como dentro, assim fora. As estrelas espelham nossa alma, 
              e a alma reflete o cosmos."
            </p>
            <footer className="text-secondary text-lg">
              — Sabedoria Hermética
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
      
      {/* Oracle Modal */}
      <OracleModal isOpen={isOracleOpen} onClose={() => setIsOracleOpen(false)} />
    </div>
  );
};

export default Index;
