import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Settings, Plus, Edit, Trash2, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  location: string;
  features: string[];
  technologies: string[];
  color: string;
}

interface AdminPanelProps {
  isAdmin: boolean;
  projects: Project[];
  onProjectsUpdate: (projects: Project[]) => void;
}

export const AdminPanel = ({ isAdmin, projects, onProjectsUpdate }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Project>({
    id: 0,
    title: "",
    subtitle: "",
    description: "",
    period: "",
    location: "",
    features: [],
    technologies: [],
    color: "primary"
  });

  const [newFeature, setNewFeature] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
      setIsEditing(true);
    } else {
      setFormData({
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        title: "",
        subtitle: "",
        description: "",
        period: "",
        location: "",
        features: [],
        technologies: [],
        color: "primary"
      });
      setIsEditing(false);
    }
  }, [editingProject, projects]);

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    let updatedProjects;
    if (isEditing) {
      updatedProjects = projects.map(p => p.id === formData.id ? formData : p);
    } else {
      updatedProjects = [...projects, formData];
    }

    onProjectsUpdate(updatedProjects);
    toast({
      title: "Success",
      description: `Project ${isEditing ? 'updated' : 'created'} successfully.`,
    });
    
    setEditingProject(null);
    setIsOpen(false);
  };

  const handleDelete = (projectId: number) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    onProjectsUpdate(updatedProjects);
    toast({
      title: "Project Deleted",
      description: "Project has been removed successfully.",
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()]
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
            onClick={() => setEditingProject(null)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Project Management</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Projects List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Existing Projects</h3>
                <Button 
                  size="sm" 
                  onClick={() => setEditingProject(null)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="p-3 border rounded-lg bg-card">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {isEditing ? 'Edit Project' : 'New Project'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="period">Period</Label>
                    <Input
                      id="period"
                      value={formData.period}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="color">Color Theme</Label>
                  <select
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="accent">Accent</option>
                  </select>
                </div>

                {/* Features */}
                <div>
                  <Label>Features</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button type="button" size="sm" onClick={addFeature}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {feature}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeFeature(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <Label>Technologies</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add technology"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                    />
                    <Button type="button" size="sm" onClick={addTechnology}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        {tech}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeTechnology(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    {isEditing ? 'Update Project' : 'Create Project'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingProject(null);
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};