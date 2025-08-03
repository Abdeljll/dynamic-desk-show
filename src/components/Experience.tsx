import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, TrendingUp, MapPin, Calendar, Building } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Service Supervisor",
    company: "Independent Grocers Alliance (IGA)",
    type: "Part-time",
    period: "March 2022 - March 2024",
    location: "Montreal",
    description: "Led operations and team management in a dynamic retail environment, developing strong leadership and customer service skills.",
    responsibilities: [
      "Management of operations and employees in collaboration with the service manager",
      "Supervision of purchases/sales and inventory management",
      "Cash register accounting and financial oversight",
      "Training, evaluation and motivation of team members",
      "Customer service excellence and conflict resolution"
    ],
    skills: ["Leadership", "Team Management", "Customer Service", "Operations", "Training", "Financial Management"],
    icon: Briefcase,
    color: "primary"
  },
  {
    id: 2,
    title: "Observation Internship",
    company: "Mondi Group",
    type: "Internship",
    period: "February 2017 - March 2017",
    location: "Casablanca, Morocco",
    description: "Gained valuable insights into international business operations and corporate processes through structured observation and analysis.",
    responsibilities: [
      "Discovered business processes and tools used in operations",
      "Analyzed customer interactions and learned CRM best practices",
      "Participated in discussions with various departments",
      "Understood the company's global operations and structure",
      "Gained exposure to international business environment"
    ],
    skills: ["Business Analysis", "CRM", "Operations", "International Business", "Process Analysis"],
    icon: Building,
    color: "secondary"
  }
];

export const Experience = () => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        border: "border-primary/20",
        bg: "bg-primary/10",
        text: "text-primary",
        hover: "hover:bg-primary/20"
      },
      secondary: {
        border: "border-secondary/20",
        bg: "bg-secondary/10",
        text: "text-secondary",
        hover: "hover:bg-secondary/20"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="experience" className="py-20 px-6 animated-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-hero">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional experience in leadership, operations, and business analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => {
            const colors = getColorClasses(experience.color);
            const Icon = experience.icon;
            
            return (
              <Card 
                key={experience.id}
                className={`p-8 bg-card ${colors.border} hover-lift hover-glow group reveal-up delay-${index * 200}`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left Column - Company Info */}
                  <div className="md:col-span-1">
                    <div className={`p-4 ${colors.bg} rounded-xl ${colors.hover} transition-colors mb-4 inline-block`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    
                    <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
                      {experience.title}
                    </h3>
                    
                    <p className={`${colors.text} font-semibold mb-4`}>
                      {experience.company}
                    </p>

                    <div className="space-y-2 mb-4">
                      <Badge className={`${colors.bg} ${colors.text} ${colors.border} block w-fit`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {experience.period}
                      </Badge>
                      
                      <Badge className="bg-muted/50 text-muted-foreground border-muted/50 block w-fit">
                        <MapPin className="w-3 h-3 mr-1" />
                        {experience.location}
                      </Badge>
                      
                      <Badge variant="outline" className={`${colors.border} ${colors.text} block w-fit`}>
                        {experience.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="md:col-span-2 space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Key Responsibilities
                      </h4>
                      <div className="space-y-2">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-2 flex-shrink-0`} />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {responsibility}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        Skills Developed
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className={`${colors.border} ${colors.text}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Professional Summary */}
        <div className="mt-16">
          <Card className="p-8 bg-card border-primary/20 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-4">
              Professional Summary
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combining <span className="text-primary font-semibold">technical expertise</span> in software engineering 
              with proven <span className="text-secondary font-semibold">leadership experience</span> in operations management. 
              Strong background in team collaboration, customer service excellence, and 
              <span className="text-accent font-semibold"> cross-cultural business environments</span>.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};