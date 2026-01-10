export interface NavItem {
  label: string;
  href: string;
}

export interface Program {
  id: string;
  title: string;
  ageGroup: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export interface Stat {
  label: string;
  value: number;
  color: string;
}