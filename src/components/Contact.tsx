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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:abdelazizjalal7@icloud.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      
      window.open(mailtoLink, '_blank');
      toast.success("Email client opened! Your message is ready to send.");
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
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
    <section id="contact" className="py-20 px-6 section-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-6xl font-space-grotesk font-light mb-6 tracking-tight">
            <span className="text-gradient-primary">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Ready to collaborate? Let's discuss opportunities and create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2 fade-in-up delay-200">
            <div className="apple-card p-8">
              <h3 className="text-2xl font-space-grotesk font-medium text-foreground mb-6">
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
                      className="apple-card border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                      className="apple-card border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                    className="apple-card border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                    className="apple-card border-border focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none transition-all min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full apple-button modern-button bg-primary hover:bg-primary/90 text-primary-foreground group font-medium py-6"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform icon-bounce" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6 fade-in-up delay-300">
            {/* Contact Information */}
            <div className="apple-card p-6">
              <h3 className="text-xl font-space-grotesk font-medium text-foreground mb-6">
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
                      className={`flex items-center gap-4 p-4 rounded-xl ${colors.bg} ${colors.hover} apple-hover cursor-pointer group transition-all`}
                    >
                      <div className={`p-3 ${colors.bg} rounded-xl icon-bounce`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        <p className={`text-sm ${colors.text} font-light`}>{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="apple-card p-6">
              <h3 className="text-xl font-space-grotesk font-medium text-foreground mb-6">
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
                      className={`w-full flex items-center gap-4 p-4 rounded-xl ${colors.bg} ${colors.hover} apple-hover group text-left transition-all`}
                    >
                      <div className={`p-3 ${colors.bg} rounded-xl icon-bounce`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{link.title}</p>
                        <p className="text-sm text-muted-foreground font-light">{link.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="apple-card p-6">
              <h3 className="text-lg font-space-grotesk font-medium text-foreground mb-4">
                Quick Info
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-light">Response Time:</span>
                  <span className="text-primary font-medium">24-48 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-light">Availability:</span>
                  <span className="text-secondary font-medium">Open to opportunities</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-light">Languages:</span>
                  <span className="text-accent font-medium">Français, English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};