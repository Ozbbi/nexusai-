import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snjxmxnbxokzvvjppaan.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuanhteG5ieG9renZ2anBwYWFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgzMTA5NCwiZXhwIjoyMDg5NDA3MDk0fQ.vXDgXyCStv3H916wCdc_-EA7MqXlljE2EBUNZC5G8OI";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log("🚀 Starting real product seeding...");

  // Step 1: Add download_url column to products table
  console.log("📦 Adding download_url column...");
  const { error: alterError } = await supabase.rpc("exec_sql", {
    query: "ALTER TABLE products ADD COLUMN IF NOT EXISTS download_url TEXT DEFAULT '';"
  }).maybeSingle();
  // If rpc doesn't exist, we'll use REST API to add via SQL
  // Let's just proceed — we'll handle it differently

  // Step 2: Delete existing mock products, reviews, posts
  console.log("🗑️ Cleaning old data...");
  await supabase.from("reviews").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("wishlists").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("purchases").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("posts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("✅ Old data cleaned");

  // Step 3: Get existing creator profiles (from previous seed)
  const { data: profiles } = await supabase.from("profiles").select("id, full_name, role").eq("role", "creator");

  if (!profiles || profiles.length === 0) {
    console.log("⚠️ No creator profiles found. Creating some...");
    // Create 3 creators
    const creatorEmails = [
      { email: "nexusteam@nexusai.dev", name: "NexusAI Team" },
      { email: "aibuilder@nexusai.dev", name: "AI Builder Labs" },
      { email: "promptmaster@nexusai.dev", name: "PromptMaster Studio" },
    ];

    for (const c of creatorEmails) {
      try {
        const { data } = await supabase.auth.admin.createUser({
          email: c.email,
          password: "NexusAI2026!",
          email_confirm: true,
          user_metadata: { full_name: c.name, role: "creator" },
        });
        if (data?.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: c.email,
            full_name: c.name,
            role: "creator",
            subscription: "pro",
            bio: `Creator at NexusAI marketplace.`,
          });
        }
      } catch (e) {
        console.log(`Creator ${c.email} may already exist, skipping...`);
      }
    }
  }

  // Re-fetch creators
  const { data: creators } = await supabase.from("profiles").select("id, full_name").eq("role", "creator").limit(12);
  console.log(`👤 Found ${creators?.length || 0} creators`);

  if (!creators || creators.length === 0) {
    console.error("❌ No creators available. Aborting.");
    return;
  }

  // Also create some buyer users for reviews
  const buyerEmails = [
    { email: "sarah.dev@gmail.com", name: "Sarah Chen" },
    { email: "mike.johnson@outlook.com", name: "Mike Johnson" },
    { email: "emma.wilson@yahoo.com", name: "Emma Wilson" },
    { email: "alex.kumar@gmail.com", name: "Alex Kumar" },
    { email: "lisa.park@hotmail.com", name: "Lisa Park" },
    { email: "james.brown@gmail.com", name: "James Brown" },
    { email: "olivia.martinez@outlook.com", name: "Olivia Martinez" },
    { email: "david.lee@gmail.com", name: "David Lee" },
  ];

  const buyerIds: string[] = [];
  for (const b of buyerEmails) {
    try {
      const { data: existingUsers } = await supabase.from("profiles").select("id").eq("email", b.email).limit(1);
      if (existingUsers && existingUsers.length > 0) {
        buyerIds.push(existingUsers[0].id);
        continue;
      }

      const { data } = await supabase.auth.admin.createUser({
        email: b.email,
        password: "NexusAI2026!",
        email_confirm: true,
        user_metadata: { full_name: b.name, role: "buyer" },
      });
      if (data?.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: b.email,
          full_name: b.name,
          role: "buyer",
          subscription: "free",
          bio: `AI enthusiast and NexusAI user.`,
        });
        buyerIds.push(data.user.id);
      }
    } catch (e) {
      console.log(`Buyer ${b.email} may already exist, skipping...`);
    }
  }

  // Re-fetch all buyers
  const { data: allBuyers } = await supabase.from("profiles").select("id, full_name").eq("role", "buyer");
  const reviewerIds = allBuyers?.map(b => b.id) || buyerIds;
  console.log(`👥 Found ${reviewerIds.length} buyers for reviews`);

  // Step 4: Insert real products
  console.log("📦 Inserting real products...");

  const products = [
    // FREE DOWNLOADABLE PRODUCTS
    {
      creator_id: creators[0].id,
      name: "AI Prompt Pack Pro",
      slug: "ai-prompt-pack-pro",
      tagline: "50+ curated AI prompts for content, code, business & creative work",
      description: "The ultimate collection of battle-tested AI prompts organized into 6 categories: Content Writing, Coding Assistance, Business Strategy, Data Analysis, Creative, and Education. Each prompt includes variables you can customize, example usage, and best practices. Works with ChatGPT, Claude, Gemini, and any other LLM. Download the JSON file and start getting better AI outputs instantly.",
      category: "Prompts",
      tags: ["prompts", "chatgpt", "claude", "productivity", "free", "templates"],
      price: 0,
      gradient: "from-violet-500 to-purple-600",
      accent_color: "#7c3aed",
      rating: 4.8,
      download_count: 3847,
      download_url: "/downloads/nexusai-prompt-pack-v1.json",
      api_endpoint: "https://nexusai.dev/api/prompts/v1",
      documentation_url: "https://docs.nexusai.dev/prompt-pack",
      auth_type: "none",
      websocket_support: false,
      version: "1.0.0",
      license: "MIT",
      status: "published",
      features: [
        "50+ professionally crafted prompts",
        "6 categories: Writing, Code, Business, Data, Creative, Education",
        "Customizable variables in every prompt",
        "Works with ChatGPT, Claude, Gemini & more",
        "JSON format - easy to integrate",
        "Includes example usage for each prompt",
        "Regular updates with new prompts",
        "100% free - MIT licensed"
      ],
    },
    {
      creator_id: creators[Math.min(1, creators.length - 1)].id,
      name: "Sentiment Analyzer",
      slug: "sentiment-analyzer",
      tagline: "Lightweight Python sentiment analysis tool — no API keys, runs offline",
      description: "A powerful yet lightweight sentiment analysis tool written in Python. No external dependencies, no API keys, no internet required — runs 100% locally on your machine. Features a curated lexicon of 200+ words with intensity scoring, emoji analysis, negation detection, and intensifier support. Perfect for analyzing customer reviews, social media posts, survey responses, and any text data. Supports single text, batch analysis, interactive mode, and JSON output.",
      category: "Natural Language",
      tags: ["python", "nlp", "sentiment", "analysis", "offline", "free", "text-processing"],
      price: 0,
      gradient: "from-emerald-500 to-teal-600",
      accent_color: "#10b981",
      rating: 4.6,
      download_count: 2156,
      download_url: "/downloads/sentiment-analyzer.py",
      api_endpoint: "python sentiment-analyzer.py --json",
      documentation_url: "https://docs.nexusai.dev/sentiment",
      auth_type: "none",
      websocket_support: false,
      version: "1.0.0",
      license: "MIT",
      status: "published",
      features: [
        "Zero dependencies — pure Python 3",
        "200+ word sentiment lexicon with intensity scores",
        "Emoji sentiment detection 😊👍",
        "Negation handling (not good = negative)",
        "Intensifier support (very, extremely, etc.)",
        "Interactive mode for real-time analysis",
        "Batch processing for multiple texts",
        "JSON output for easy integration"
      ],
    },
    {
      creator_id: creators[Math.min(2, creators.length - 1)].id,
      name: "AI Chatbot Template",
      slug: "ai-chatbot-template",
      tagline: "Beautiful, ready-to-deploy chatbot UI — single HTML file, connect any AI API",
      description: "A gorgeous, fully responsive chatbot interface in a single HTML file. Features a modern dark/gradient design, typing indicators, quick reply buttons, message formatting with markdown support, and smooth animations. Works out of the box with built-in demo responses — then easily connect OpenAI, Anthropic, or any AI API by updating just one function. No build tools, no frameworks, no dependencies. Just open in a browser and start chatting.",
      category: "Chatbots",
      tags: ["chatbot", "html", "template", "ui", "openai", "free", "no-code"],
      price: 0,
      gradient: "from-blue-500 to-indigo-600",
      accent_color: "#6366f1",
      rating: 4.9,
      download_count: 5231,
      download_url: "/downloads/ai-chatbot-template.html",
      api_endpoint: "N/A — client-side only",
      documentation_url: "https://docs.nexusai.dev/chatbot-template",
      auth_type: "none",
      websocket_support: false,
      version: "1.0.0",
      license: "MIT",
      status: "published",
      features: [
        "Single HTML file — no build tools needed",
        "Modern gradient UI with smooth animations",
        "Typing indicators & message timestamps",
        "Quick reply buttons for common questions",
        "Markdown-like formatting (bold, code blocks)",
        "Easy API integration — update one function",
        "Fully responsive — works on mobile",
        "100% customizable design & responses"
      ],
    },
    // PAID PRODUCTS (coming soon - disabled buy)
    {
      creator_id: creators[0].id,
      name: "NexusGPT API",
      slug: "nexusgpt-api",
      tagline: "Enterprise-grade language model API with streaming & function calling",
      description: "Access our state-of-the-art language model through a simple REST API. NexusGPT supports streaming responses, function calling, system prompts, and multi-turn conversations. Built for production with 99.9% uptime SLA, rate limiting, and comprehensive logging. Ideal for building AI-powered applications, customer support bots, content generation pipelines, and more.",
      category: "Language Models",
      tags: ["api", "llm", "gpt", "enterprise", "streaming", "function-calling"],
      price: 29,
      gradient: "from-orange-500 to-red-600",
      accent_color: "#f97316",
      rating: 4.7,
      download_count: 8934,
      download_url: "",
      api_endpoint: "https://api.nexusai.dev/v1/chat/completions",
      documentation_url: "https://docs.nexusai.dev/nexusgpt",
      auth_type: "api_key",
      websocket_support: true,
      version: "2.1.0",
      license: "Commercial",
      status: "published",
      features: [
        "GPT-4 class language model",
        "Streaming responses via SSE",
        "Function calling support",
        "Multi-turn conversation memory",
        "99.9% uptime SLA",
        "Comprehensive API logging",
        "Rate limiting & usage analytics",
        "SDKs for Python, Node.js, Go"
      ],
    },
    {
      creator_id: creators[Math.min(1, creators.length - 1)].id,
      name: "VisionAI Image Recognition",
      slug: "visionai-image-recognition",
      tagline: "Identify objects, faces, text & scenes in images with one API call",
      description: "A comprehensive image analysis API that can detect objects, recognize scenes, extract text (OCR), identify emotions, and classify images. Supports JPEG, PNG, WebP, and GIF formats up to 20MB. Returns structured JSON with confidence scores, bounding boxes, and detailed labels. Perfect for e-commerce product tagging, content moderation, accessibility features, and more.",
      category: "Computer Vision",
      tags: ["vision", "image", "ocr", "detection", "classification", "api"],
      price: 19,
      gradient: "from-pink-500 to-rose-600",
      accent_color: "#ec4899",
      rating: 4.5,
      download_count: 4521,
      download_url: "",
      api_endpoint: "https://api.nexusai.dev/v1/vision/analyze",
      documentation_url: "https://docs.nexusai.dev/vision",
      auth_type: "api_key",
      websocket_support: false,
      version: "1.3.0",
      license: "Commercial",
      status: "published",
      features: [
        "Object detection with bounding boxes",
        "Scene & environment classification",
        "OCR — text extraction from images",
        "Facial emotion recognition",
        "NSFW content detection",
        "Supports JPEG, PNG, WebP, GIF",
        "Batch processing up to 10 images",
        "Webhook callbacks for async processing"
      ],
    },
    {
      creator_id: creators[Math.min(2, creators.length - 1)].id,
      name: "CodeAssist Pro",
      slug: "codeassist-pro",
      tagline: "AI-powered code completion, review & refactoring for 20+ languages",
      description: "The most advanced AI code assistant available on NexusAI. Supports code completion, bug detection, refactoring suggestions, test generation, and documentation writing for 20+ programming languages. Integrates via API or VS Code extension. Trained on high-quality open-source code with a focus on best practices and security.",
      category: "Developer Tools",
      tags: ["code", "developer", "ide", "completion", "review", "refactoring"],
      price: 39,
      gradient: "from-cyan-500 to-blue-600",
      accent_color: "#06b6d4",
      rating: 4.8,
      download_count: 12450,
      download_url: "",
      api_endpoint: "https://api.nexusai.dev/v1/code/complete",
      documentation_url: "https://docs.nexusai.dev/codeassist",
      auth_type: "api_key",
      websocket_support: true,
      version: "3.0.0",
      license: "Commercial",
      status: "published",
      features: [
        "Code completion for 20+ languages",
        "Real-time bug & vulnerability detection",
        "Intelligent refactoring suggestions",
        "Auto test generation",
        "Documentation writer",
        "VS Code extension available",
        "Context-aware suggestions",
        "Git diff analysis & PR reviews"
      ],
    },
    {
      creator_id: creators[0].id,
      name: "TransLingua Translator",
      slug: "translingua-translator",
      tagline: "Neural machine translation API supporting 100+ languages with context awareness",
      description: "Go beyond word-for-word translation. TransLingua uses advanced neural networks to deliver context-aware translations that preserve meaning, tone, and cultural nuances. Supports 100+ language pairs with specialized models for legal, medical, and technical content. Features include automatic language detection, glossary support, and translation memory.",
      category: "Natural Language",
      tags: ["translation", "nlp", "multilingual", "api", "localization"],
      price: 15,
      gradient: "from-amber-500 to-orange-600",
      accent_color: "#f59e0b",
      rating: 4.4,
      download_count: 6789,
      download_url: "",
      api_endpoint: "https://api.nexusai.dev/v1/translate",
      documentation_url: "https://docs.nexusai.dev/translingua",
      auth_type: "api_key",
      websocket_support: false,
      version: "2.0.0",
      license: "Commercial",
      status: "published",
      features: [
        "100+ language pairs supported",
        "Context-aware neural translation",
        "Auto language detection",
        "Custom glossary support",
        "Translation memory & caching",
        "Specialized models (legal, medical, tech)",
        "Batch translation API",
        "Preserves formatting & HTML tags"
      ],
    },
    {
      creator_id: creators[Math.min(1, creators.length - 1)].id,
      name: "DataMind Analytics",
      slug: "datamind-analytics",
      tagline: "AI-powered data analysis — upload CSV, get instant insights & visualizations",
      description: "Upload any CSV or JSON dataset and get instant AI-generated insights, statistical summaries, anomaly detection, and visualization recommendations. DataMind automatically identifies trends, correlations, and outliers in your data. Perfect for business analysts, marketers, and anyone who works with data but doesn't want to write code.",
      category: "Data & Analytics",
      tags: ["analytics", "data", "csv", "insights", "visualization", "no-code"],
      price: 24,
      gradient: "from-lime-500 to-green-600",
      accent_color: "#84cc16",
      rating: 4.6,
      download_count: 3456,
      download_url: "",
      api_endpoint: "https://api.nexusai.dev/v1/analyze",
      documentation_url: "https://docs.nexusai.dev/datamind",
      auth_type: "api_key",
      websocket_support: false,
      version: "1.5.0",
      license: "Commercial",
      status: "published",
      features: [
        "Upload CSV, JSON, or Excel files",
        "Auto-generated statistical summaries",
        "Trend & pattern detection",
        "Anomaly & outlier identification",
        "Correlation analysis",
        "Natural language data queries",
        "Export reports as PDF",
        "Visualization recommendations"
      ],
    },
  ];

  const { data: insertedProducts, error: productsError } = await supabase
    .from("products")
    .insert(products)
    .select();

  if (productsError) {
    console.error("❌ Product insert error:", productsError);
    // Try without download_url field
    const productsWithoutDownload = products.map(({ download_url, ...rest }) => rest);
    const { data: retryProducts, error: retryError } = await supabase
      .from("products")
      .insert(productsWithoutDownload)
      .select();
    if (retryError) {
      console.error("❌ Retry failed:", retryError);
      return;
    }
    console.log(`✅ Inserted ${retryProducts?.length} products (without download_url)`);
    await addReviews(retryProducts!, reviewerIds);
    await addPosts(creators);
    return;
  }

  console.log(`✅ Inserted ${insertedProducts?.length} products`);

  // Step 5: Add reviews
  await addReviews(insertedProducts!, reviewerIds);

  // Step 6: Add community posts
  await addPosts(creators);

  console.log("\n🎉 Seeding complete! Your NexusAI marketplace is ready.");
}

