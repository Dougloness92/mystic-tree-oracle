import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getRandomCard, OracleCard } from "@/data/oracleCards";
import { SacredGeometry } from "./SacredGeometry";

interface OracleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OracleState = "intro" | "meditating" | "revealing" | "result";

export const OracleModal = ({ isOpen, onClose }: OracleModalProps) => {
  const [state, setState] = useState<OracleState>("intro");
  const [card, setCard] = useState<OracleCard | null>(null);
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    if (!isOpen) {
      setState("intro");
      setCard(null);
      setCountdown(7);
    }
  }, [isOpen]);

  useEffect(() => {
    if (state === "meditating" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (state === "meditating" && countdown === 0) {
      setState("revealing");
      setCard(getRandomCard());
      setTimeout(() => setState("result"), 1500);
    }
  }, [state, countdown]);

  const startReading = () => {
    setState("meditating");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-background border-secondary/30 overflow-hidden">
        <DialogTitle className="sr-only">Oracle of the Tree of Life</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="relative min-h-[500px] flex flex-col items-center justify-center p-8">
          {/* Background Sacred Geometry */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SacredGeometry 
              variant="accent" 
              className={`w-80 h-80 transition-all duration-1000 ${
                state === "meditating" ? "animate-rotate-slow opacity-40" : "opacity-20"
              }`}
            />
          </div>

          {/* Intro State */}
          {state === "intro" && (
            <div className="relative z-10 text-center animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Oracle of the Tree of Life
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                The ten Sephiroth hold ancient wisdom waiting to guide you. 
                Clear your mind and receive a message from the Tree.
              </p>
              <Button
                onClick={startReading}
                className="btn-mystical bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                Receive Guidance
              </Button>
            </div>
          )}

          {/* Meditating State */}
          {state === "meditating" && (
            <div className="relative z-10 text-center animate-fade-in">
              <p className="font-display text-2xl text-foreground mb-4 italic">
                Take a breath...
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Bring to mind an area of your life that needs clarity.
              </p>
              <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center animate-pulse-slow">
                <span className="font-display text-3xl text-secondary">{countdown}</span>
              </div>
            </div>
          )}

          {/* Revealing State */}
          {state === "revealing" && (
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center animate-scale-in">
                <SacredGeometry variant="accent" className="w-16 h-16 animate-pulse-slow" />
              </div>
            </div>
          )}

          {/* Result State */}
          {state === "result" && card && (
            <div className="relative z-10 text-center animate-reveal max-w-lg mx-auto">
              {/* Card Display */}
              <div className={`w-32 h-44 ${card.color} rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg border border-secondary/30`}>
                <span className="text-4xl font-display text-foreground/80">{card.hebrew}</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                {card.name}
              </h3>
              
              <p className="text-secondary text-xl mb-4 italic">
                "{card.message}"
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {card.guidance}
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-accent font-medium text-lg">
                  Affirmation: {card.affirmation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setState("intro");
                    setCountdown(7);
                  }}
                  variant="outline"
                  className="border-secondary/50 text-foreground hover:bg-secondary/10"
                >
                  Draw Again
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Book a Personal Reading
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
