export interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    photoUrl: string;
    summary: string;
  }
  
  export interface Education {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface Experience {
    id: string;
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    level: string;
  }
  
  export interface SocialLink {
    id: string;
    platform: string;
    url: string;
  }
  
  export interface CVData {
    profile: ProfileData;
    educations: Education[];
    experiences: Experience[];
    skills: Skill[];
    socialLinks?: SocialLink[];
  }
  