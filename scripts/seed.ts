import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snjxmxnbxokzvvjppaan.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuanhteG5ieG9renZ2anBwYWFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgzMTA5NCwiZXhwIjoyMDg5NDA3MDk0fQ.vXDgXyCStv3H916wCdc_-EA7MqXlljE2EBUNZC5G8OI";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log("Seeding database...");

  // Create fake creator profiles using auth.admin
  const creators: { id: string; email: string; full_name: string }[] = [];
  const creatorData = [
    { email: "neuralvox@nexusai.dev", name: "NeuralVox Labs" },
    { email: "openpixel@nexusai.dev", name: "OpenPixel Team" },
    { email: "codepilot@nexusai.dev", name: "CodePilot Inc." },
    { email: "chatweaver@nexusai.dev", name: "ChatWeaver AI" },
    { email: "datamind@nexusai.dev", name: "DataMind Analytics" },
    { email: "translingua@nexusai.dev", name: "TransLingua Foundation" },
    { email: "musicforge@nexusai.dev", name: "MusicForge Studio" },
    { email: "agentsmith@nexusai.dev", name: "AgentSmith Corp" },
    { email: "visionai@nexusai.dev", name: "VisionAI Labs" },
    { email: "writegenie@nexusai.dev", name: "WriteGenie HQ" },
    { email: "financebot@nexusai.dev", name: "FinanceBot Pro" },
    { email: "docuscan@nexusai.dev", name: "DocuScan Team" },
  ];

  for (const c of creatorData) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: c.email,
      password: "NexusAI2024!",
      email_confirm: true,
      user_metadata: { full_name: c.name },
    });
    if (error) {
      console.error(`Failed to create ${c.email}:`, error.message);
      continue;
    }
    creators.push({ id: data.user.id, email: c.email, full_name: c.name });
    // Update profile role to creator
    await supabase.from("profiles").update({ role: "creator", full_name: c.name }).eq("id", data.user.id);
    console.log(`Created creator: ${c.name} (${data.user.id})`);
  }

  if (creators.length === 0) {
    console.error("No creators were created. Aborting.");
    return;
  }

  // Insert products
  const products = [
    {
      creator_id: creators[0]?.id,
      name: "NeuralVox Pro",
      slug: "neuralvox-pro",
      tagline: "State-of-the-art voice synthesis & cloning engine",
      description: "NeuralVox Pro is the most advanced voice synthesis engine on the market. Clone any voice with just 30 seconds of audio, generate natural speech in 40+ languages, and create custom voice personas for your applications.",
      category: "Voice & Audio",
      tags: ["Voice Synthesis", "Text-to-Speech", "Voice Cloning"],
      price: 49.99,
      gradient: "from-purple-600 via-violet-600 to-indigo-600",
      accent_color: "#7c5bf5",
      rating: 4.8,
      download_count: 12400,
      api_endpoint: "https://api.nexusai.dev/v1/neuralvox",
      documentation_url: "https://docs.nexusai.dev/neuralvox",
      auth_type: "api_key",
      websocket_support: true,
      version: "3.2.1",
      license: "commercial",
      status: "published",
      features: ["Voice cloning with 30s audio", "40+ language support", "Real-time streaming", "Custom voice personas", "SSML support", "Emotion control"],
    },
    {
      creator_id: creators[1]?.id,
      name: "PixelForge",
      slug: "pixelforge",
      tagline: "Open-source image generation for everyone",
      description: "PixelForge is a free, open-source image generation model that produces stunning visuals from text prompts.",
      category: "Image Generation",
      tags: ["Image Gen", "Open Source", "Art"],
      price: 0,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      accent_color: "#00d4ff",
      rating: 4.6,
      download_count: 34100,
      api_endpoint: "https://api.nexusai.dev/v1/pixelforge",
      documentation_url: "https://docs.nexusai.dev/pixelforge",
      auth_type: "api_key",
      websocket_support: false,
      version: "2.1.0",
      license: "open-source",
      status: "published",
      features: ["Text-to-image generation", "Inpainting & outpainting", "Style transfer", "Image-to-image", "Batch processing", "Custom model training"],
    },
    {
      creator_id: creators[2]?.id,
      name: "CodePilot X",
      slug: "codepilot-x",
      tagline: "AI pair programmer that actually understands your codebase",
      description: "CodePilot X goes beyond simple code completion. It understands your entire codebase, generates tests, refactors code, and writes documentation.",
      category: "Developer Tools",
      tags: ["Code Gen", "Developer", "AI Assistant"],
      price: 29.99,
      gradient: "from-orange-500 via-red-500 to-rose-500",
      accent_color: "#ff6b35",
      rating: 4.9,
      download_count: 45200,
      api_endpoint: "https://api.nexusai.dev/v1/codepilot",
      documentation_url: "https://docs.nexusai.dev/codepilot",
      auth_type: "api_key",
      websocket_support: true,
      version: "4.0.0",
      license: "commercial",
      status: "published",
      features: ["Full codebase understanding", "30+ language support", "Test generation", "Code refactoring", "Documentation generation", "IDE integrations"],
    },
    {
      creator_id: creators[3]?.id,
      name: "ChatWeaver",
      slug: "chatweaver",
      tagline: "Build intelligent chatbots in minutes, not months",
      description: "ChatWeaver lets you create sophisticated chatbots with natural conversation flows, memory, and tool use capabilities.",
      category: "Chatbots",
      tags: ["Chatbot", "Conversational AI", "No-Code"],
      price: 19.99,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      accent_color: "#10b981",
      rating: 4.5,
      download_count: 8700,
      api_endpoint: "https://api.nexusai.dev/v1/chatweaver",
      documentation_url: "https://docs.nexusai.dev/chatweaver",
      auth_type: "api_key",
      websocket_support: true,
      version: "2.4.0",
      license: "commercial",
      status: "published",
      features: ["Visual flow builder", "Memory & context", "Tool use integration", "Multi-channel deploy", "Analytics dashboard", "Custom training"],
    },
    {
      creator_id: creators[4]?.id,
      name: "DataMind",
      slug: "datamind",
      tagline: "Turn raw data into insights with natural language",
      description: "DataMind connects to your databases and data sources, letting you query data with natural language.",
      category: "Data & Analytics",
      tags: ["Analytics", "Data Science", "Business Intelligence"],
      price: 39.99,
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      accent_color: "#f59e0b",
      rating: 4.7,
      download_count: 5300,
      api_endpoint: "https://api.nexusai.dev/v1/datamind",
      documentation_url: "https://docs.nexusai.dev/datamind",
      auth_type: "oauth",
      websocket_support: false,
      version: "1.8.0",
      license: "commercial",
      status: "published",
      features: ["Natural language queries", "Auto-visualization", "Predictive analytics", "Database connectors", "Scheduled reports", "Team collaboration"],
    },
    {
      creator_id: creators[5]?.id,
      name: "TransLingua",
      slug: "translingua",
      tagline: "Free real-time translation across 100+ languages",
      description: "TransLingua provides instant, high-quality translations across 100+ languages with context-aware understanding.",
      category: "Language",
      tags: ["Translation", "NLP", "Free"],
      price: 0,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      accent_color: "#ec4899",
      rating: 4.3,
      download_count: 22100,
      api_endpoint: "https://api.nexusai.dev/v1/translingua",
      documentation_url: "https://docs.nexusai.dev/translingua",
      auth_type: "api_key",
      websocket_support: true,
      version: "5.0.0",
      license: "open-source",
      status: "published",
      features: ["100+ languages", "Context-aware translation", "Document translation", "Real-time mode", "Domain specialization", "Glossary support"],
    },
    {
      creator_id: creators[6]?.id,
      name: "MusicForge AI",
      slug: "musicforge-ai",
      tagline: "Generate original music and soundscapes with AI",
      description: "MusicForge AI creates original, royalty-free music from text descriptions.",
      category: "Voice & Audio",
      tags: ["Music Gen", "Audio", "Creative"],
      price: 24.99,
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      accent_color: "#8b5cf6",
      rating: 4.4,
      download_count: 6800,
      api_endpoint: "https://api.nexusai.dev/v1/musicforge",
      documentation_url: "https://docs.nexusai.dev/musicforge",
      auth_type: "api_key",
      websocket_support: false,
      version: "1.5.0",
      license: "commercial",
      status: "published",
      features: ["Text-to-music generation", "50+ genres", "Sound effects", "Stem separation", "Custom training", "Royalty-free output"],
    },
    {
      creator_id: creators[7]?.id,
      name: "AgentSmith",
      slug: "agentsmith",
      tagline: "Build autonomous AI agents that get things done",
      description: "AgentSmith is the most powerful agent framework on NexusAI. Build autonomous AI agents that can browse the web, use tools, write code, manage files, and complete complex multi-step tasks.",
      category: "Agents",
      tags: ["Autonomous Agent", "Automation", "Enterprise"],
      price: 59.99,
      gradient: "from-cyan-500 via-teal-500 to-emerald-500",
      accent_color: "#06b6d4",
      rating: 4.8,
      download_count: 3200,
      api_endpoint: "https://api.nexusai.dev/v1/agentsmith",
      documentation_url: "https://docs.nexusai.dev/agentsmith",
      auth_type: "api_key",
      websocket_support: true,
      version: "2.0.0",
      license: "commercial",
      status: "published",
      features: ["Autonomous task completion", "Web browsing", "Tool use framework", "Multi-step planning", "Audit logging", "Custom tool creation"],
    },
    {
      creator_id: creators[8]?.id,
      name: "VisionAI Pro",
      slug: "visionai-pro",
      tagline: "Advanced computer vision for any application",
      description: "VisionAI Pro provides state-of-the-art computer vision capabilities including object detection, image segmentation, OCR, and scene understanding.",
      category: "Computer Vision",
      tags: ["Computer Vision", "Object Detection", "OCR"],
      price: 44.99,
      gradient: "from-red-500 via-rose-500 to-pink-500",
      accent_color: "#ef4444",
      rating: 4.6,
      download_count: 4100,
      api_endpoint: "https://api.nexusai.dev/v1/visionai",
      documentation_url: "https://docs.nexusai.dev/visionai",
      auth_type: "api_key",
      websocket_support: false,
      version: "3.1.0",
      license: "commercial",
      status: "published",
      features: ["Object detection", "Image segmentation", "OCR engine", "Scene understanding", "Edge deployment", "Real-time processing"],
    },
    {
      creator_id: creators[9]?.id,
      name: "WriteGenie",
      slug: "writegenie",
      tagline: "AI writing assistant that matches your voice",
      description: "WriteGenie adapts to your unique writing style and helps you create compelling content faster.",
      category: "Writing",
      tags: ["Writing", "Content", "SEO"],
      price: 14.99,
      gradient: "from-sky-500 via-cyan-500 to-teal-500",
      accent_color: "#22d3ee",
      rating: 4.2,
      download_count: 18500,
      api_endpoint: "https://api.nexusai.dev/v1/writegenie",
      documentation_url: "https://docs.nexusai.dev/writegenie",
      auth_type: "api_key",
      websocket_support: false,
      version: "2.3.0",
      license: "commercial",
      status: "published",
      features: ["Style matching", "SEO optimization", "Plagiarism check", "Multi-format export", "Team collaboration", "Brand voice profiles"],
    },
    {
      creator_id: creators[10]?.id,
      name: "FinanceBot",
      slug: "financebot",
      tagline: "AI-powered financial analysis and forecasting",
      description: "FinanceBot provides institutional-grade financial analysis powered by AI.",
      category: "Finance",
      tags: ["Finance", "Analytics", "Forecasting"],
      price: 79.99,
      gradient: "from-lime-500 via-green-500 to-emerald-500",
      accent_color: "#84cc16",
      rating: 4.9,
      download_count: 2100,
      api_endpoint: "https://api.nexusai.dev/v1/financebot",
      documentation_url: "https://docs.nexusai.dev/financebot",
      auth_type: "oauth",
      websocket_support: true,
      version: "1.2.0",
      license: "commercial",
      status: "published",
      features: ["Real-time analysis", "Risk assessment", "Portfolio optimization", "Predictive forecasting", "Regulatory compliance", "Custom indicators"],
    },
    {
      creator_id: creators[11]?.id,
      name: "DocuScan AI",
      slug: "docuscan-ai",
      tagline: "Free intelligent document processing and extraction",
      description: "DocuScan AI transforms unstructured documents into structured data.",
      category: "Productivity",
      tags: ["Document AI", "OCR", "Free"],
      price: 0,
      gradient: "from-violet-400 via-purple-400 to-indigo-400",
      accent_color: "#a78bfa",
      rating: 4.1,
      download_count: 31700,
      api_endpoint: "https://api.nexusai.dev/v1/docuscan",
      documentation_url: "https://docs.nexusai.dev/docuscan",
      auth_type: "api_key",
      websocket_support: false,
      version: "1.9.0",
      license: "open-source",
      status: "published",
      features: ["50+ format support", "Table extraction", "Form recognition", "Auto-classification", "Data validation", "Batch processing"],
    },
  ];

  const { data: insertedProducts, error: prodError } = await supabase
    .from("products")
    .insert(products)
    .select();

  if (prodError) {
    console.error("Failed to insert products:", prodError.message);
    return;
  }

  console.log(`Inserted ${insertedProducts?.length} products`);

  // Insert some community posts
  const posts = [
    {
      author_id: creators[0]?.id,
      title: "Getting Started with NexusAI",
      content: "Welcome to NexusAI! This guide covers everything you need to know to get started as a creator or buyer on the platform.",
      category: "general",
      upvotes: 342,
      reply_count: 234,
      pinned: true,
    },
    {
      author_id: creators[1]?.id,
      title: "Best practices for pricing your AI",
      content: "After a year of selling on NexusAI, here are my top tips for pricing your AI products effectively.",
      category: "tips",
      upvotes: 189,
      reply_count: 89,
    },
    {
      author_id: creators[2]?.id,
      title: "How I built a 10K download AI tool",
      content: "My journey from 0 to 10K downloads in 3 months, including marketing strategies and technical decisions.",
      category: "showcase",
      upvotes: 267,
      reply_count: 156,
    },
    {
      author_id: creators[3]?.id,
      title: "API optimization tips & tricks",
      content: "Advanced techniques for optimizing your AI API performance, including caching, batching, and streaming.",
      category: "tips",
      upvotes: 145,
      reply_count: 67,
    },
    {
      author_id: creators[4]?.id,
      title: "Showcase: My new image generation model",
      content: "Excited to share my latest image generation model! Check out the samples and let me know what you think.",
      category: "showcase",
      upvotes: 98,
      reply_count: 45,
    },
  ];

  const { error: postError } = await supabase.from("posts").insert(posts);
  if (postError) {
    console.error("Failed to insert posts:", postError.message);
  } else {
    console.log(`Inserted ${posts.length} posts`);
  }

  // Insert some reviews for the first product
  if (insertedProducts && insertedProducts[0]) {
    const reviews = [
      { user_id: creators[1]?.id, product_id: insertedProducts[0].id, rating: 5, comment: "Incredible voice quality. The cloning feature is unbelievably accurate." },
      { user_id: creators[2]?.id, product_id: insertedProducts[0].id, rating: 5, comment: "We integrated NeuralVox into our podcast production workflow and it saved us hours." },
      { user_id: creators[3]?.id, product_id: insertedProducts[0].id, rating: 4, comment: "Great product overall. The API is well-documented and easy to integrate." },
    ];

    const { error: reviewError } = await supabase.from("reviews").insert(reviews);
    if (reviewError) {
      console.error("Failed to insert reviews:", reviewError.message);
    } else {
      console.log(`Inserted ${reviews.length} reviews`);
    }
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
