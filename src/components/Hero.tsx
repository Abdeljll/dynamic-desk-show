import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Typewriter effects
  const { displayedText: nameText, isComplete: nameComplete } = useTypewriter("ABDELAZIZ JALAL", 120, 800);
  const { displayedText: descriptionText, isComplete: descriptionComplete } = useTypewriter(
    "Passionate about creating innovative solutions through code.",
    50,
    nameComplete ? 500 : 0
  );
  const { displayedText: educationText } = useTypewriter(
    "Recent Computer Science & Software Engineering graduate from Université du Québec À Montréal.",
    40,
    descriptionComplete ? 300 : 0
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative section-bg flex items-center justify-center px-6 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float delay-0"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-float delay-500"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-primary/3 rounded-full blur-xl animate-float delay-700"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Greeting */}
          <div className="mb-8 fade-in-up delay-100">
            <div className="inline-flex items-center gap-2 px-4 py-2 apple-card text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-soft" />
              Available for new opportunities
            </div>
          </div>

          {/* Name & Title */}
          <div className="fade-in-up delay-200 mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-space-grotesk font-light tracking-tight min-h-[200px] md:min-h-[300px]">
              <span className="block text-foreground relative">
                {nameText.split(' ')[0]}
                {nameText.includes(' ') && nameText.split(' ')[0] && !nameComplete && (
                  <span className="animate-pulse text-primary">|</span>
                )}
              </span>
              {nameText.includes(' ') && (
                <span className="block text-gradient-primary font-medium relative">
                  {nameText.split(' ')[1] || ''}
                  {nameText.split(' ')[1] && !nameComplete && (
                    <span className="animate-pulse text-primary">|</span>
                  )}
                </span>
              )}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8 fade-in-up delay-300 opacity-0" style={{ 
            animation: nameComplete ? 'fadeInUp 0.6s ease-out 0.5s forwards' : 'none' 
          }}>
            <Badge className="apple-button bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-2 text-sm font-medium">
              Software Engineer
            </Badge>
            <Badge className="apple-button bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 px-4 py-2 text-sm font-medium">
              Full Stack Developer
            </Badge>
            <Badge className="apple-button bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 px-4 py-2 text-sm font-medium">
              🎓 Computer Science Graduate
            </Badge>
          </div>

          <div className="fade-in-up delay-400 min-h-[120px]">
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto leading-relaxed font-light">
              {descriptionText}
              {descriptionText && !descriptionComplete && (
                <span className="animate-pulse text-primary">|</span>
              )}
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              <span className="text-foreground font-medium">{educationText}</span>
              {educationText && educationText.length < "Recent Computer Science & Software Engineering graduate from Université du Québec À Montréal.".length && (
                <span className="animate-pulse text-primary">|</span>
              )}
            </p>
          </div>

          {/* Contact Buttons */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-16 fade-in-up delay-500 opacity-0" 
            style={{ 
              animation: descriptionComplete ? 'fadeInUp 0.6s ease-out 1s forwards' : 'none' 
            }}
          >
            <Button 
              size="lg" 
              className="apple-button modern-button bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium animate-glow"
              onClick={() => window.open('mailto:abdelazizjalal7@icloud.com')}
            >
              <Mail className="w-5 h-5 mr-2 icon-bounce" />
              Get In Touch
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="apple-button modern-button border-border hover:bg-muted px-8 py-3 font-medium"
              onClick={() => window.open('tel:+14385218618')}
            >
              <Phone className="w-5 h-5 mr-2 icon-bounce" />
              Call Me
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="apple-button modern-button border-border hover:bg-muted px-8 py-3 font-medium"
              onClick={() => window.open('https://github.com/Abdeljll', '_blank')}
            >
              <Github className="w-5 h-5 mr-2 icon-bounce" />
              GitHub
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="apple-button modern-button border-border hover:bg-muted px-8 py-3 font-medium"
              onClick={() => window.open('https://www.linkedin.com/in/jalal-abdelaziz/', '_blank')}
            >
              <Linkedin className="w-5 h-5 mr-2 icon-bounce" />
              LinkedIn
            </Button>
          </div>

          {/* Languages */}
          <div 
            className="fade-in-up delay-600 opacity-0" 
            style={{ 
              animation: descriptionComplete ? 'fadeInUp 0.6s ease-out 1.2s forwards' : 'none' 
            }}
          >
            <p className="text-muted-foreground mb-12 text-lg font-light">
              💬 Français • English
            </p>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="fade-in-up delay-700 opacity-0" 
            style={{ 
              animation: descriptionComplete ? 'fadeInUp 0.6s ease-out 1.4s forwards' : 'none' 
            }}
          >
            <button
              onClick={() => scrollToSection('about')}
              className="group p-3 rounded-full apple-hover cursor-pointer"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground group-hover:text-primary animate-bounce-soft transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};