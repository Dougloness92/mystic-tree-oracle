import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Moon, Star, Hash, Flame, Sprout, Calendar } from "lucide-react";

const blogCategories = [
  { name: "Astrologia", icon: Moon, color: "text-secondary" },
  { name: "Sabedoria do Tarot", icon: Star, color: "text-primary" },
  { name: "Numerologia Cabalística", icon: Hash, color: "text-accent" },
  { name: "Rituais e Práticas Energéticas", icon: Flame, color: "text-secondary" },
  { name: "Cura e Autodesenvolvimento", icon: Sprout, color: "text-accent" },
  { name: "Insights Mensais", icon: Calendar, color: "text-primary" },
];

const featuredPosts = [
  {
    title: "Compreendendo a Lua Cheia em Escorpião",
    category: "Astrologia",
    excerpt: "Esta poderosa lunação nos convida a explorar as profundezas da nossa paisagem emocional e liberar o que não serve mais...",
    date: "8 de Dezembro, 2025",
  },
  {
    title: "O Eremita: Jornada Interior",
    category: "Sabedoria do Tarot",
    excerpt: "Quando O Eremita aparece, somos chamados a nos retirar do ruído do mundo e buscar respostas na solidão...",
    date: "5 de Dezembro, 2025",
  },
  {
    title: "Seu Número do Ano Pessoal para 2026",
    category: "Numerologia Cabalística",
    excerpt: "À medida que nos aproximamos do novo ano, descubra quais temas e oportunidades o aguardam baseado no seu ciclo de ano pessoal...",
    date: "1 de Dezembro, 2025",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SacredGeometry variant="background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Blog Astrológico
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, ensinamentos e reflexões sobre as artes místicas
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {blogCategories.map((category) => (
              <button
                key={category.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 hover:border-secondary/50 transition-colors"
              >
                <category.icon className={`w-4 h-4 ${category.color}`} />
                <span className="text-foreground">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-foreground text-center mb-12">
            Últimos Artigos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredPosts.map((post) => (
              <article key={post.title} className="card-mystical p-6 group cursor-pointer">
                <span className="text-sm text-secondary mb-2 block">{post.category}</span>
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground italic">
              Mais artigos em breve...
            </p>
          </div>
        </div>
      </section>

      {/* Sky Today Widget */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-display text-2xl text-foreground mb-6">
              Céu de Hoje
            </h2>
            <div className="card-mystical p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Moon className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Lua em Peixes</p>
                </div>
                <div>
                  <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Sol em Sagitário</p>
                </div>
              </div>
              <p className="text-foreground italic">
                "Confie na sua intuição hoje. As águas correm profundas, carregando mensagens do seu subconsciente."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
