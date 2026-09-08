export type ToolType = 'downloader' | 'converter';

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HighlightItem {
  title: string;
  description: string;
}

export interface SEOPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  toolType: ToolType;
  category: 'youtube' | 'instagram' | 'conversion' | 'universal';
  badge: string;
  supportedPlatforms: string[];
  supportedFormats: string[];
  exampleUrl: string;
  defaultOutputFormat: string;
  availableOutputFormats: Array<{
    id: string;
    label: string;
    format: string;
    sizeDesc?: string;
  }>;
  steps: StepItem[];
  highlights: HighlightItem[];
  faqs: FAQItem[];
  relatedPages: string[]; // slugs
  responsibleUse: string;
}
