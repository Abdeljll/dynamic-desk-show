import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2, Save, X, Code, Server, Database, Cpu, GitBranch, Shield, Palette, Zap, GraduationCap, Briefcase, MapPin, Mail, Phone, Linkedin, Github, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  isAdmin: boolean;
}

const iconMap = {
  Code, Server, Database, Cpu, GitBranch, Shield, Palette, Zap, GraduationCap, Briefcase, MapPin, Mail, Phone, Linkedin, Github, Download
};

export const AdminPanel = ({ isAdmin }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const { toast } = useToast();

  // Settings state
  const [settings, setSettings] = useState<any>({});
  
  // Skills state
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  
  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  
  // Education state
  const [education, setEducation] = useState<any[]>([]);
  
  // Experiences state
  const [experiences, setExperiences] = useState<any[]>([]);

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>("");
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isAdmin && isOpen) {
      loadAllData();
    }
  }, [isAdmin, isOpen]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load settings
      const { data: settingsData } = await supabase
        .from('settings')
        .select('*');
      
      const settingsObj = settingsData?.reduce((acc: any, setting: any) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {}) || {};
      setSettings(settingsObj);

      // Load skill categories and skills
      const { data: categoriesData } = await supabase
        .from('skill_categories')
        .select('*')
        .order('sort_order');
      setSkillCategories(categoriesData || []);

      const { data: skillsData } = await supabase
        .from('skills')
        .select('*, skill_categories(title)')
        .order('sort_order');
      setSkills(skillsData || []);

      // Load projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order');
      setProjects(projectsData || []);

      // Load education
      const { data: educationData } = await supabase
        .from('education')
        .select('*')
        .order('sort_order');
      setEducation(educationData || []);

      // Load experiences
      const { data: experiencesData } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order');
      setExperiences(experiencesData || []);

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key, value });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (table: string, id: string) => {
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      switch (table) {
        case 'skill_categories':
          setSkillCategories(prev => prev.filter(item => item.id !== id));
          setSkills(prev => prev.filter(skill => skill.category_id !== id));
          break;
        case 'skills':
          setSkills(prev => prev.filter(item => item.id !== id));
          break;
        case 'projects':
          setProjects(prev => prev.filter(item => item.id !== id));
          break;
        case 'education':
          setEducation(prev => prev.filter(item => item.id !== id));
          break;
        case 'experiences':
          setExperiences(prev => prev.filter(item => item.id !== id));
          break;
      }

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const saveItem = async (table: string, data: any) => {
    try {
      let result;
      if (data.id) {
        // Update existing
        result = await supabase
          .from(table as any)
          .update(data)
          .eq('id', data.id)
          .select()
          .single();
      } else {
        // Create new
        result = await supabase
          .from(table as any)
          .insert(data)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Update local state
      const updatedItem = result.data;
      switch (table) {
        case 'skill_categories':
          if (data.id) {
            setSkillCategories(prev => prev.map(item => item.id === data.id ? updatedItem : item));
          } else {
            setSkillCategories(prev => [...prev, updatedItem]);
          }
          break;
        case 'skills':
          if (data.id) {
            setSkills(prev => prev.map(item => item.id === data.id ? updatedItem : item));
          } else {
            setSkills(prev => [...prev, updatedItem]);
          }
          break;
        case 'projects':
          if (data.id) {
            setProjects(prev => prev.map(item => item.id === data.id ? updatedItem : item));
          } else {
            setProjects(prev => [...prev, updatedItem]);
          }
          break;
        case 'education':
          if (data.id) {
            setEducation(prev => prev.map(item => item.id === data.id ? updatedItem : item));
          } else {
            setEducation(prev => [...prev, updatedItem]);
          }
          break;
        case 'experiences':
          if (data.id) {
            setExperiences(prev => prev.map(item => item.id === data.id ? updatedItem : item));
          } else {
            setExperiences(prev => [...prev, updatedItem]);
          }
          break;
      }

      setEditingItem(null);
      setEditingType("");
      setFormData({});
      toast({
        title: "Success",
        description: data.id ? "Item updated successfully" : "Item created successfully",
      });
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (type: string, item?: any) => {
    setEditingType(type);
    setEditingItem(item || {});
    setFormData(item || {});
  };

  if (!isAdmin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="fixed top-4 right-4 z-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin Panel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Administration Panel</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={settings.personal_info?.name || ""}
                    onChange={(e) => updateSetting('personal_info', {
                      ...settings.personal_info,
                      name: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={settings.personal_info?.title || ""}
                    onChange={(e) => updateSetting('personal_info', {
                      ...settings.personal_info,
                      title: e.target.value
                    })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={settings.personal_info?.bio || ""}
                    onChange={(e) => updateSetting('personal_info', {
                      ...settings.personal_info,
                      bio: e.target.value
                    })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Projects Management</h3>
              <Button onClick={() => openEditDialog("projects")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies?.map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog("projects", project)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteItem('projects', project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Skills Management</h3>
              <div className="flex gap-2">
                <Button onClick={() => openEditDialog("skill_categories")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
                <Button onClick={() => openEditDialog("skills")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {skillCategories.map((category) => (
                <Card key={category.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{category.title}</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog("skill_categories", category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteItem('skill_categories', category.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {skills.filter(skill => skill.category_id === category.id).map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <span>{skill.name}</span>
                          <Badge variant="outline">{skill.level}%</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => openEditDialog("skills", skill)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteItem('skills', skill.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    value={settings.contact_info?.email || ""}
                    onChange={(e) => updateSetting('contact_info', {
                      ...settings.contact_info,
                      email: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={settings.contact_info?.phone || ""}
                    onChange={(e) => updateSetting('contact_info', {
                      ...settings.contact_info,
                      phone: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={settings.contact_info?.location || ""}
                    onChange={(e) => updateSetting('contact_info', {
                      ...settings.contact_info,
                      location: e.target.value
                    })}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>LinkedIn</Label>
                  <Input
                    value={settings.social_links?.linkedin || ""}
                    onChange={(e) => updateSetting('social_links', {
                      ...settings.social_links,
                      linkedin: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>GitHub</Label>
                  <Input
                    value={settings.social_links?.github || ""}
                    onChange={(e) => updateSetting('social_links', {
                      ...settings.social_links,
                      github: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>CV URL</Label>
                  <Input
                    value={settings.social_links?.cv_url || ""}
                    onChange={(e) => updateSetting('social_links', {
                      ...settings.social_links,
                      cv_url: e.target.value
                    })}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Experience Management</h3>
              <Button onClick={() => openEditDialog("experiences")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="grid gap-4">
              {experiences.map((experience) => (
                <Card key={experience.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{experience.title}</h4>
                      <p className="text-sm text-muted-foreground">{experience.company} - {experience.period}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog("experiences", experience)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteItem('experiences', experience.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Education Management</h3>
              <Button onClick={() => openEditDialog("education")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>

            <div className="grid gap-4">
              {education.map((edu) => (
                <Card key={edu.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution} - {edu.period}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog("education", edu)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteItem('education', edu.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Dialog */}
        {editingItem && (
          <Dialog open={!!editingItem} onOpenChange={() => {
            setEditingItem(null);
            setEditingType("");
            setFormData({});
          }}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {formData.id ? 'Edit' : 'Add'} {editingType.replace('_', ' ')}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {editingType === "projects" && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={formData.title || ""}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Period</Label>
                        <Input
                          value={formData.period || ""}
                          onChange={(e) => setFormData({...formData, period: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={formData.location || ""}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Technologies (comma separated)</Label>
                      <Input
                        value={formData.technologies?.join(', ') || ""}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value.split(',').map(t => t.trim())})}
                      />
                    </div>
                    <div>
                      <Label>Features (comma separated)</Label>
                      <Input
                        value={formData.features?.join(', ') || ""}
                        onChange={(e) => setFormData({...formData, features: e.target.value.split(',').map(f => f.trim())})}
                      />
                    </div>
                  </>
                )}

                {editingType === "skill_categories" && (
                  <>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={formData.title || ""}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Select
                        value={formData.icon_name || ""}
                        onValueChange={(value) => setFormData({...formData, icon_name: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(iconMap).map((iconName) => (
                            <SelectItem key={iconName} value={iconName}>
                              {iconName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Color</Label>
                      <Select
                        value={formData.color || ""}
                        onValueChange={(value) => setFormData({...formData, color: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="accent">Accent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {editingType === "skills" && (
                  <>
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={formData.name || ""}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formData.category_id || ""}
                        onValueChange={(value) => setFormData({...formData, category_id: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {skillCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Level (0-100)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.level || ""}
                        onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setEditingItem(null);
                  setEditingType("");
                  setFormData({});
                }}>
                  Cancel
                </Button>
                <Button onClick={() => saveItem(editingType, formData)}>
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};