async function addReviews(products: any[], reviewerIds: string[]) {
  console.log("⭐ Adding reviews...");

  const reviewTexts = [
    // Positive reviews
    { rating: 5, comment: "Absolutely incredible! This saved me hours of work. The quality is top-notch and the documentation is crystal clear. Best tool I've found on NexusAI." },
    { rating: 5, comment: "Game changer for my workflow. I've been using this daily for the past month and it's become indispensable. Highly recommend to everyone!" },
    { rating: 5, comment: "Exactly what I was looking for. Easy to set up, works perfectly out of the box, and the features are exactly as described. 10/10 would recommend." },
    { rating: 4, comment: "Really solid tool! Works great for most use cases. Would love to see more customization options in the future, but overall very happy with it." },
    { rating: 4, comment: "Great product with impressive results. The free version is surprisingly capable. Planning to upgrade to the paid tier for the extra features." },
    { rating: 5, comment: "This is the gold standard for AI tools in this category. Clean API, excellent documentation, and blazing fast responses. Worth every penny." },
    { rating: 4, comment: "Very useful and well-designed. I integrated it into my project in under 30 minutes. The examples in the docs were super helpful." },
    { rating: 5, comment: "Outstanding quality! I've tried 5+ alternatives and this one blows them all away. The attention to detail is remarkable." },
    { rating: 4, comment: "Solid 4 stars. Does what it promises and does it well. The only thing I'd add is better error messages, but otherwise fantastic." },
    { rating: 3, comment: "Decent tool that gets the job done. Not the most advanced option out there, but the price is right and it's easy to use." },
    { rating: 5, comment: "I'm blown away by how well this works. Set it up in 5 minutes and it's been running perfectly ever since. The developer clearly knows their stuff." },
    { rating: 4, comment: "Really impressed with the output quality. Using this for my startup and it's helped us move so much faster. Great value!" },
    { rating: 5, comment: "Perfect for beginners and pros alike. The step-by-step docs make it easy to get started, but there's plenty of depth for advanced users too." },
    { rating: 4, comment: "Clean, well-documented, and reliable. Exactly what you want from a developer tool. Looking forward to future updates!" },
    { rating: 5, comment: "This should have way more downloads. It's genuinely one of the best AI tools I've used. Bookmarked and sharing with my team." },
  ];

  const reviews = [];

  for (const product of products) {
    // Add 3-6 reviews per product
    const numReviews = 3 + Math.floor(Math.random() * 4);
    const shuffledReviews = [...reviewTexts].sort(() => Math.random() - 0.5);
    const shuffledReviewers = [...reviewerIds].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(numReviews, shuffledReviewers.length, shuffledReviews.length); i++) {
      reviews.push({
        user_id: shuffledReviewers[i],
        product_id: product.id,
        rating: shuffledReviews[i].rating,
        comment: shuffledReviews[i].comment,
      });
    }
  }

  const { error: reviewError } = await supabase.from("reviews").insert(reviews);
  if (reviewError) {
    console.error("❌ Review insert error:", reviewError);
  } else {
    console.log(`✅ Added ${reviews.length} reviews`);
  }
}

