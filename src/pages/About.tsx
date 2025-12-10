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
              Sobre Mim
            </h1>
            <p className="text-xl text-muted-foreground">
              Uma jornada de transformação através da terra e da sombra
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
                <h3 className="font-display text-xl text-foreground mb-2">Sol em Touro</h3>
                <p className="text-muted-foreground">Presença enraizada, orientação paciente, sabedoria terrena</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background">
                <Moon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Lua em Escorpião</h3>
                <p className="text-muted-foreground">Insight emocional profundo, cura transformadora</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-background">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Ascendente Escorpião</h3>
                <p className="text-muted-foreground">Presença magnética, percepção intuitiva</p>
              </div>
            </div>

            <SacredGeometry variant="divider" />

            <div className="prose prose-lg mx-auto text-muted-foreground mt-12">
              <h2 className="font-display text-3xl text-foreground text-center mb-8">
                O Eixo Terra-Água
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Minha assinatura astrológica — Sol em Touro com Lua e Ascendente em Escorpião — cria um 
                eixo poderoso entre terra e água, estabilidade e transformação, o visível 
                e o oculto. Este mapa cósmico informa tudo o que faço.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                O Sol em Touro fundamenta meu trabalho em praticidade e paciência. Acredito que 
                o crescimento espiritual deve ser incorporado, integrado em nossas vidas diárias em vez de 
                flutuar em reinos abstratos. As energias de Escorpião trazem profundidade, intensidade e 
                uma disposição destemida para explorar territórios sombrios onde a verdadeira cura ocorre.
              </p>
              
              <h2 className="font-display text-3xl text-foreground text-center mb-8 mt-12">
                Minha Jornada Espiritual
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Descobri o Tarot no início dos meus vinte anos durante um período de profunda transformação 
                pessoal. O que começou como curiosidade rapidamente se tornou uma vocação. As cartas 
                se tornaram professoras, espelhos refletindo os padrões da minha psique e os 
                ritmos do universo.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Meus estudos se aprofundaram na astrologia, revelando como a dança cósmica dos planetas 
                ecoa em nossas histórias pessoais. Mais tarde, a Árvore da Vida Cabalística ofereceu 
                um mapa da própria consciência — uma estrutura para entender a jornada da 
                alma desde a fonte divina até a manifestação terrena e de volta.
              </p>
              
              <h2 className="font-display text-3xl text-foreground text-center mb-8 mt-12">
                Meu Compromisso
              </h2>
              <p className="text-lg leading-relaxed">
                Abordo cada sessão com profundo respeito pela sua autonomia e pela sua própria sabedoria 
                interior. Não estou aqui para dizer o que fazer ou prever seu futuro — estou aqui 
                para ajudá-lo a acessar seu próprio conhecimento, iluminar padrões e possibilidades, 
                e apoiá-lo a fazer escolhas alinhadas com seu eu mais elevado. Minha prática 
                é ética, fundamentada e centrada no coração.
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
