export type NavItem = {
  key: 'home' | 'about' | 'career' | 'research' | 'projects' | 'server' | 'github' | 'contact';
  label: string;
  href: string;
  external?: boolean;
  short: string;
};

export const githubUrl = 'https://github.com/navyracooon';

export const primaryNavItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '/', short: 'Floating islands' },
  { key: 'about', label: 'About', href: '/about', short: 'Site design' },
  { key: 'career', label: 'Career', href: '/career', short: 'Experience' },
  { key: 'research', label: 'Research', href: '/research', short: 'Control / optimization' },
  { key: 'projects', label: 'Projects', href: '/projects', short: 'Personal builds' },
  { key: 'server', label: 'Server', href: '/server', short: 'Home lab' },
  { key: 'github', label: 'GitHub', href: githubUrl, external: true, short: 'External' },
  { key: 'contact', label: 'Contact', href: '/contact', short: 'Message' },
];
