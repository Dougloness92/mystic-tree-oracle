import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const categoryLabels: Record<string, string> = {
  astrology: "Astrologia",
  tarot: "Sabedoria do Tarot",
  numerology: "Numerologia Cabalística",
  rituals: "Rituais e Práticas",
  healing: "Cura e Autodesenvolvimento",
  monthly: "Insights Mensais",
};

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    setIsLoading(true);
    setNotFound(false);

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, category, content, cover_image_url, created_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching post:", error);
      setNotFound(true);
    } else if (!data) {
      setNotFound(true);
    } else {
      setPost(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="relative pt-32 pb-16 overflow-hidden">
          <SacredGeometry variant="background" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="font-display text-4xl text-foreground mb-6">
              Artigo não encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você procura não existe ou ainda não foi publicado.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SacredGeometry variant="background" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-secondary mb-4 block">
              {categoryLabels[post.category] || post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(post.created_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.cover_image_url && (
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary prose-strong:text-foreground">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
