import { Link } from "react-router-dom";
import { Sparkles, Star, Compass, Droplets, Layers } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { SacredGeometry } from "@/components/SacredGeometry";

const services = [
  {
    title: "Orientação com Tarot",
    description: "Exploração arquetípica profunda usando o Tarot para iluminar sua situação atual, desafios e oportunidades de crescimento.",
    icon: Sparkles,
    href: "/services/tarot",
  },
  {
    title: "Leituras de Astrologia",
    description: "Análise completa do mapa astral revelando seu projeto cósmico, temas de vida e influências planetárias atuais.",
    icon: Star,
    href: "/services/astrology",
  },
  {
    title: "Numerologia Cabalística",
    description: "Descubra seu número do caminho de vida, ciclos de anos pessoais e a matemática sagrada subjacente à sua jornada.",
    icon: Compass,
    href: "/services/numerology",
  },
  {
    title: "Radiestesia e Limpeza Energética",
    description: "Limpeza de espaços, equilíbrio energético e trabalho com radiestesia para harmonizar seu ambiente e campo de energia pessoal.",
    icon: Droplets,
    href: "/services/dowsing",
  },
  {
    title: "Sessões Combinadas",
    description: "Sessões integrativas combinando múltiplas modalidades para uma experiência de leitura abrangente e multidimensional.",
    icon: Layers,
    href: "/services/combined",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SacredGeometry variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Serviços Sagrados
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cada sessão é um recipiente sagrado para exploração, cura e transformação. 
              Escolha a modalidade que chama você, ou explore uma abordagem combinada.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Session Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <SacredGeometry variant="divider" className="mb-8" />
            <h2 className="font-display text-3xl text-foreground mb-6">
              O Que Esperar
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              As sessões estão disponíveis online via videochamada ou presencialmente. Cada sessão começa 
              com uma meditação de ancoragem para criar um espaço sagrado. Você pode trazer 
              perguntas específicas ou simplesmente chegar aberto para receber orientação.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Todas as sessões são confidenciais. Honro sua jornada com respeito, compaixão 
              e compromisso com seu bem maior.
            </p>
            <SacredGeometry variant="divider" className="mt-8" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
