// types.ts

export type Lang = "ar" | "he";

export interface BlogSection {
  heading: string;
  body?: string;
  items?: string[];
}

export interface BlogContent {
  title: string;
  intro: string;
  sections: BlogSection[];
}
export interface IProductShowCase {
  heading: string;
  body?: string;
  tags: string[];
  used: string[];
  rate: string;
  improvement: string;
  duration: string;
  afterImage: string;
  beforeImage: string;
  items?: string[];
}

export interface BlogPost {
  id: string;            // unique slug or id
  ar: BlogContent;       // Arabic content
  he: BlogContent;       // Hebrew content
  tag?: string;          // optional category/tag
  date?: string;         // publish date
  image?: string;        // optional thumbnail
}
export interface IHome {
  hero_section: IHero;
}
export interface IHero {
  id: number;
  title: string;
  description: string;
  image_url: string;
  mobile_image_url: string;
  experience: string;
  lang: string;
}

export interface IAbout {
  id: number;
  description: string;
  features: string[];
  lang: string;
  image: string;
}

export interface IVideo {
  id: number;
  type: string;
  thumbnail: string;
  video_url: string;
}
export interface ITestimonial {
  id: number;
  name: string;
  rate: number;
  order: number;
  description: string;
  active: boolean,

}

type TPlatform = "phone" | "email" | "address" | "facebook" | "instagram" | "whats" | "locationAr" | "locationHe" | "fax";
export interface IContact {
  platform: TPlatform;
  url: string;
}
export interface ISlider {
  id: number;
  title: string;
  image: string;
  description: string;
}



type Category = {
  id: number;
  name: string;
  image: string | null;
};

type Product = {
  id: number;
  name: { ar: string; he: string };
  image: string | null;
  price: string;
};

export interface IService {
  id: number;
  title: string;
  description: string;
  features: string[];
  lang: string;
  icon: string;
  link: string;
  active: boolean;
}
export interface IVideo {
  id: number;
  type: string;
  description: string;
  thumbnail: string;
  path: string;
}
export interface ISuccessStory {
  id: number
  active: boolean
  description: string
  owner_name: string
  thumbnail: string
  url: string
}
export interface IWhyChooseUs {
  id: number
  active: boolean
  description: string
  order: string
  image: string
  title: string
}
export interface IHeroSlider {
  id: number
  description: string
  link: string
  image: string
  title: string
}
export interface ISettings {
  years_of_experience: number | null;
  address: string;
  contact: {
    mobile: string;
    email: string;
    whatsapp: string | null;
  };
  social_media: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  legal_documents: {
    privacy_policy: string;
    terms_conditions: string;
    faq: string;
    disclaimer: string;
  }

}
export type HomePageData = {
  settings: ISettings
  categories: Category[];
  products: Product[];
  sliders: IHeroSlider[];
  site_settings: { phone: string; email: string; address: string };
  about_office: IAbout;
  services: IService[];
  videos: IVideo[];
  sucess_stories: IVideo[];
  how_we_works: IWhyChooseUs[];
  appointment_types: string[];
  customer_rates: ITestimonial[];
  why_choose_us: IWhyChooseUs[];
  articles: TArticle[]
};
export interface appointmentType {
  id: number,
  name: string,
  active: string,
  order: number
};

export type TArticleType = {
  id: number;
  name: string;
};

export type TArticleContent = {
  id: number;
  title: string;
  features: string[];
  created_at: string; // ISO date
  active: number | boolean;
};

export type TArticle = {
  id: number;
  title: string;
  description: string;
  active: boolean;
  published_at: string; // ISO date
  article_type: TArticleType;
  article_contents: TArticleContent[];
};
