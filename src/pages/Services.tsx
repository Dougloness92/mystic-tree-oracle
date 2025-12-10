import { Link } from "react-router-dom";
import { Sparkles, Star, Compass, Droplets, Layers } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { SacredGeometry } from "@/components/SacredGeometry";

const services = [
  {
    title: "Tarot Guidance",
    description: "Deep archetypal exploration using the Tarot to illuminate your current situation, challenges, and opportunities for growth.",
    icon: Sparkles,
    href: "/services/tarot",
  },
  {
    title: "Astrology Readings",
    description: "Comprehensive birth chart analysis revealing your cosmic blueprint, life themes, and current planetary influences.",
    icon: Star,
    href: "/services/astrology",
  },
  {
    title: "Kabbalistic Numerology",
    description: "Discover your life path number, personal year cycles, and the sacred mathematics underlying your journey.",
    icon: Compass,
    href: "/services/numerology",
  },
  {
    title: "Dowsing & Energetic Cleansing",
    description: "Space clearing, energy balancing, and dowsing work to harmonize your environment and personal energy field.",
    icon: Droplets,
    href: "/services/dowsing",
  },
  {
    title: "Combined Sessions",
    description: "Integrative sessions blending multiple modalities for a comprehensive, multi-dimensional reading experience.",
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
              Sacred Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Each session is a sacred container for exploration, healing, and transformation. 
              Choose the modality that calls to you, or explore a combined approach.
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
              What to Expect
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Sessions are available online via video call or in person. Each session begins 
              with a grounding meditation to create sacred space. You're welcome to bring 
              specific questions or simply arrive open to receive guidance.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All sessions are confidential. I honor your journey with respect, compassion, 
              and a commitment to your highest good.
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
