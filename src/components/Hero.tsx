import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative animated-bg flex items-center justify-center px-6">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-xl float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-accent/10 rounded-full blur-xl float"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Name & Title */}
          <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-hero">ABDELAZIZ</span>
            <br />
            <span className="text-foreground">JALAL</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              {t('hero.software_engineer')}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-secondary/10 text-secondary border-secondary/20">
              {t('hero.full_stack_developer')}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/20">
              {t('hero.graduate')}
            </Badge>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
            <span className="text-primary font-semibold"> {t('hero.graduate_from')}</span> {t('hero.university').includes('Université') ? 'de l\'' : 'from'}
            <span className="text-secondary font-semibold"> {t('hero.university')}</span>.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover-lift group"
              onClick={() => window.open('mailto:abdelazizjalal7@icloud.com')}
            >
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t('hero.contact_me')}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/20 hover:bg-primary/10 hover-lift group"
              onClick={() => window.open('tel:+14385218618')}
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              +1 438-521-8618
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-secondary/20 hover:bg-secondary/10 hover-lift group"
            >
              <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              GitHub
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-accent/20 hover:bg-accent/10 hover-lift group"
            >
              <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              LinkedIn
            </Button>
          </div>

          {/* Languages */}
          <p className="text-muted-foreground mb-12">
            {t('hero.languages')}
          </p>

          {/* Scroll Indicator */}
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce hover:scale-110 transition-transform cursor-pointer"
          >
            <ArrowDown className="w-8 h-8 text-primary mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};