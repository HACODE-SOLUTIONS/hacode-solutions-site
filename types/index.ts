export interface DevSpec {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  isPaid: boolean;
  price?: number;
  stripePriceId?: string;
  githubUrl?: string;
  features: string[];
  stack: string[];
  diyTime?: string;
  whoFor: string;
  fileCount: number;
  category: string;
  popular?: boolean;
  sunset?: boolean;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}
