import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Sun, Moon, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SacredGeometry variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground">
              A journey of transformation through earth and shadow
            </p>
          </div>
        </div>
      </section>

      {/* Astrological Identity */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 rounded-lg bg-background">
                <Sun className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Taurus Sun</h3>
                <p className="text-muted-foreground">Grounded presence, patient guidance, earthly wisdom</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background">
                <Moon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Scorpio Moon</h3>
                <p className="text-muted-foreground">Deep emotional insight, transformative healing</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Scorpio Rising</h3>
                <p className="text-muted-foreground">Magnetic presence, intuitive perception</p>
              </div>
            </div>

            <SacredGeometry variant="divider" />

            <div className="prose prose-lg mx-auto text-muted-foreground mt-12">
              <h2 className="font-display text-3xl text-foreground text-center mb-8">
                The Earth-Water Axis
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                My astrological signature—Taurus Sun with Scorpio Moon and Ascendant—creates a 
                powerful axis between earth and water, stability and transformation, the visible 
                and the hidden. This cosmic blueprint informs everything I do.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                The Taurus Sun grounds my work in practicality and patience. I believe that 
                spiritual growth must be embodied, integrated into our daily lives rather than 
                floating in abstract realms. The Scorpio energies bring depth, intensity, and 
                an unflinching willingness to explore shadow territories where true healing occurs.
              </p>
              
              <h2 className="font-display text-3xl text-foreground text-center mb-8 mt-12">
                My Spiritual Journey
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                I discovered Tarot in my early twenties during a period of profound personal 
                transformation. What began as curiosity quickly became a calling. The cards 
                became teachers, mirrors reflecting back the patterns of my psyche and the 
                rhythms of the universe.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                My studies deepened into astrology, revealing how the cosmic dance of planets 
                echoes within our personal stories. Later, the Kabbalistic Tree of Life offered 
                a map of consciousness itself—a framework for understanding the journey of the 
                soul from divine source to earthly manifestation and back again.
              </p>
              
              <h2 className="font-display text-3xl text-foreground text-center mb-8 mt-12">
                My Commitment
              </h2>
              <p className="text-lg leading-relaxed">
                I approach every session with deep respect for your autonomy and your own inner 
                wisdom. I am not here to tell you what to do or predict your future—I am here 
                to help you access your own knowing, to illuminate patterns and possibilities, 
                and to support you in making choices aligned with your highest self. My practice 
                is ethical, grounded, and heart-centered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
