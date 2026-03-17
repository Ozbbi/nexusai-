export interface Product {
  id: string;
  creator_id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  gradient: string;
  accent_color: string;
  rating: number;
  download_count: number;
  api_endpoint: string;
  documentation_url: string;
  auth_type: string;
  websocket_support: boolean;
  version: string;
  license: string;
  status: "draft" | "review" | "published" | "rejected";
  features: string[];
  created_at: string;
  updated_at: string;
  creator?: Profile;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: "buyer" | "creator" | "admin";
  subscription: "free" | "starter" | "pro" | "enterprise";
  bio: string;
  website: string;
  stripe_customer_id: string;
  stripe_connect_id: string;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  price_paid: number;
  commission: number;
  purchased_at: string;
  product?: Product;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: Profile;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  added_at: string;
  product?: Product;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  reply_count: number;
  pinned: boolean;
  created_at: string;
  author?: Profile;
}
