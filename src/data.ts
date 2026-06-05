import { Article, Block, SocialLink, SiteSettings } from './types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'node-1',
    title: 'Drupal 11 Released with State-of-the-Art Site Builder tools',
    body: 'The Drupal Association is thrilled to unveil Drupal 11. This major release represents a leap forward for developers, content editors, and site administrators alike. With revamped visual page-building, blazing fast performance improvements, and fully decoupled React support, Drupal continues to lead the modern open-source enterprise CMS sphere. Learn how to migrate your existing modules and leverage the brand-new Olivero theme enhancements.',
    category: 'Announcement',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    date: '2026-05-18',
    status: 'published',
    sticky: true
  },
  {
    id: 'node-2',
    title: 'Designing with Accessibility: Lessons from the Olivero Core Theme',
    body: 'Web accessibility is not an afterthought; it is a fundamental pillar of modern development. Inspired by Drupals Olivero theme, we explore key methods for implementing semantic landmarks, perfect keyboard focus state indication, and high-contrast color choices. Olivero was developed to exceed WCAG 2.1 AA requirements, serving as a beacon of modern HTML5 standard adherence. Developers can implement these lessons in standard React environments to accommodate all potential users gracefully.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    date: '2026-05-24',
    status: 'published',
    sticky: false
  },
  {
    id: 'node-3',
    title: 'DrupalCon Asia 2026 Registrations Open this Week',
    body: 'Community has always been at the absolute heart of the Drupal ecosystem! This winter, join thousands of developers, UX designers, and digital strategists in Tokyo for DrupalCon Asia 2026. The call for presenters has officially opened, featuring workshops on headless architectures, Web3 integration, deep-dives into modern web API security, and collaborative framework coding sprints. Register today to lock in early-bird discounts and book code-sprint tables.',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    date: '2026-06-01',
    status: 'published',
    sticky: false
  },
  {
    id: 'node-4',
    title: 'How to Build Ultra-Fast, Static Decoupled Sites using Drupal APIs',
    body: 'The decoupled revolution allows front-end developers to work entirely with tools like React, Vue, or Next.js, while utilizing the robust content modeling, revision validation, and granular security controls of Drupal as a headless CMS backend. By enabling JSON:API or GraphQL core components in Drupal, server-side rendering pipelines can fetch structured payload nodes securely, build super optimized static markup, and reduce page load speeds to single-digit milliseconds globally.',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80',
    date: '2026-06-04',
    status: 'published',
    sticky: false
  }
];

export const INITIAL_BLOCKS: Block[] = [
  {
    id: 'block-hero',
    title: 'Cover Hero Banner',
    description: 'Displays a high-impact responsive visual banner with custom titles, modern layouts, and action trigger buttons.',
    region: 'hero',
    weight: 0,
    enabled: true
  },
  {
    id: 'block-news',
    title: 'Latest News Grid',
    description: 'Queries Drupal core content node storage, showing the latest news items filterable by category tags.',
    region: 'main',
    weight: 1,
    enabled: true
  },
  {
    id: 'block-contact',
    title: 'Contact form block',
    description: 'Exposes an accessible touch-friendly form with client validation to receive feedback and general emails.',
    region: 'main',
    weight: 2,
    enabled: true
  },
  {
    id: 'block-social',
    title: 'Social Media Block',
    description: 'Connects standard social handles with premium high-contrast link icons.',
    region: 'footer',
    weight: 3,
    enabled: true
  }
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'social-1',
    platform: 'Twitter',
    url: 'https://twitter.com/drupal',
    handle: '@drupal'
  },
  {
    id: 'social-2',
    platform: 'Facebook',
    url: 'https://facebook.com/drupal',
    handle: 'DrupalAssociation'
  },
  {
    id: 'social-3',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/drupal-association',
    handle: 'drupal-association'
  },
  {
    id: 'social-4',
    platform: 'GitHub',
    url: 'https://github.com/drupal',
    handle: 'drupal'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Drupal Community Hub',
  siteSlogan: 'Empowering digital editors and web builders worldwide with modern open web standards.',
  primaryColor: '#0066cc', // Drupal Blue
  accentColor: '#1dcdfe'  // Drupal Light Blue
};
