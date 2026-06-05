export interface Article {
  id: string;
  title: string;
  body: string;
  category: string;
  image: string;
  date: string;
  status: 'published' | 'draft';
  sticky: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface Block {
  id: string;
  title: string;
  description: string;
  region: 'hero' | 'main' | 'footer';
  weight: number;
  enabled: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'Twitter' | 'Facebook' | 'LinkedIn' | 'GitHub' | 'YouTube';
  url: string;
  handle: string;
}

export interface SiteSettings {
  siteName: string;
  siteSlogan: string;
  primaryColor: string;
  accentColor: string;
}
