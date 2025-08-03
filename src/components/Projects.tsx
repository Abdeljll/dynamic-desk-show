import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Github, Database, MessageSquare, ShoppingBag, FileCheck, MapPin, Calendar, Globe } from "lucide-react";

const initialProjects = [
  {
    id: 0,
    title: "Personal Portfolio Website V1",
    subtitle: "Personal project",
    description: "Modern personal website built with cutting-edge technologies including Gatsby, JavaScript, HTML/CSS, Node.js and Yarn. Features automatic deployment on Netlify with GitHub integration and continuous learning approach.",
    icon: Globe,
    color: "secondary",
    period: "March 2025 - Present",
    location: "Montreal",
    features: [
      "Modern web technologies integration",
      "Automatic deployment on Netlify",
      "GitHub integration for updates",
      "Optimized image management",
      "Responsive design implementation",
      "Continuous feature enhancement"
    ],
    technologies: ["Gatsby", "JavaScript", "HTML/CSS", "Node.js", "Yarn", "Netlify"]
  },
  {
    id: 1,
    title: "Digital Library Management System",
    subtitle: "Integrative project IV",
    description: "Advanced document and user management system with AI-powered search and recommendations. Features mobile interface, secure access controls, and Agile methodology implementation.",
    icon: Database,
    color: "primary",
    period: "January 2025 - May 2025",
    location: "Montreal",
    features: [
      "AI-powered search & recommendations",
      "Mobile-responsive interface",
      "Advanced user management",
      "Document security & protection",
      "Agile development methodology"
    ],
    technologies: ["React", "Node.js", "AI/ML", "MongoDB", "TypeScript"]
  },
  {
    id: 2,
    title: "Instant Chat Application",
    subtitle: "Integrative project III",
    description: "Complete WhatsApp-style messaging application with real-time communication, authentication, and cloud deployment using modern technologies.",
    icon: MessageSquare,
    color: "secondary",
    period: "September 2024 - December 2024",
    location: "Montreal",
    features: [
      "Real-time messaging",
      "User authentication & login/logout",
      "Backend-focused architecture",
      "Cloud deployment",
      "Message logging system"
    ],
    technologies: ["Docker", "Google Firebase", "Google Cloud", "React", "Node.js"]
  },
  {
    id: 3,
    title: "SWYLE - Second-hand Clothing Sales",
    subtitle: "Integrative project II",
    description: "Full-stack e-commerce platform for second-hand clothing in Canada. Complete web application with optimized database and secure payment integration.",
    icon: ShoppingBag,
    color: "accent",
    period: "January 2024 - April 2024",
    location: "Montreal",
    features: [
      "E-commerce platform for clothing",
      "Database optimization",
      "Secure payment platform",
      "Frontend & backend development",
      "UX/UI design implementation"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "CSS/SCSS"]
  },
  {
    id: 4,
    title: "Training Activity Validation Software",
    subtitle: "Integrative project I",
    description: "Java-based validation engine for training activity declarations with comprehensive testing, Agile project management, and reliable validation algorithms.",
    icon: FileCheck,
    color: "primary",
    period: "September 2022 - December 2022",
    location: "Montreal",
    features: [
      "Training validation engine",
      "Agile project management",
      "Task & sprint tracking",
      "Software development concepts",
      "Unit & integration testing"
    ],
    technologies: ["Java", "JUnit", "Agile/SCRUM", "Git", "Software Testing"]
  }
];

interface ProjectsProps {
  isAdmin?: boolean;
  adminProjects?: any[];
  onProjectsUpdate?: (projects: any[]) => void;
}

export const Projects = ({ isAdmin = false, adminProjects, onProjectsUpdate }: ProjectsProps = {}) => {
  const [projects] = useState(adminProjects || initialProjects);
  const handleViewCode = (projectId: number) => {
    if (projectId === 0) {
      // Personal Portfolio Website V1
      window.open('https://abdelazizjalal.netlify.app', '_blank');
    } else {
      toast({
        title: "Code Unavailable",
        description: "Waiting for my GitLab issue to be resolved as I no longer have access to my account.",
        duration: 4000,
      });
    }
  };

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
      },
      accent: {
        border: "border-accent/20",
        bg: "bg-accent/10",
        text: "text-accent",
        hover: "hover:bg-accent/20"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section id="projects" className="py-20 px-6 animated-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-hero">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions and integrative projects showcasing full-stack development skills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color);
            const Icon = project.icon;
            
            return (
              <Card 
                key={project.id}
                className={`p-8 bg-card ${colors.border} hover-lift hover-glow group reveal-up delay-${index * 100} flex flex-col h-full`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 ${colors.bg} rounded-xl ${colors.hover} transition-colors`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className={`${colors.text} font-semibold mb-3`}>
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.period}
                      </Badge>
                      <Badge className="bg-muted/50 text-muted-foreground border-muted/50">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className={`${colors.border} ${colors.text}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`${colors.border} ${colors.hover}`}
                    onClick={() => handleViewCode(project.id)}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {project.id === 0 ? "View Live Site" : "View Code"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};