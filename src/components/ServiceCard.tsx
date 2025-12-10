import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SacredGeometry } from "./SacredGeometry";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const ServiceCard = ({ title, description, icon: Icon, href }: ServiceCardProps) => {
  return (
    <Link to={href} className="group block">
      <div className="card-mystical p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Decorative background */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <SacredGeometry variant="accent" className="w-20 h-20" />
        </div>
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
            <Icon className="w-7 h-7 text-secondary" />
          </div>
          
          <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
