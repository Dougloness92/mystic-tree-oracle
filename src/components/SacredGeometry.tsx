import { cn } from "@/lib/utils";

interface SacredGeometryProps {
  className?: string;
  variant?: "background" | "divider" | "accent";
}

export const SacredGeometry = ({ className, variant = "background" }: SacredGeometryProps) => {
  if (variant === "divider") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <svg width="200" height="30" viewBox="0 0 200 30" className="text-secondary/40">
          <line x1="0" y1="15" x2="60" y2="15" stroke="currentColor" strokeWidth="1" />
          <circle cx="80" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="15" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="120" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="140" y1="15" x2="200" y2="15" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (variant === "accent") {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={cn("text-secondary/20", className)}
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {/* Hexagram lines */}
        <polygon 
          points="50,5 93,72.5 7,72.5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        />
        <polygon 
          points="50,95 7,27.5 93,27.5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5"
        />
      </svg>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] animate-rotate-slow"
        viewBox="0 0 400 400"
      >
        {/* Flower of Life pattern */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <circle
            key={i}
            cx={200 + 50 * Math.cos((angle * Math.PI) / 180)}
            cy={200 + 50 * Math.sin((angle * Math.PI) / 180)}
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary"
          />
        ))}
        <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
      </svg>
    </div>
  );
};
