import { createClient } from "@supabase/supabase-js";
import { mockProducts, mockPosts, mockReviews, creatorNames } from "./mock-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

function mockCreator(creatorId: string) {
  return {
    id: creatorId,
    full_name: creatorNames[creatorId] || "Unknown Creator",
    email: "",
    avatar_url: "",
    role: "creator",
    subscription: "pro",
    bio: "",
    website: "",
    stripe_customer_id: "",
    stripe_connect_id: "",
    created_at: "",
    updated_at: "",
  };
}

// Helper to get products (published only for public)
export async function getProducts() {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, creator:profiles(*)")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {}
  }
  // Fallback to mock data
  return mockProducts.map((p) => ({ ...p, creator: mockCreator(p.creator_id) }));
}

// Helper to get a single product by slug
export async function getProductBySlug(slug: string) {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, creator:profiles(*)")
        .eq("slug", slug)
        .single();
      if (!error && data) return data;
    } catch {}
  }
  // Fallback to mock data
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) throw new Error("Product not found");
  return { ...product, creator: mockCreator(product.creator_id) };
}

// Helper to get reviews for a product
export async function getProductReviews(productId: string) {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, user:profiles(*)")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (!error && data) return data;
    } catch {}
  }
  return mockReviews.filter((r) => r.product_id === productId);
}

// Helper to get user's wishlist
export async function getUserWishlist(userId: string) {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select("*, product:products(*)")
        .eq("user_id", userId);
      if (!error && data) return data;
    } catch {}
  }
  return [];
}

// Helper to get user's purchases
export async function getUserPurchases(userId: string) {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select("*, product:products(*)")
        .eq("user_id", userId)
        .order("purchased_at", { ascending: false });
      if (!error && data) return data;
    } catch {}
  }
  return [];
}

// Helper to get community posts
export async function getPosts() {
  if (supabaseUrl) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, author:profiles(*)")
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {}
  }
  return mockPosts;
}

// Helper to get user profile
export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (!error && data) return data;
  } catch {}
  return null;
}

// Toggle wishlist item
export async function toggleWishlist(userId: string, productId: string) {
  try {
    const { data: existing } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (existing) {
      await supabase.from("wishlists").delete().eq("id", existing.id);
      return false;
    } else {
      await supabase.from("wishlists").insert({ user_id: userId, product_id: productId });
      return true;
    }
  } catch {
    return true;
  }
}
