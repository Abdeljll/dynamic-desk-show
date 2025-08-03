import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Shield, Cpu, GitBranch, Palette, Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "primary",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Next.js", level: 80 }
    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "secondary", 
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Java", level: 90 },
      { name: "Python", level: 80 },
      { name: "C/C++", level: 85 },
      { name: "PHP", level: 75 },
      { name: "RESTful APIs", level: 85 }
    ]
  },
  {
    title: "Database & Cloud",
    icon: Database,
    color: "accent",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Firebase", level: 85 },
      { name: "Google Cloud", level: 75 },
      { name: "Docker", level: 80 },
      { name: "NoSQL", level: 80 }
    ]
  },
  {
    title: "Software Engineering",
    icon: Cpu,
    color: "primary",
    skills: [
      { name: "Design Patterns", level: 85 },
      { name: "Microservices", level: 80 },
      { name: "System Architecture", level: 85 },
      { name: "Performance Optimization", level: 80 },
      { name: "Code Review", level: 90 },
      { name: "Testing", level: 85 }
    ]
  },
  {
    title: "DevOps & Tools",
    icon: GitBranch,
    color: "secondary",
    skills: [
      { name: "Git/GitHub", level: 95 },
      { name: "CI/CD", level: 80 },
      { name: "Agile/SCRUM", level: 90 },
      { name: "Project Management", level: 85 },
      { name: "MS Office", level: 90 },
      { name: "Collaboration Tools", level: 90 }
    ]
  },
  {
    title: "Security & Quality",
    icon: Shield,
    color: "accent",
    skills: [
      { name: "IT Security", level: 80 },
      { name: "Risk Analysis", level: 75 },
      { name: "Cryptography", level: 70 },
      { name: "Attack Prevention", level: 75 },
      { name: "Code Quality", level: 85 },
      { name: "Documentation", level: 90 }
    ]
  }
];

export const Skills = () => {
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