import { Phone, Mail, Instagram, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. I'll respond within 24-48 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
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
              Contact & Booking
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to begin your journey? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Direct Contact */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-8">
                Quick Contact
              </h2>
              
              <div className="space-y-6">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors">
                      WhatsApp
                    </h3>
                    <p className="text-muted-foreground">Fastest way to book a session</p>
                  </div>
                </a>
                
                <a
                  href="mailto:hello@celestialpath.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground group-hover:text-secondary transition-colors">
                      Email
                    </h3>
                    <p className="text-muted-foreground">hello@celestialpath.com</p>
                  </div>
                </a>
                
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                      Instagram
                    </h3>
                    <p className="text-muted-foreground">@celestialpath.therapy</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-muted/50">
                <p className="text-muted-foreground text-sm">
                  <strong>Sessions by appointment only.</strong> Online sessions available worldwide. 
                  In-person sessions available in select locations.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-8">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background border-border"
                    placeholder="Tell me a bit about what you're looking for..."
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                >
                  Send Message
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

export default Contact;
