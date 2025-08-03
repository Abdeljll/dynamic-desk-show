import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:abdelazizjalal7@icloud.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    toast.success("Email client opened with your message!");
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "abdelazizjalal7@icloud.com",
      action: () => window.open('mailto:abdelazizjalal7@icloud.com'),
      color: "primary"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 438-521-8618",
      action: () => window.open('tel:+14385218618'),
      color: "secondary"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Montreal, Quebec",
      action: () => {},
      color: "accent"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub",
      description: "Check out my code",
      action: () => window.open('https://github.com/Abdeljll', '_blank'),
      color: "primary"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Professional network",
      action: () => window.open('https://www.linkedin.com/in/jalal-abdelaziz/', '_blank'),
      color: "secondary"
    },
    {
      icon: Download,
      title: "Download CV",
      description: "Get my resume PDF",
      action: () => toast.info("CV download will be available soon!"),
      color: "accent"
    }
  ];

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
    <section id="contact" className="py-20 px-6 animated-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6">
            <span className="text-gradient-hero">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss opportunities and create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card border-primary/20 hover-glow">
              <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-lift group"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="p-6 bg-card border-secondary/20">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const colors = getColorClasses(info.color);
                  const Icon = info.icon;
                  
                  return (
                    <div
                      key={index}
                      onClick={info.action}
                      className={`flex items-center gap-4 p-4 rounded-lg ${colors.bg} ${colors.hover} transition-colors cursor-pointer group`}
                    >
                      <div className={`p-2 ${colors.bg} rounded-lg`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        <p className={`text-sm ${colors.text}`}>{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6 bg-card border-accent/20">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-6">
                Connect & Resources
              </h3>
              
              <div className="space-y-3">
                {socialLinks.map((link, index) => {
                  const colors = getColorClasses(link.color);
                  const Icon = link.icon;
                  
                  return (
                    <button
                      key={index}
                      onClick={link.action}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg ${colors.bg} ${colors.hover} transition-colors hover-lift group text-left`}
                    >
                      <div className={`p-2 ${colors.bg} rounded-lg`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{link.title}</p>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className="p-6 bg-card border-primary/20">
              <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-4">
                Quick Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time:</span>
                  <span className="text-primary font-medium">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="text-secondary font-medium">Open to opportunities</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages:</span>
                  <span className="text-accent font-medium">French, English</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};