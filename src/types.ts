export interface Form {
  inputs?: Array<{
    type?: string;
    name: string;
    label?: string;
    autocomplete?: string;
    placeholder?: string;
    required?: boolean;
    containerClassName?: string;
    value?: string;
    disabled?: boolean;
  }>;
  textarea?: {
    name?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
  };
  disclaimer?: {
    label: string;
  };
  button?: string | {
    text: string;
    className?: string;
    onclick?: string;
  };
  description?: string;
}

export interface Post {
  id: string;
  slug: string;
  language: string;
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  title: string;
  excerpt?: string;
  image?: string;
  category?: {
    slug: string;
    title: string;
  };
  tags?: Array<{
    slug: string;
    title: string;
  }>;
  author?: string;
  draft?: boolean;
  metadata?: Record<string, any>;
  Content?: any;
  readingTime?: string;
} 