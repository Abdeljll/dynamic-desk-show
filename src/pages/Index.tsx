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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Index component mounted");
    
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if user is already logged in
        console.log("Checking auth session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(`Auth error: ${sessionError.message}`);
        } else {
          console.log("Session status:", session ? "authenticated" : "not authenticated");
          setIsAdmin(!!session);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError(`Initialization error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session ? "authenticated" : "not authenticated");
        setIsAdmin(!!session);
      }
    );

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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
