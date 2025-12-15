import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Moon, Star, Hash, Flame, Sprout, Calendar, Heart, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { usePostStats } from "@/hooks/useReactions";

const blogCategories = [
  { name: "Astrologia", key: "astrology", icon: Moon, color: "text-secondary" },
  { name: "Sabedoria do Tarot", key: "tarot", icon: Star, color: "text-primary" },
  { name: "Numerologia Cabalística", key: "numerology", icon: Hash, color: "text-accent" },
  { name: "Rituais e Práticas Energéticas", key: "rituals", icon: Flame, color: "text-secondary" },
  { name: "Cura e Autodesenvolvimento", key: "healing", icon: Sprout, color: "text-accent" },
  { name: "Insights Mensais", key: "monthly", icon: Calendar, color: "text-primary" },
];

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const categoryLabels: Record<string, string> = {
  astrology: "Astrologia",
  tarot: "Sabedoria do Tarot",
  numerology: "Numerologia Cabalística",
  rituals: "Rituais e Práticas",
  healing: "Cura e Autodesenvolvimento",
  monthly: "Insights Mensais",
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const postIds = posts.map((p) => p.id);
  const postStats = usePostStats(postIds);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setIsLoading(true);
    let query = supabase
      .from("posts")
      .select("id, title, slug, category, content, cover_image_url, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (selectedCategory) {
      query = query.eq("category", selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  const getExcerpt = (content: string) => {
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped;
  };

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
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === null
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-background border-border/50 hover:border-secondary/50"
              }`}
            >
              <span className="text-foreground">Todos</span>
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category.key
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-background border-border/50 hover:border-secondary/50"
                }`}
              >
                <category.icon className={`w-4 h-4 ${category.color}`} />
                <span className="text-foreground">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-foreground text-center mb-12">
            {selectedCategory ? categoryLabels[selectedCategory] : "Últimos Artigos"}
          </h2>
          
          {isLoading ? (
            <div className="text-center text-muted-foreground">Carregando...</div>
          ) : posts.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground italic">
                Nenhum artigo publicado ainda...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id}>
                  <article className="card-mystical p-6 group cursor-pointer h-full">
                    {post.cover_image_url && (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <span className="text-sm text-secondary mb-2 block">
                      {categoryLabels[post.category] || post.category}
                    </span>
                    <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {getExcerpt(post.content)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(post.created_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                      </span>
                      <div className="flex items-center gap-3 text-muted-foreground/70">
                        {(postStats[post.id]?.reactions || 0) > 0 && (
                          <span className="flex items-center gap-1 text-xs">
                            <Heart className="w-3.5 h-3.5" />
                            {postStats[post.id]?.reactions}
                          </span>
                        )}
                        {(postStats[post.id]?.comments || 0) > 0 && (
                          <span className="flex items-center gap-1 text-xs">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {postStats[post.id]?.comments}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
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
