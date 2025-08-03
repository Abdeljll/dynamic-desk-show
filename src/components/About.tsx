import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6 animated-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-primary">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey in computer science and software engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* University */}
          <Card className="p-8 bg-card border-primary/20 hover-lift hover-glow group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
                  Université du Québec À Montréal
                </h3>
                <p className="text-primary font-semibold mb-4">
                  Bachelor's degree in Computer Science and Software Engineering
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    September 2021 - May 2025
                  </Badge>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    <MapPin className="w-3 h-3 mr-1" />
                    Montreal
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">Core Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/20 text-primary">Software Engineering</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">Algorithms</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">Data Structures</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">System Design</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* High School */}
          <Card className="p-8 bg-card border-secondary/20 hover-lift hover-glow group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
                  Lycée Lyautey
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  Baccalauréat (DES equivalent) options
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    September 2015 - July 2021
                  </Badge>
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    <MapPin className="w-3 h-3 mr-1" />
                    Casablanca, Morocco
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-background/50 rounded-lg border border-secondary/10">
                <h4 className="font-semibold text-secondary mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Mathematics</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Physics</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Chemistry</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Computer Science</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};