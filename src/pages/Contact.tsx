import { Phone, Mail, Instagram } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SacredGeometry } from "@/components/SacredGeometry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const { toast } = useToast();
  const { settings, getWhatsAppUrl, getEmailUrl, getInstagramUrl } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada",
      description: "Obrigada por entrar em contato. Responderei em 24-48 horas.",
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
              Contato e Agendamento
            </h1>
            <p className="text-xl text-muted-foreground">
              Pronto para começar sua jornada? Adoraria ouvir de você.
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
                Contato Rápido
              </h2>
              
              <div className="space-y-6">
                <a
                  href={getWhatsAppUrl()}
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
                    <p className="text-muted-foreground">Forma mais rápida de agendar uma sessão</p>
                  </div>
                </a>
                
                <a
                  href={getEmailUrl()}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground group-hover:text-secondary transition-colors">
                      Email
                    </h3>
                    <p className="text-muted-foreground">
                      {settings.contact_email || "contato@caminhocelestial.com"}
                    </p>
                  </div>
                </a>
                
                <a
                  href={getInstagramUrl()}
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
                    <p className="text-muted-foreground">
                      @{settings.contact_instagram || "caminhocelestial.terapia"}
                    </p>
                  </div>
                </a>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-muted/50">
                <p className="text-muted-foreground text-sm">
                  <strong>Sessões apenas com agendamento prévio.</strong> Sessões online disponíveis mundialmente. 
                  Sessões presenciais disponíveis em locais selecionados.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-8">
                Envie uma Mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-foreground mb-2">
                    Seu Nome
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
                    Endereço de Email
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
                    Sua Mensagem
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background border-border"
                    placeholder="Conte-me um pouco sobre o que você está buscando..."
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                >
                  Enviar Mensagem
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