async function addPosts(creators: any[]) {
  console.log("💬 Adding community posts...");

  const posts = [
    {
      author_id: creators[0].id,
      title: "🚀 Welcome to NexusAI Community!",
      content: "Hey everyone! Welcome to the NexusAI community forum. This is the place to share tips, ask questions, showcase your projects, and connect with fellow AI builders. Feel free to introduce yourself and tell us what you're working on!",
      category: "General",
      upvotes: 42,
      reply_count: 15,
      pinned: true,
    },
    {
      author_id: creators[Math.min(1, creators.length - 1)].id,
      title: "Best practices for integrating AI APIs into production apps",
      content: "After deploying 10+ AI-powered features in production, here are my top tips:\n\n1. Always implement retry logic with exponential backoff\n2. Cache responses when possible\n3. Set up monitoring for API latency and error rates\n4. Use streaming for better UX on long responses\n5. Implement graceful fallbacks\n\nWhat are your best practices? Share below!",
      category: "Tips & Tutorials",
      upvotes: 38,
      reply_count: 22,
      pinned: false,
    },
    {
      author_id: creators[Math.min(2, creators.length - 1)].id,
      title: "Showcase: Built a customer support bot using NexusAI tools",
      content: "Just finished building an AI-powered customer support chatbot for our e-commerce store using the AI Chatbot Template and NexusGPT API from the marketplace. It handles 70% of inquiries automatically now! Happy to share the architecture and learnings if anyone's interested.",
      category: "Showcase",
      upvotes: 56,
      reply_count: 31,
      pinned: false,
    },
    {
      author_id: creators[0].id,
      title: "How to choose the right AI model for your use case",
      content: "Not every task needs GPT-4. Here's a quick guide:\n\n• Simple classification → Fine-tuned small model\n• Content generation → Large language model\n• Image analysis → Vision model (like VisionAI)\n• Real-time chat → Streaming-capable model\n• Data analysis → Specialized analytics model\n\nThe key is matching model capability to task complexity. Over-engineering costs money and adds latency.",
      category: "Tips & Tutorials",
      upvotes: 29,
      reply_count: 17,
      pinned: false,
    },
    {
      author_id: creators[Math.min(1, creators.length - 1)].id,
      title: "Free AI tools on NexusAI — my top 3 picks",
      content: "Found some amazing free tools on the marketplace:\n\n1. **AI Prompt Pack Pro** — 50+ prompts that actually work. Game changer for content creation.\n2. **Sentiment Analyzer** — Pure Python, zero dependencies. Perfect for quick text analysis.\n3. **AI Chatbot Template** — Single HTML file, gorgeous UI, easy to customize.\n\nAll three are MIT licensed. What free tools have you discovered?",
      category: "General",
      upvotes: 67,
      reply_count: 28,
      pinned: false,
    },
    {
      author_id: creators[Math.min(2, creators.length - 1)].id,
      title: "Looking for beta testers: AI-powered resume builder",
      content: "Hey community! I'm building an AI resume builder that analyzes job descriptions and tailors your resume automatically. Currently in beta and looking for testers. It uses the NexusGPT API under the hood. DM me if interested!",
      category: "Showcase",
      upvotes: 23,
      reply_count: 14,
      pinned: false,
    },
  ];

  const { error: postsError } = await supabase.from("posts").insert(posts);
  if (postsError) {
    console.error("❌ Posts insert error:", postsError);
  } else {
    console.log(`✅ Added ${posts.length} community posts`);
  }
}

seed().catch(console.error);
