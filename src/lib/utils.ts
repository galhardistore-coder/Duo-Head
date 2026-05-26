import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import siteConfig from '../data/site-config.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
export const getDriveVideoUrl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
export const getDriveViewerUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export { siteConfig };

export const ASSETS = {
  VIDEOS: {
    HERO: siteConfig.assets.videos.hero,
    SEC1: siteConfig.assets.videos.sec1,
    SEC2: siteConfig.assets.videos.sec2,
  },
  IMAGES: {
    GALLERY: siteConfig.assets.images.gallery,
    PRODUCT: siteConfig.assets.images.product,
    BENEFITS: siteConfig.assets.images.benefits,
    DIFFERENTIALS: siteConfig.assets.images.differentials,
    SOCIAL_PROOF: siteConfig.assets.images.social_proof,
    VARIATIONS: siteConfig.assets.images.variations,
  },
  LINKS: {
    INSTAGRAM: siteConfig.links.instagram,
    SHOPEE: siteConfig.links.shopee,
    WHATSAPP: siteConfig.links.whatsapp,
  },
  PRODUCTS: siteConfig.products
};

