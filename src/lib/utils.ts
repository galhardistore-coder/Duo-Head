import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
export const getDriveVideoUrl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
export const getDriveViewerUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export const ASSETS = {
  VIDEOS: {
    HERO: '15RzKa3smvsyk_co7LxID7SuRARuzDDl0',
    SEC1: '16QKWib1xI0R0_SmUiYcQG2GFjxTtbmrR',
    SEC2: '1cs7tdebI9kbUuvOUefhZI5-yMmzvtLEu',
  },
  IMAGES: {
    GALLERY: [
      '13BwSrdnX1SCiTiwGoQsA3oTwvX7RJpPt',
      '11ylUirsBP0SV8b68VgoCDB5b5q7nP3YH',
      '18q2Wt2YwqBigh_xf5jdkBDDReXu1Q0YC',
      '1pfuBic_7Tz3xebc76veVxW7fuaKvJnDf',
    ],
    PRODUCT: '1nIHfTSThCKhqD1SZPrnRxNJX2d2e-X2a',
    BENEFITS: [
      '1I1NKanAVYzPJ18-QlHms0r1WMde5AJql',
      '1xUiky54rlBjAk_NK6C9xAZm5LmoL7Sbv',
    ],
    DIFFERENTIALS: '1D4_66cs0015_3g-jATZMHabVVtECYJS-',
    SOCIAL_PROOF: '11OXKSx3Rfa8fKv58JQcAdC267chsiSRB',
    VARIATIONS: [
      { name: 'Brasil: Verde e Amarelo', id: '17E0SmZkUUDcVXXdsLAcYjOCNyhalfsvS' },
      { name: 'Brasil: Verde e Azul', id: '10UphD9Vx7Y_LX8n2_8JR08CsvKJc1kLL' },
      { name: 'Brasil: Azul e Amarelo', id: '1MQCbj4SrFi_rDhGtrUdpEsN3SWzmLirS' },
      { name: 'Azul Claro', id: '15ryUw3pIEII3Jyxv1BqAQeE8bvXGTPoB' },
      { name: 'Azul Royal', id: '1rkM1OLeWvDiqIMj4WvuGo3P_vaWUAjb_' },
      { name: 'Laranja', id: '1Uwu5yqCIS6QEa8MbLIOvWn58VjUfFfGI' },
      { name: 'Preto', id: '1wAUK00YYkwmdwv2BCW-6hxdreE4zGFsS' },
      { name: 'Rosa', id: '1fxM22o9RyHa8EFwN2OoanKoHVkG3pZcj' },
      { name: 'Verde Claro', id: '1HKKxh3HOfcbtMmL3r0dyEDehBj56r1g1' },
      { name: 'Verde Escuro', id: '1XZsZBe4uRydfk1SE_XfnXWg2azxC_0cP' },
      { name: 'Verde Limão', id: '1eoB2i4sFE6LXLMRgyvvIy55RJQVmRtJL' },
      { name: 'Verde Militar', id: '1IjaxJAzEEsLtFmDIJGpEjiPRf4g5kGPh' },
    ],
  },
  LINKS: {
    INSTAGRAM: 'https://www.instagram.com/duohead_/',
    SHOPEE: 'https://shopee.com.br', // Placeholder, the user didn't provide the exact link but asked for Shopee route
    WHATSAPP: 'https://wa.me/5511995250701',
  },
  PRODUCTS: {
    SUPPORT_ONLY_MACH3: {
      name: "Suporte Mach3 (Sem lâmina)",
      description: "Apenas o suporte para quem já possui a lâmina Mach3.",
      priceOld: "64,90",
      priceNew: "45,43",
      link: "https://buy.stripe.com/14AcN6ac05ca9FtfoI8k800"
    },
    SUPPORT_ONLY_FUSION5: {
      name: "Suporte Fusion5 (Sem lâmina)",
      description: "Apenas o suporte para quem já possui a lâmina Fusion5.",
      priceOld: "64,90",
      priceNew: "45,43",
      link: "https://buy.stripe.com/7sY4gAac0342g3R90k8k801"
    },
    SUPPORT_WITH_FUSION5: {
      name: "Kit Suporte + Lâmina Fusion5",
      description: "Suporte premium + Refil de lâmina Fusion5 incluso.",
      priceOld: "114,90",
      priceNew: "80,43",
      link: "https://buy.stripe.com/eVqbJ2fwkeMKaJx7Wg8k803",
      featured: true
    },
    SUPPORT_WITH_MACH3: {
      name: "Kit Suporte + Lâmina Mach3",
      description: "Suporte premium + Refil de lâmina Mach3 incluso.",
      priceOld: "99,90",
      priceNew: "69,93",
      link: "https://buy.stripe.com/4gM7sMbg4dIG18XekE8k802",
      featured: true
    }
  }
};
