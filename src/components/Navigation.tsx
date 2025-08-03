import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Menu, X, Download, Languages } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";


export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleResumeClick = () => {
    toast({
      title: "CV Download",
      description: "CV download will be available soon!",
      duration: 3000,
    });
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-bg border-b border-border/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-space-grotesk font-medium text-gradient-primary apple-button"
          >
            AJ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium relative group px-3 py-2 rounded-lg apple-hover fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            ))}

            <div className="flex items-center gap-3 ml-4">
              <ThemeToggle />
              
              <Button 
                variant="outline" 
                className="apple-button modern-button border-border hover:bg-muted font-medium fade-in-up delay-700"
                onClick={handleResumeClick}
              >
                <Download className="w-4 h-4 mr-2 icon-bounce" />
                Resume
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary apple-hover rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20">
            <div className="apple-card mt-4 p-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-muted-foreground hover:text-foreground apple-hover font-medium py-3 px-4 rounded-lg fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="mt-4 pt-4 border-t border-border/20 flex flex-col gap-3">
                  <ThemeToggle />
                  
                  <Button 
                    variant="outline" 
                    className="w-full apple-button modern-button border-border hover:bg-muted font-medium"
                    onClick={handleResumeClick}
                  >
                    <Download className="w-4 h-4 mr-2 icon-bounce" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};