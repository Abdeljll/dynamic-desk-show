-- Insert missing skills for Database & Cloud category
INSERT INTO public.skills (category_id, name, level, sort_order) 
SELECT 
  sc.id,
  skill_data.name,
  skill_data.level,
  skill_data.sort_order
FROM public.skill_categories sc
CROSS JOIN (
  SELECT 'PostgreSQL' as name, 85 as level, 1 as sort_order, 'Database & Cloud' as category
  UNION ALL SELECT 'MongoDB', 80, 2, 'Database & Cloud'
  UNION ALL SELECT 'Firebase', 85, 3, 'Database & Cloud'
  UNION ALL SELECT 'Google Cloud', 75, 4, 'Database & Cloud'
  UNION ALL SELECT 'Docker', 80, 5, 'Database & Cloud'
  UNION ALL SELECT 'NoSQL', 80, 6, 'Database & Cloud'
) skill_data
WHERE sc.title = skill_data.category;

-- Insert missing skills for Software Engineering category
INSERT INTO public.skills (category_id, name, level, sort_order) 
SELECT 
  sc.id,
  skill_data.name,
  skill_data.level,
  skill_data.sort_order
FROM public.skill_categories sc
CROSS JOIN (
  SELECT 'Design Patterns' as name, 85 as level, 1 as sort_order, 'Software Engineering' as category
  UNION ALL SELECT 'Microservices', 80, 2, 'Software Engineering'
  UNION ALL SELECT 'System Architecture', 85, 3, 'Software Engineering'
  UNION ALL SELECT 'Performance Optimization', 80, 4, 'Software Engineering'
  UNION ALL SELECT 'Code Review', 90, 5, 'Software Engineering'
  UNION ALL SELECT 'Testing', 85, 6, 'Software Engineering'
) skill_data
WHERE sc.title = skill_data.category;

-- Insert missing skills for DevOps & Tools category
INSERT INTO public.skills (category_id, name, level, sort_order) 
SELECT 
  sc.id,
  skill_data.name,
  skill_data.level,
  skill_data.sort_order
FROM public.skill_categories sc
CROSS JOIN (
  SELECT 'Git/GitHub' as name, 95 as level, 1 as sort_order, 'DevOps & Tools' as category
  UNION ALL SELECT 'CI/CD', 80, 2, 'DevOps & Tools'
  UNION ALL SELECT 'Agile/SCRUM', 90, 3, 'DevOps & Tools'
  UNION ALL SELECT 'Project Management', 85, 4, 'DevOps & Tools'
  UNION ALL SELECT 'MS Office', 100, 5, 'DevOps & Tools'
  UNION ALL SELECT 'Collaboration Tools', 90, 6, 'DevOps & Tools'
) skill_data
WHERE sc.title = skill_data.category;

-- Insert missing skills for Security & Quality category
INSERT INTO public.skills (category_id, name, level, sort_order) 
SELECT 
  sc.id,
  skill_data.name,
  skill_data.level,
  skill_data.sort_order
FROM public.skill_categories sc
CROSS JOIN (
  SELECT 'IT Security' as name, 80 as level, 1 as sort_order, 'Security & Quality' as category
  UNION ALL SELECT 'Risk Analysis', 70, 2, 'Security & Quality'
  UNION ALL SELECT 'Cryptography', 55, 3, 'Security & Quality'
  UNION ALL SELECT 'Attack Prevention', 70, 4, 'Security & Quality'
  UNION ALL SELECT 'Code Quality', 85, 5, 'Security & Quality'
  UNION ALL SELECT 'Documentation', 95, 6, 'Security & Quality'
) skill_data
WHERE sc.title = skill_data.category;

-- Fix RLS policies for settings table - allow authenticated users to update
DROP POLICY IF EXISTS "Only admins can update settings" ON public.settings;

CREATE POLICY "Authenticated users can manage settings" 
ON public.settings 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);