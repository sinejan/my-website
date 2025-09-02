export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string; // Full LinkedIn URL
  github?: string; // Full GitHub URL
  bio: string;
  profileImage?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'full-time' | 'internship' | 'volunteer';
  responsibilities: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  gpa?: string;
  startYear: number;
  endYear?: number;
  activities?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  credentialId?: string;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Mentorship {
  id: string;
  program: string;
  mentor?: string;
  role: 'mentee' | 'mentor';
  startDate: string;
  endDate?: string;
  description: string;
}

export interface TechnicalSkill {
  category: string;
  skills: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  volunteerWork: VolunteerWork[];
  mentorships: Mentorship[];
  technicalSkills: TechnicalSkill[];
  languages: Language[];
}
