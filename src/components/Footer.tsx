import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background-secondary border-t border-border/50">
      {/* Scroll to Top Button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12 p-0 hover-lift group shadow-lg"
        >
          <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-space-grotesk font-bold text-gradient-primary mb-2">
              Abdelaziz Jalal
            </h3>
            <p className="text-muted-foreground text-sm">
              Software Engineer & Full Stack Developer
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <Badge variant="outline" className="border-primary/20 text-primary text-xs">
                Montreal, QC
              </Badge>
              <Badge variant="outline" className="border-secondary/20 text-secondary text-xs">
                Open to Work
              </Badge>
            </div>
          </div>

          {/* Center - Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Skills", id: "skills" },
                { label: "Experience", id: "experience" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/20 hover:bg-primary/10 group"
                onClick={() => window.open('mailto:abdelazizjalal7@icloud.com')}
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-secondary/20 hover:bg-secondary/10 group"
                onClick={() => window.open('https://github.com/Abdeljll', '_blank')}
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-accent/20 hover:bg-accent/10 group"
                onClick={() => window.open('https://www.linkedin.com/in/jalal-abdelaziz/', '_blank')}
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Abdelaziz Jalal. Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>and lots of coffee ☕</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/20 text-primary text-xs">
                React + TypeScript
              </Badge>
              <Badge variant="outline" className="border-secondary/20 text-secondary text-xs">
                Tailwind CSS
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};