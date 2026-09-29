export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  tags: string[];
  stipend: string;
  duration: string;
  postedDate: string;
  description: string;
  requirements: string[];
}

export interface ApplicationFormData {
  name: string;
  email: string;
  coverNote: string;
}