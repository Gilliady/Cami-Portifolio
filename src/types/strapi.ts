// Strapi Content Types and Interfaces for Text, Media (Images & Videos)

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  mime?: string;
}

export interface StrapiProject {
  id: number;
  documentId?: string;
  title: string;
  category: string;
  description?: string;
  order?: number;
  hasPlay?: boolean;
  hasAwards?: boolean;
  inAudiovisual?: boolean;
  inWebdesign?: boolean;
  inGraphicDesign?: boolean;
  cols?: string;
  videoUrl?: string; // External video link (Vimeo, YouTube, Cloudflare Stream)
  videoFile?: StrapiMedia; // Direct uploaded video file (MP4, WebM)
  image?: StrapiMedia; // Cover / thumbnail image uploaded in Strapi
  locale?: string;
}

export interface StrapiStat {
  id?: number;
  number: string;
  label: string;
}

export interface StrapiGeneralInfo {
  id: number;
  documentId?: string;
  heroTagline: string;
  heroName: string;
  heroTitle: string;
  heroDescription: string;
  aboutHeading: string;
  aboutBio: string;
  heroPortrait?: StrapiMedia;
  aboutPortrait?: StrapiMedia;
  contactPortrait?: StrapiMedia;
  stats: StrapiStat[];
  linkedinUrl?: string;
  whatsappUrl?: string;
  contactEmail?: string;
  locale?: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
