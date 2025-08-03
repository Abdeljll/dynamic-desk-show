-- Create settings table for contact information and personal details
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for settings
CREATE POLICY "Settings are viewable by everyone" 
ON public.settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update settings" 
ON public.settings 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create skill_categories table
CREATE TABLE public.skill_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for skill_categories
CREATE POLICY "Skill categories are viewable by everyone" 
ON public.skill_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage skill categories" 
ON public.skill_categories 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policies for skills
CREATE POLICY "Skills are viewable by everyone" 
ON public.skills 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage skills" 
ON public.skills 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create projects table (replacing the current static data)
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  code_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage projects" 
ON public.projects 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  skills TEXT[] NOT NULL DEFAULT '{}',
  icon_name TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Create policies for experiences
CREATE POLICY "Experiences are viewable by everyone" 
ON public.experiences 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage experiences" 
ON public.experiences 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Create policies for education
CREATE POLICY "Education is viewable by everyone" 
ON public.education 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage education" 
ON public.education 
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_categories_updated_at
  BEFORE UPDATE ON public.skill_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON public.education
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES 
('contact_info', '{
  "email": "abdelazizjalal7@gmail.com",
  "phone": "+33 6 XX XX XX XX",
  "location": "Paris, France"
}'),
('social_links', '{
  "linkedin": "https://linkedin.com/in/abdelaziz-jalal",
  "github": "https://github.com/abdelazizjalal",
  "cv_url": "/cv.pdf"
}'),
('personal_info', '{
  "name": "Abdelaziz Jalal",
  "title": "Software Engineer",
  "bio": "Passionate Software Engineer with expertise in full-stack development"
}');

-- Insert default skill categories
INSERT INTO public.skill_categories (title, icon_name, color, sort_order) VALUES 
('Frontend Development', 'Code', 'primary', 1),
('Backend Development', 'Server', 'secondary', 2),
('Database & Cloud', 'Database', 'accent', 3),
('Software Engineering', 'Cpu', 'primary', 4),
('DevOps & Tools', 'GitBranch', 'secondary', 5),
('Security & Quality', 'Shield', 'accent', 6);

-- Insert default skills
INSERT INTO public.skills (category_id, name, level, sort_order) 
SELECT 
  sc.id,
  skill_data.name,
  skill_data.level,
  skill_data.sort_order
FROM public.skill_categories sc
CROSS JOIN (
  SELECT 'React' as name, 90 as level, 1 as sort_order, 'Frontend Development' as category
  UNION ALL SELECT 'TypeScript', 85, 2, 'Frontend Development'
  UNION ALL SELECT 'JavaScript', 90, 3, 'Frontend Development'
  UNION ALL SELECT 'HTML/CSS', 95, 4, 'Frontend Development'
  UNION ALL SELECT 'Tailwind CSS', 85, 5, 'Frontend Development'
  UNION ALL SELECT 'Next.js', 80, 6, 'Frontend Development'
  UNION ALL SELECT 'Node.js', 85, 1, 'Backend Development'
  UNION ALL SELECT 'Java', 90, 2, 'Backend Development'
  UNION ALL SELECT 'Python', 80, 3, 'Backend Development'
  UNION ALL SELECT 'C/C++', 85, 4, 'Backend Development'
  UNION ALL SELECT 'PHP', 75, 5, 'Backend Development'
  UNION ALL SELECT 'RESTful APIs', 85, 6, 'Backend Development'
) skill_data
WHERE sc.title = skill_data.category;