import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { ArrowLeft, Calendar, Loader2, Heart, Sparkles, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useReactions, ReactionType } from "@/hooks/useReactions";

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

interface Comment {
  id: string;
  name: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  
  // Comment form state
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reactions
  const { counts, userReaction, toggleReaction, isLoading: reactionsLoading } = useReactions(post?.id);

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
      fetchComments(data.id);
    }
    setIsLoading(false);
  };

  const fetchComments = async (postId: string) => {
    setCommentsLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("id, name, content, created_at")
      .eq("post_id", postId)
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setComments(data);
    }
    setCommentsLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post || !commentName.trim() || !commentContent.trim()) {
      toast.error("Por favor, preencha seu nome e comentário.");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("comments").insert({
      post_id: post.id,
      name: commentName.trim(),
      email: commentEmail.trim() || null,
      content: commentContent.trim(),
      status: "pending",
    });

    if (error) {
      console.error("Error submitting comment:", error);
      toast.error("Erro ao enviar comentário. Tente novamente.");
    } else {
      toast.success("Comentário enviado! Aguarde aprovação.");
      setCommentName("");
      setCommentEmail("");
      setCommentContent("");
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
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
      <section className="py-8">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary prose-strong:text-foreground">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      {/* Reactions Section */}
      <section className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-muted-foreground text-sm mb-6">
              Este conteúdo ressoou com você?
            </p>
            <div className="flex justify-center gap-6">
              {[
                { type: "heart" as ReactionType, icon: Heart, label: "Coração" },
                { type: "light" as ReactionType, icon: Sparkles, label: "Luz" },
                { type: "leaf" as ReactionType, icon: Leaf, label: "Natureza" },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => toggleReaction(type)}
                  disabled={reactionsLoading}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    userReaction === type
                      ? "bg-secondary/20 text-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                  title={label}
                >
                  <Icon
                    className={`w-6 h-6 transition-transform ${
                      userReaction === type ? "scale-110 fill-current" : ""
                    }`}
                  />
                  {counts[type] > 0 && (
                    <span className="text-xs">{counts[type]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Approved Comments */}
            {comments.length > 0 && (
              <div className="mb-12">
                <h3 className="font-display text-2xl text-foreground mb-6">
                  Reflexões ({comments.length})
                </h3>
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 bg-card/30 rounded-lg border border-border/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{comment.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.created_at), "d MMM yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comment Form */}
            <div>
              <h3 className="font-display text-2xl text-foreground mb-4">
                Deixe sua reflexão
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Seu comentário será revisado antes de ser publicado.
              </p>
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Seu nome *"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                      maxLength={100}
                      className="bg-card/50 border-border/30"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail (opcional, não será exibido)"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      maxLength={255}
                      className="bg-card/50 border-border/30"
                    />
                  </div>
                </div>
                <Textarea
                  placeholder="Compartilhe sua reflexão..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                  maxLength={1000}
                  rows={4}
                  className="bg-card/50 border-border/30 resize-none"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-mystical"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar reflexão"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
