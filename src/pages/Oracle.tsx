import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OracleModal } from "@/components/OracleModal";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Oracle = () => {
  const [isOracleOpen, setIsOracleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden">
        <SacredGeometry variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10 mb-8 animate-float">
              <Sparkles className="w-12 h-12 text-secondary" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Oracle of the Tree of Life
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              The Kabbalistic Tree of Life is a map of consciousness, depicting the journey 
              of divine energy from source to manifestation. Its ten Sephiroth represent 
              different aspects of existence—from pure spirit to embodied matter.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              This oracle draws from the wisdom of the Sephiroth to offer you guidance 
              and reflection. Take a moment to center yourself, then receive your message 
              from the Tree.
            </p>
            
            <Button
              onClick={() => setIsOracleOpen(true)}
              className="btn-mystical bg-secondary hover:bg-secondary/90 text-secondary-foreground px-10 py-6 text-xl"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Receive Guidance
            </Button>
          </div>
        </div>
      </section>

      {/* About the Tree */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SacredGeometry variant="divider" className="mb-8" />
            
            <h2 className="font-display text-3xl text-foreground text-center mb-8">
              The Ten Sephiroth
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Kether (Crown)", desc: "Divine will, pure consciousness" },
                { name: "Chokmah (Wisdom)", desc: "Primordial masculine, creative force" },
                { name: "Binah (Understanding)", desc: "Primordial feminine, receptive form" },
                { name: "Chesed (Mercy)", desc: "Loving-kindness, expansion" },
                { name: "Geburah (Strength)", desc: "Discipline, boundaries, power" },
                { name: "Tiphareth (Beauty)", desc: "Harmony, heart center, balance" },
                { name: "Netzach (Victory)", desc: "Emotion, desire, nature" },
                { name: "Hod (Splendor)", desc: "Intellect, communication, thought" },
                { name: "Yesod (Foundation)", desc: "Subconscious, dreams, connection" },
                { name: "Malkuth (Kingdom)", desc: "Physical reality, manifestation" },
              ].map((sephirah) => (
                <div key={sephirah.name} className="p-4 rounded-lg bg-background border border-border/50">
                  <h3 className="font-display text-lg text-foreground mb-1">{sephirah.name}</h3>
                  <p className="text-muted-foreground">{sephirah.desc}</p>
                </div>
              ))}
            </div>
            
            <SacredGeometry variant="divider" className="mt-8" />
          </div>
        </div>
      </section>

      <Footer />
      
      <OracleModal isOpen={isOracleOpen} onClose={() => setIsOracleOpen(false)} />
    </div>
  );
};

export default Oracle;
