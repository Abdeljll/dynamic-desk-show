import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const navItems = [
    { label: t('nav.about'), id: "about" },
    { label: t('nav.projects'), id: "projects" },
    { label: t('nav.skills'), id: "skills" },
    { label: t('nav.experience'), id: "experience" },
    { label: t('nav.contact'), id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-space-grotesk font-bold text-gradient-primary hover:scale-105 transition-transform"
          >
            AJ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* Language Toggle */}
            <Button 
              variant="outline" 
              className="border-secondary/20 hover:bg-secondary/10 group"
              onClick={toggleLanguage}
            >
              <Languages className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              {language === 'en' ? 'FR' : 'EN'}
            </Button>

            <Button 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10 group"
              onClick={() => {}}
            >
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              {t('nav.cv')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="flex gap-3 mt-2">
                <Button 
                  variant="outline" 
                  className="border-secondary/20 hover:bg-secondary/10 group"
                  onClick={toggleLanguage}
                >
                  <Languages className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {language === 'en' ? 'FR' : 'EN'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-primary/20 hover:bg-primary/10 group"
                  onClick={() => {}}
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {t('nav.cv')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};