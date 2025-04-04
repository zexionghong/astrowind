export interface MetaData {
  title?: string;
  description?: string;
  image?: string;
  canonicalURL?: string;
  type?: string;
  date?: Date;
  updatedDate?: Date;
  author?: string;
  tags?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
    site_name?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
} 