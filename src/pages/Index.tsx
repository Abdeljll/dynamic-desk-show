import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminPanel } from "@/components/AdminPanel";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminProjects, setAdminProjects] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAdmin(true);
      }
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAdmin(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleProjectsUpdate = (projects: any[]) => {
    setAdminProjects(projects);
    // Here you could save to localStorage or Supabase
    localStorage.setItem('adminProjects', JSON.stringify(projects));
  };

  useEffect(() => {
    // Load projects from localStorage if admin
    if (isAdmin) {
      const saved = localStorage.getItem('adminProjects');
      if (saved) {
        setAdminProjects(JSON.parse(saved));
      }
    }
  }, [isAdmin]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Projects 
        isAdmin={isAdmin}
        adminProjects={adminProjects.length > 0 ? adminProjects : undefined}
        onProjectsUpdate={handleProjectsUpdate}
      />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      
      {/* Admin Components */}
      <AdminLogin 
        onAdminLogin={setIsAdmin} 
        isAdmin={isAdmin}
      />
      {isAdmin && (
        <AdminPanel
          isAdmin={isAdmin}
          projects={adminProjects.length > 0 ? adminProjects : []}
          onProjectsUpdate={handleProjectsUpdate}
        />
      )}
    </div>
  );
};

export default Index;
