
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
export interface IProduct {
  id: string,
  slug: string,
  category: {
    id: number,
    name: string
  },
  name: string,
  description: string,
  image: string,
  discount: string,
  price: number,
  featured: boolean,
  active: boolean,
  order: number,
  rate_count: number,
  quantity: number
  how_to_use: string,
  attachments: {
    id: number,
    file_name: string,
    file_path: string,
    created_at: string
  }[]

}
export interface IFAQ {

  items: [
    {
      id: number,
      question: string,
      answer: string
    }
  ],
  meta: {
    pagination: {
      total_items: number,
      total_pages: number,
      current_page: number,
      items_per_page: number,
      count: number,
      from: number,
      to: number
    },
    links: {
      first: string,
      last: string,
      prev: null,
      next: null
    },
    has_pages: boolean,
    has_more_pages: boolean,
    is_first_page: boolean,
    is_last_page: boolean
  }

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

export interface ICoupon {
  id: number;
  code: string;
  discount: string;
  expiry_date: string;
  active: boolean;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  message: string;
}
export interface ITestimonial {
  id: number;
  name: string;
  rate: number;
  order: number;
  image: string;
  description: string;
  active: boolean,

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
export interface ICompare {
  image_before: string
  image_after: string

}
export interface ISettings {
  years_of_experience: number | null;
  logo: string;
  address: string;
  see_the_transformation: ICompare;
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
export interface IContact {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}
export interface IResult {
  id: number
  name: string
  description: string
  image_before: string
  image_after: string
  duration: string
  products: {
    id: number
    name: string
    image: string
  }[]
}

export type HomePageData = {
  settings: ISettings
  categories: Category[];
  products: IProduct[];
  sliders: IHeroSlider[];
  site_settings: { phone: string; email: string; address: string };
  about_office: IAbout;
  services: IService[];
  how_we_works: IWhyChooseUs[];
  top_products: IProduct[];
  real_results: IResult[];
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

export interface IAdrress {
  id: number,
  title: string,
  price: string,
}