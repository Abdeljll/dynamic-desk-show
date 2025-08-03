import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects', 
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    
    // Hero Section
    'hero.software_engineer': 'Software Engineer',
    'hero.full_stack_developer': 'Full Stack Developer',
    'hero.graduate': '🎓 Computer Science Graduate',
    'hero.description': 'Passionate about creating innovative solutions through code.',
    'hero.graduate_from': 'Recent Computer Science & Software Engineering graduate',
    'hero.university': 'Université du Québec À Montréal',
    'hero.contact_me': 'Contact Me',
    'hero.languages': '💬 French • English',
    
    // Education
    'education.title': 'Education',
    'education.subtitle': 'My academic journey in computer science and software engineering',
    'education.bachelor': "Bachelor's degree in Computer Science and Software Engineering",
    'education.completed': 'September 2021 - May 2025 (Completed)',
    'education.graduate': '🎓 Graduate',
    'education.core_focus': 'Core Focus Areas',
    'education.specializations': 'Specializations',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Innovative solutions and integrative projects showcasing full-stack development skills',
    'projects.key_features': 'Key Features',
    'projects.technologies': 'Technologies',
    'projects.view_code': 'View Code',
    'projects.live_demo': 'Live Demo',
    
    // Skills
    'skills.title': 'Skills',
    'skills.subtitle': 'Comprehensive technical expertise across the full development stack',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.database': 'Database & Cloud',
    'skills.software_engineering': 'Software Engineering',
    'skills.devops': 'DevOps & Tools',
    'skills.security': 'Security & Quality',
    'skills.additional': 'Additional Expertise',
    'skills.design_ux': 'Design & UX',
    'skills.optimization': 'Optimization',
    
    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'Professional experience in leadership, operations, and business analysis',
    'experience.responsibilities': 'Key Responsibilities',
    'experience.skills_developed': 'Skills Developed',
    'experience.summary': 'Professional Summary',
    'experience.summary_text': 'Combining technical expertise in software engineering with proven leadership experience in operations management. Strong background in team collaboration, customer service excellence, and cross-cultural business environments.',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Ready to collaborate? Let's discuss opportunities and create something amazing together!",
    'contact.send_message': 'Send a Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.connect': 'Connect & Resources',
    'contact.quick_info': 'Quick Info',
    'contact.response_time': 'Response Time',
    'contact.availability': 'Availability',
    'contact.languages_available': 'Languages',
    
    // Footer
    'footer.built_with': 'Built with',
    'footer.coffee': 'and lots of coffee ☕',
    'footer.quick_links': 'Quick Links',
    'footer.connect': 'Connect'
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expérience',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    
    // Hero Section
    'hero.software_engineer': 'Ingénieur Logiciel',
    'hero.full_stack_developer': 'Développeur Full Stack',
    'hero.graduate': '🎓 Diplômé en Informatique',
    'hero.description': 'Passionné par la création de solutions innovantes grâce au code.',
    'hero.graduate_from': 'Récent diplômé en Informatique et Génie Logiciel',
    'hero.university': 'Université du Québec À Montréal',
    'hero.contact_me': 'Me Contacter',
    'hero.languages': '💬 Français • Anglais',
    
    // Education
    'education.title': 'Formation',
    'education.subtitle': 'Mon parcours académique en informatique et génie logiciel',
    'education.bachelor': "Baccalauréat en informatique et génie logiciel",
    'education.completed': 'Septembre 2021 - Mai 2025 (Complété)',
    'education.graduate': '🎓 Diplômé',
    'education.core_focus': 'Domaines de Spécialisation',
    'education.specializations': 'Spécialisations',
    
    // Projects
    'projects.title': 'Projets',
    'projects.subtitle': 'Solutions innovantes et projets intégrateurs démontrant mes compétences en développement full-stack',
    'projects.key_features': 'Caractéristiques Clés',
    'projects.technologies': 'Technologies',
    'projects.view_code': 'Voir le Code',
    'projects.live_demo': 'Démo Live',
    
    // Skills
    'skills.title': 'Compétences',
    'skills.subtitle': 'Expertise technique complète à travers toute la pile de développement',
    'skills.frontend': 'Développement Frontend',
    'skills.backend': 'Développement Backend',
    'skills.database': 'Base de Données et Cloud',
    'skills.software_engineering': 'Génie Logiciel',
    'skills.devops': 'DevOps et Outils',
    'skills.security': 'Sécurité et Qualité',
    'skills.additional': 'Expertise Supplémentaire',
    'skills.design_ux': 'Design et UX',
    'skills.optimization': 'Optimisation',
    
    // Experience
    'experience.title': 'Expérience',
    'experience.subtitle': 'Expérience professionnelle en leadership, opérations et analyse commerciale',
    'experience.responsibilities': 'Responsabilités Clés',
    'experience.skills_developed': 'Compétences Développées',
    'experience.summary': 'Résumé Professionnel',
    'experience.summary_text': 'Combinant une expertise technique en génie logiciel avec une expérience de leadership éprouvée en gestion des opérations. Solide expérience en collaboration d\'équipe, excellence du service client et environnements commerciaux interculturels.',
    
    // Contact
    'contact.title': 'Contactez-Moi',
    'contact.subtitle': 'Prêt à collaborer ? Discutons des opportunités et créons quelque chose d\'extraordinaire ensemble !',
    'contact.send_message': 'Envoyer un Message',
    'contact.name': 'Nom',
    'contact.email': 'Courriel',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.info': 'Informations de Contact',
    'contact.connect': 'Connexion et Ressources',
    'contact.quick_info': 'Info Rapide',
    'contact.response_time': 'Temps de Réponse',
    'contact.availability': 'Disponibilité',
    'contact.languages_available': 'Langues',
    
    // Footer
    'footer.built_with': 'Construit avec',
    'footer.coffee': 'et beaucoup de café ☕',
    'footer.quick_links': 'Liens Rapides',
    'footer.connect': 'Connexion'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};