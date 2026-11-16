import type {
  StrapiMedia,
  StrapiProject,
  StrapiGeneralInfo,
  StrapiResponse,
} from '../types/strapi';
import { content as defaultContent, type ProjectItem, type ContentData } from '../data/translations';

export function getStrapiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env?.STRAPI_URL) {
    return process.env.STRAPI_URL;
  }
  return (import.meta.env.STRAPI_URL as string) || 'http://localhost:1337';
}

export function getPublicStrapiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env?.PUBLIC_STRAPI_URL) {
    return process.env.PUBLIC_STRAPI_URL;
  }
  if (import.meta.env.PUBLIC_STRAPI_URL) {
    return import.meta.env.PUBLIC_STRAPI_URL as string;
  }
  // Convert internal Docker hostname (http://backend:1337) to browser-accessible localhost
  return getStrapiBaseUrl().replace('://backend:', '://localhost:');
}

export function getStrapiApiToken(): string {
  const token =
    (typeof process !== 'undefined' && process.env?.STRAPI_API_TOKEN) ||
    (import.meta.env.STRAPI_API_TOKEN as string) ||
    '';
  return token.trim();
}

/**
 * Resolves full media URL for images and videos from Strapi
 */
export function getStrapiMediaUrl(media?: StrapiMedia | string | null, fallback = ''): string {
  if (!media) return fallback;

  const url = typeof media === 'string' ? media : media.url;
  if (!url) return fallback;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const baseUrl = getPublicStrapiBaseUrl();
  // Prepend public Strapi host if relative path like /uploads/photo.jpg
  return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Generic Strapi Fetcher with timeout and error handling
 */
export async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T | null> {
  const baseUrl = getStrapiBaseUrl();
  const apiToken = getStrapiApiToken();
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl.replace(/\/$/, '')}/api/${path}${query ? `?${query}` : ''}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiToken && apiToken !== 'TESTE') {
    headers['Authorization'] = `Bearer ${apiToken}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Strapi] Failed to fetch ${url} - Status ${response.status}`);
      return null;
    }

    const json = await response.json();
    console.log(`[Strapi] Successfully fetched ${url}`);
    return json as T;
  } catch (error) {
    console.warn(`[Strapi] Error fetching ${url}:`, (error as Error).message);
    return null;
  }
}

/**
 * Fetches Projects for a given locale with fallback to static portfolio data
 */
export async function getPortfolioProjects(locale: 'pt' | 'en' = 'pt'): Promise<ProjectItem[]> {
  let strapiData = await fetchStrapi<StrapiResponse<StrapiProject[]>>('projects', {
    populate: '*',
    locale,
    sort: 'order:asc',
    'pagination[pageSize]': '100',
  });

  // Fallback to query without locale if Strapi doesn't have i18n installed/configured
  if (!strapiData || !strapiData.data || strapiData.data.length === 0) {
    strapiData = await fetchStrapi<StrapiResponse<StrapiProject[]>>('projects', {
      populate: '*',
      sort: 'order:asc',
      'pagination[pageSize]': '100',
    });
  }

  if (strapiData && strapiData.data && strapiData.data.length > 0) {
    return strapiData.data.map((item, index) => {
      // In Strapi v5 data items have fields directly or in attributes
      const data = (item as any).attributes || item;
      const filterGroups: string[] = [];
      if (data.inAudiovisual) filterGroups.push('audiovisual');
      if (data.inWebdesign) filterGroups.push('webdesign');
      if (data.inGraphicDesign) filterGroups.push('graphic-design');

      return {
        id: String(data.documentId || data.id || `proj-${index}`),
        title: data.title,
        category: data.category,
        description: data.description || '',
        image: getStrapiMediaUrl(data.image, defaultContent[locale].projects.items[index]?.image || ''),
        videoUrl: data.videoUrl || (data.videoFile ? getStrapiMediaUrl(data.videoFile) : undefined),
        hasPlay: Boolean(data.hasPlay),
        hasAwards: Boolean(data.hasAwards),
        filterGroups: filterGroups.length > 0 ? filterGroups : undefined,
        cols: data.cols || defaultContent[locale].projects.items[index]?.cols,
      };
    });
  }

  // Fallback to local high-fidelity content
  return defaultContent[locale].projects.items;
}

/**
 * Fetches General Portfolio Content (Bio, Hero, Stats) with fallback
 */
export async function getPortfolioContent(locale: 'pt' | 'en' = 'pt'): Promise<ContentData> {
  const fallback = defaultContent[locale];

  let strapiData = await fetchStrapi<StrapiResponse<StrapiGeneralInfo>>('general-info', {
    populate: '*',
    locale,
  });

  // Fallback to query without locale if Strapi doesn't have i18n configured
  if (!strapiData || !strapiData.data) {
    strapiData = await fetchStrapi<StrapiResponse<StrapiGeneralInfo>>('general-info', {
      populate: '*',
    });
  }

  if (!strapiData || !strapiData.data) {
    return fallback;
  }

  const data = (strapiData.data as any).attributes || strapiData.data;

  return {
    lang: locale,
    favicon: getStrapiMediaUrl(data.favicon, ''),
    hero: {
      tagline: data.heroTagline || fallback.hero.tagline,
      name: data.heroName || fallback.hero.name,
      title: data.heroTitle || fallback.hero.title,
      description: data.heroDescription || fallback.hero.description,
      portrait: getStrapiMediaUrl(data.heroPortrait, '/images/hero_camila.png'),
    },
    about: {
      heading: data.aboutHeading || fallback.about.heading,
      paragraphs: data.aboutBio ? data.aboutBio.split('\n\n').filter(Boolean) : fallback.about.paragraphs,
      stats: data.stats && data.stats.length > 0 ? data.stats : fallback.about.stats,
      portrait: getStrapiMediaUrl(data.aboutPortrait, '/images/about_camila.png'),
    },
    projects: {
      heading: fallback.projects.heading,
      items: await getPortfolioProjects(locale),
    },
    contact: {
      heading: fallback.contact.heading,
      portrait: getStrapiMediaUrl(data.contactPortrait, '/images/contact_camila.png'),
      form: fallback.contact.form,
      socials: {
        linkedin: data.linkedinUrl || fallback.contact.socials.linkedin,
        whatsapp: data.whatsappUrl || fallback.contact.socials.whatsapp,
        email: data.contactEmail ? `mailto:${data.contactEmail}` : fallback.contact.socials.email,
      },
    },
  };
}
