import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Shield, Cpu, GitBranch, Palette, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Code, Database, Server, Shield, Cpu, GitBranch, Palette, Zap
};

export const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkillsData();
  }, []);

  const loadSkillsData = async () => {
    try {
      // Load skill categories
      const { data: categoriesData } = await supabase
        .from('skill_categories')
        .select('*')
        .order('sort_order');

      // Load skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order');

      if (categoriesData && skillsData) {
        // Group skills by category
        const categoriesWithSkills = categoriesData.map(category => ({
          ...category,
          icon: iconMap[category.icon_name] || Code,
          skills: skillsData.filter(skill => skill.category_id === category.id)
        }));

        setSkillCategories(categoriesWithSkills);
        setSkills(skillsData);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        border: "border-primary/20",
        bg: "bg-primary/10",
        text: "text-primary",
        hover: "hover:bg-primary/20",
        skillBg: "bg-primary"
      },
      secondary: {
        border: "border-secondary/20",
        bg: "bg-secondary/10", 
        text: "text-secondary",
        hover: "hover:bg-secondary/20",
        skillBg: "bg-secondary"
      },
      accent: {
        border: "border-accent/20",
        bg: "bg-accent/10",
        text: "text-accent", 
        hover: "hover:bg-accent/20",
        skillBg: "bg-accent"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="skills" className="py-20 px-6 animated-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-hero">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technical expertise across the full development stack
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading skills...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color);
            const Icon = category.icon;
            
            return (
              <Card 
                key={category.title}
                className={`p-6 bg-card ${colors.border} hover-lift hover-glow group reveal-up delay-${categoryIndex * 100}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${colors.bg} rounded-xl ${colors.hover} transition-colors`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-space-grotesk font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <Badge variant="outline" className={`${colors.border} ${colors.text} text-xs`}>
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden skill-bar">
                        <div 
                          className={`h-full ${colors.skillBg} rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
          </div>
        )}

        {/* Additional Skills Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-card border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
              Additional Expertise
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-primary">Design & UX</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/20 text-primary">UI/UX Design</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">Responsive Design</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">User Experience</Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary">Accessibility</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  <h4 className="font-semibold text-secondary">Optimization</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Performance</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Scalability</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Code Quality</Badge>
                  <Badge variant="outline" className="border-secondary/20 text-secondary">Best Practices</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};