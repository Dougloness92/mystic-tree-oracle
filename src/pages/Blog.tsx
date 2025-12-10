import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Moon, Star, Hash, Flame, Sprout, Calendar } from "lucide-react";

const blogCategories = [
  { name: "Astrology", icon: Moon, color: "text-secondary" },
  { name: "Tarot Wisdom", icon: Star, color: "text-primary" },
  { name: "Kabbalistic Numerology", icon: Hash, color: "text-accent" },
  { name: "Rituals & Energetic Practices", icon: Flame, color: "text-secondary" },
  { name: "Healing & Self-Development", icon: Sprout, color: "text-accent" },
  { name: "Monthly Insights", icon: Calendar, color: "text-primary" },
];

const featuredPosts = [
  {
    title: "Understanding the Full Moon in Scorpio",
    category: "Astrology",
    excerpt: "This powerful lunation invites us to explore the depths of our emotional landscape and release what no longer serves...",
    date: "December 8, 2025",
  },
  {
    title: "The Hermit: Journey Within",
    category: "Tarot Wisdom",
    excerpt: "When The Hermit appears, we are called to withdraw from the noise of the world and seek answers in solitude...",
    date: "December 5, 2025",
  },
  {
    title: "Your Personal Year Number for 2026",
    category: "Kabbalistic Numerology",
    excerpt: "As we approach the new year, discover what themes and opportunities await you based on your personal year cycle...",
    date: "December 1, 2025",
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
              Astrological Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, teachings, and reflections on the mystical arts
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
            Latest Articles
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
              More articles coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Sky Today Widget */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-display text-2xl text-foreground mb-6">
              Sky Today
            </h2>
            <div className="card-mystical p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Moon className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Moon in Pisces</p>
                </div>
                <div>
                  <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Sun in Sagittarius</p>
                </div>
              </div>
              <p className="text-foreground italic">
                "Trust your intuition today. The waters run deep, carrying messages from your subconscious."
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
