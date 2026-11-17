// Project screenshots are hosted on the Lovable deployment (the repo only
// holds .asset.json pointers to /__l5e/... paths, which 404 on any other host).
// Absolute URLs below work on Lovable, Vercel, Cloudflare and local preview alike.

export type ProjectStatus = "Live" | "In Progress" | "Prototype";

export interface ArchitectureLayer {
  label: string;
  nodes: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  highlight?: string;
  architecture: ArchitectureLayer[];
  howItWorks: string[];
  technicalDecisions: { decision: string; why: string }[];
  challenges: { challenge: string; resolution: string }[];
  security: string[];
  results: string[];
  techStack: string[];
  github?: string;
  demo?: string;
  /** Optional preview screenshot URL */
  image?: string;
  status: ProjectStatus;
  featured?: boolean;
}

/**
 * Add a new project by appending an object here.
 * It automatically appears in Selected Work, /projects, and gets its own case-study page.
 */
export const projects: Project[] = [
  {
    slug: "ai-customer-support-platform",
    title: "AI Customer Support Platform",
    category: "AI Engineering / RAG / Agents",
    tagline: "Conversational support with retrieval, tools, and human verification.",
    description:
      "A production-oriented AI customer support platform combining conversational AI, knowledge retrieval, order-status tools, authentication, refund workflows, and human verification.",
    problem:
      "E-commerce support teams answer the same questions repeatedly — order status, returns, policies — while sensitive actions like refunds still need control. Generic chatbots either hallucinate policy or can't take real actions.",
    solution:
      "A support assistant that grounds answers in the store's knowledge base, calls typed tools for order lookups, gates account-specific actions behind authentication, and routes refunds through a human verification step.",
    highlight: "Designed around real customer-support workflows rather than a simple chatbot demo.",
    architecture: [
      { label: "Client", nodes: ["React chat UI"] },
      { label: "API", nodes: ["FastAPI", "JWT auth"] },
      { label: "Orchestration", nodes: ["Intent routing", "Tool calling"] },
      { label: "Knowledge & Tools", nodes: ["RAG retriever", "Order status", "Refund workflow"] },
      { label: "Data", nodes: ["PostgreSQL", "Vector index"] },
    ],
    howItWorks: [
      "The customer sends a message through the chat interface.",
      "The API authenticates the session and loads conversation context.",
      "An intent step decides between a knowledge answer, a tool call, or escalation.",
      "Policy questions are answered from retrieved documents only.",
      "Order lookups call a typed tool against the database.",
      "Refund requests are drafted and held for human verification before execution.",
    ],
    technicalDecisions: [
      { decision: "Typed tools instead of free-form SQL", why: "Constrains what the model can do and makes every action auditable." },
      { decision: "OpenRouter as the LLM gateway", why: "Allows switching models for cost/quality without changing application code." },
      { decision: "Human-in-the-loop for refunds", why: "Money-moving actions need a deterministic approval step, not model judgement." },
    ],
    challenges: [
      { challenge: "Model answering policy questions from its own priors", resolution: "Strict grounding prompt plus a fallback when retrieval confidence is low." },
      { challenge: "Keeping conversation state across tool calls", resolution: "Persisted message history in PostgreSQL keyed to the authenticated session." },
    ],
    security: ["JWT-based authentication", "Account data scoped to the signed-in user", "Refunds require human approval", "Secrets kept server-side"],
    results: ["Working end-to-end support flow covering FAQs, order status, and refunds", "Containerised with Docker for reproducible deployment"],
    techStack: ["Python", "FastAPI", "PostgreSQL", "RAG", "LLMs", "OpenRouter", "JWT", "Docker", "React"],
    github: "https://github.com/MudaserShah/AI-CUSTOMER-CHATBOT",
    image: "/ai-customer-support.png",
    status: "In Progress",
    featured: true,
  },
  {
    slug: "agentic-researcher",
    title: "Agentic Researcher",
    category: "Agentic AI / RAG",
    tagline: "Multi-step research agent with web search and streaming output.",
    description:
      "An agentic research system that combines web research, knowledge retrieval, structured workflows, and streaming responses to produce research results.",
    problem:
      "Research tasks require planning, searching multiple sources, and synthesising findings — a single LLM call produces shallow, unsourced answers.",
    solution:
      "A LangGraph workflow that plans sub-questions, gathers sources via web search, stores context in a vector store, and streams a structured report back to the user.",
    architecture: [
      { label: "Client", nodes: ["Web UI", "SSE stream"] },
      { label: "API", nodes: ["FastAPI"] },
      { label: "Agent Graph", nodes: ["Planner", "Researcher", "Writer"] },
      { label: "Tools", nodes: ["Tavily search", "Retriever"] },
      { label: "Memory", nodes: ["Qdrant"] },
    ],
    howItWorks: [
      "The user submits a research question.",
      "A planner node breaks it into focused sub-questions.",
      "Researcher nodes run web searches and store relevant passages.",
      "A writer node retrieves the best context and drafts a structured report.",
      "Progress and output stream to the client over SSE.",
    ],
    technicalDecisions: [
      { decision: "LangGraph over a linear chain", why: "Explicit state and nodes make multi-step behaviour inspectable and easier to debug." },
      { decision: "Server-Sent Events for output", why: "Long research runs need visible progress; SSE is simpler than WebSockets for one-way streams." },
      { decision: "Qdrant for intermediate context", why: "Keeps the writer's context focused instead of stuffing every search result into the prompt." },
    ],
    challenges: [
      { challenge: "Agents looping on repeated searches", resolution: "Bounded iteration counts and state tracking of queries already run." },
      { challenge: "Noisy web results", resolution: "Relevance filtering before passages are written to the vector store." },
    ],
    security: ["API keys stored server-side", "Bounded agent iterations to cap cost", "Input length limits"],
    results: ["Live demo deployed", "Structured, sourced research reports streamed in real time", "Reports exportable as PDF, with research history saved for later review"],
    techStack: ["Python", "FastAPI", "LangGraph", "LangChain", "OpenAI", "RAG", "Qdrant", "Tavily", "Pydantic", "SSE", "React", "Vite"],
    github: "https://github.com/MudaserShah/Langgraph-Agentic-Researcher",
    demo: "https://langgraph-agentic-researcher.vercel.app",
    image: "https://delightful-showcase-portfolio.lovable.app/__l5e/assets-v1/ac9f2e41-dae8-4d01-ba98-86f554d30358/researcher.jpg",
    status: "Live",
    featured: true,
  },
  {
    slug: "document-butler",
    title: "Document Butler",
    category: "RAG / Document Intelligence",
    tagline: "Grounded answers over your documents, with citations.",
    description:
      "A document question-answering system that processes multiple document formats, retrieves relevant content, and provides grounded answers with document-level citations.",
    problem:
      "Small teams keep knowledge in scattered PDFs and docs. Finding an answer means opening files one by one, and generic chat tools can't cite where an answer came from.",
    solution:
      "An ingestion pipeline that parses multiple formats, chunks and embeds content into Qdrant, and an answer endpoint that responds only from retrieved passages with citations.",
    architecture: [
      { label: "Ingest", nodes: ["Upload", "Parsers"] },
      { label: "Process", nodes: ["Chunking", "Embeddings"] },
      { label: "Store", nodes: ["Qdrant"] },
      { label: "Answer", nodes: ["Retriever", "LLM", "Citations"] },
    ],
    howItWorks: [
      "Documents are uploaded and parsed by format.",
      "Text is chunked with overlap and embedded.",
      "Chunks are stored in Qdrant with source metadata.",
      "Questions retrieve the top relevant chunks.",
      "The LLM answers from those chunks and cites the source documents.",
    ],
    technicalDecisions: [
      { decision: "Source metadata on every chunk", why: "Citations are only trustworthy if they trace back to the exact document." },
      { decision: "Refuse when context is missing", why: "A clear 'not found' is more useful than a confident hallucination." },
    ],
    challenges: [
      { challenge: "Inconsistent text extraction across formats", resolution: "Format-specific parsers normalised into one document schema." },
      { challenge: "Chunk size vs. answer quality", resolution: "Tuned chunk size and overlap against a set of sample questions." },
    ],
    security: ["Upload type and size validation", "Server-side model keys"],
    results: ["Live demo deployed", "Answers include document-level citations"],
    techStack: ["Python", "FastAPI", "LangChain", "Qdrant", "Embeddings", "RAG", "Next.js", "React", "TypeScript", "Tailwind CSS", "sentence-transformers"],
    github: "https://github.com/MudaserShah/Production-QA-RAG",
    demo: "https://production-qa-rag-tau.vercel.app/",
    image: "https://delightful-showcase-portfolio.lovable.app/__l5e/assets-v1/94ec3070-c16e-4c3f-b986-a2191add218e/butler.jpg",
    status: "Live",
    featured: true,
  },
  {
    slug: "rag-evaluation-pipeline",
    title: "RAG Evaluation Pipeline",
    category: "RAG / Evaluation",
    tagline: "Measuring retrieval and answer quality instead of guessing.",
    description: "An evaluation pipeline for RAG systems that scores retrieval relevance and answer faithfulness across a test set.",
    problem: "Most RAG apps are tuned by feel. Without measurement, changes to chunking, models, or prompts can silently make things worse.",
    solution: "A repeatable evaluation harness that runs a question set through the pipeline and reports retrieval and answer-quality metrics.",
    architecture: [
      { label: "Dataset", nodes: ["Questions", "References"] },
      { label: "Pipeline", nodes: ["Retriever", "Generator"] },
      { label: "Evaluate", nodes: ["Relevance", "Faithfulness"] },
      { label: "Report", nodes: ["Metrics"] },
    ],
    howItWorks: ["Define a test set of questions.", "Run each through the RAG pipeline.", "Score retrieval and answers.", "Compare runs across configurations."],
    technicalDecisions: [{ decision: "Evaluation as a separate pipeline", why: "Lets any RAG project be measured the same way." }],
    challenges: [{ challenge: "Building a representative test set", resolution: "Work in progress." }],
    security: ["N/A — offline evaluation"],
    results: ["In progress"],
    techStack: ["Python", "RAG", "LLMs", "Evaluation"],
    github: "https://github.com/MudaserShah/RAG-EVAL-PROJECT",
    status: "In Progress",
  },
  {
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    category: "AI Automation / Workflow Engineering",
    tagline: "Workflows that take repetitive work off people's plates.",
    description:
      "Automation workflows combining AI agents, APIs, triggers, structured data, and business processes to reduce repetitive manual work.",
    problem: "Teams lose hours to copy-paste work between tools — triaging inbound leads, enriching records, routing requests.",
    solution: "Trigger-based workflows that combine deterministic steps with LLM steps only where judgement is needed, writing structured results back into existing tools.",
    architecture: [
      { label: "Trigger", nodes: ["Webhook", "Schedule"] },
      { label: "Workflow", nodes: ["n8n / Make"] },
      { label: "Steps", nodes: ["APIs", "LLM step", "Validation"] },
      { label: "Output", nodes: ["CRM", "Sheets", "Notifications"] },
    ],
    howItWorks: ["An event triggers the workflow.", "Data is fetched and normalised.", "An LLM classifies or extracts where needed.", "Outputs are validated.", "Results are written back and the team is notified."],
    technicalDecisions: [{ decision: "Deterministic logic first, AI second", why: "Cheaper, faster, and more predictable where rules suffice." }],
    challenges: [{ challenge: "Unstructured LLM output breaking downstream steps", resolution: "Structured output with validation and a retry path." }],
    security: ["Credentials stored in the automation platform's vault", "Webhook verification"],
    results: ["In progress"],
    techStack: ["n8n", "Make", "APIs", "LLMs", "Webhooks"],
    status: "In Progress",
  },

  {
    slug: "dental-clinic-website",
    title: "Dental Clinic Website — Center of Dental Implant & Face Surgery",
    category: "Web / Client Website",
    tagline: "Real clinic website for a Wah Cantt dental & maxillofacial surgery centre, with per-service photo galleries.",
    description:
      "A production client website for the Center of Dental Implant & Face Surgery in Wah Cantt, led by Dr. Sayed Mustafa (BDS, FCPS). It presents 19 services — implants, wisdom-tooth surgery, braces, aligners, root canal, jaw surgery and more — with real clinic and case photos, a clinic gallery, testimonials and contact details.",
    problem:
      "A specialist clinic's patients need to see real work, not stock photos: what each procedure involves, what the clinic looks like, and who the surgeon is — before they book.",
    solution:
      "A fast, image-led website built around the clinic's own photos. Every service has its own gallery page with real case photos and X-rays, plus a clinic gallery, doctor profile, testimonials and clear contact / location information.",
    highlight: "Built with the client's real photos — 19 services, each with its own case gallery.",
    architecture: [
      { label: "Client", nodes: ["React 19", "TanStack Router"] },
      { label: "Content", nodes: ["Service data", "Real case photos"] },
      { label: "Pages", nodes: ["Homepage", "Per-service galleries", "Clinic gallery"] },
      { label: "Build", nodes: ["TanStack Start", "Vite", "Tailwind CSS 4"] },
    ],
    howItWorks: [
      "Visitors browse the 19 services on the homepage grid.",
      "Clicking a service opens its own gallery page with real case photos.",
      "The clinic gallery shows the building, treatment rooms and office.",
      "The doctor profile, qualifications and testimonials build trust.",
      "Contact and location details are one tap away.",
    ],
    technicalDecisions: [
      { decision: "Real photos instead of stock images", why: "Patients trust a clinic they can actually see — treatment rooms, X-rays and results." },
      { decision: "Per-service gallery routes", why: "Each procedure gets its own shareable page instead of one long list." },
      { decision: "TanStack Start + Tailwind CSS 4", why: "Fast, type-safe routing and styling for an image-heavy site." },
    ],
    challenges: [
      { challenge: "Large set of real client photos in many formats", resolution: "Organised by service in a typed data file, so adding or swapping a photo is one import." },
      { challenge: "Keeping 19 services consistent", resolution: "One ServiceItem type drives the grid and every gallery page." },
    ],
    security: ["No patient data collected on the site", "Contact via phone / WhatsApp only"],
    results: ["Live at serene-mouth-gallery.vercel.app", "19 services with real case-photo galleries", "Clinic gallery, doctor profile and testimonials live on the site", "4.9\u2605 from 329+ Google reviews shown on the live site"],
    techStack: ["React", "TypeScript", "TanStack Start", "TanStack Router", "Tailwind CSS", "Vite"],
    github: "https://github.com/MudaserShah/serene-mouth-gallery",
    demo: "https://serene-mouth-gallery.vercel.app/",
    image: "https://serene-mouth-gallery.vercel.app/assets/clinic-treatment-room-1-BYj0foGU.jpeg",
    status: "Live",
    featured: true,
  },
  {
    slug: "cakoo-bakery",
    title: "Cakoo Bakery — Online Bakery Store",
    category: "Web / E-commerce / WordPress",
    tagline: "Fresh-baked online store for Attock, Wah Cantt & Hazro — 50+ items, 60-minute delivery, WhatsApp ordering.",
    description:
      "The live online store for Cakoo Bakery, serving Attock, Wah Cantt and Hazro. Customers browse 50+ menu items — signature cakes, cheesecakes, dream cakes, cream cakes, sundaes, brownies, cookies and tea cakes — and order for pickup or home delivery.",
    problem:
      "A local bakery needs orders beyond walk-ins: customers want to see the menu, check what's fresh, and order quickly from their phone.",
    solution:
      "A WordPress + WooCommerce store with a custom bakery theme, hero video, full menu, pickup and home-delivery options, and WhatsApp ordering — so a customer can go from browsing to ordering in minutes.",
    highlight: "Live store taking real orders — 60-minute delivery across three cities.",
    architecture: [
      { label: "Storefront", nodes: ["WordPress", "Custom theme"] },
      { label: "Commerce", nodes: ["WooCommerce", "Menu & catalogue"] },
      { label: "Ordering", nodes: ["Pickup", "Home delivery", "WhatsApp order"] },
      { label: "Content", nodes: ["Hero video", "Menu photos", "Offers"] },
    ],
    howItWorks: [
      "Customers browse the menu — signature cakes, cheesecakes, dream cakes and more.",
      "They choose pickup from the counter or home delivery.",
      "Orders go through WhatsApp for a fast, familiar checkout.",
      "Fresh items are delivered in about 60 minutes.",
    ],
    technicalDecisions: [
      { decision: "WordPress + WooCommerce over a custom build", why: "The bakery team can update the menu and offers themselves, without a developer for every change." },
      { decision: "WhatsApp ordering alongside the store", why: "Customers in this market already order on WhatsApp — meeting them there removes friction." },
      { decision: "Custom theme with hero video", why: "A bakery sells on appetite — video and photos do the work a plain list cannot." },
    ],
    challenges: [
      { challenge: "Menu changes often", resolution: "WooCommerce catalogue lets the bakery update items and prices directly." },
      { challenge: "Customers in three cities", resolution: "Clear delivery areas — Attock, Wah Cantt and Hazro — stated up front on the site." },
    ],
    security: ["Orders handled via WhatsApp — no card details stored on the site"],
    results: ["Live store at cakoobakery.shop", "50+ menu items, 100% fresh daily, 60-minute delivery"],
    techStack: ["WordPress", "WooCommerce", "Custom Theme", "PHP", "JavaScript", "WhatsApp Ordering"],
    demo: "https://cakoobakery.shop/",
    image: "https://cakoobakery.shop/wp-content/uploads/2026/10/10-2-1-1024x853.jpeg",
    status: "Live",
    featured: true,
  },
  {
    slug: "brea-garbage-disposal-website",
    title: "Brea Garbage Disposal Pros — Local Service Website",
    category: "Web / Local SEO / Lead Generation",
    tagline: "Direct-provider service website for Brea, CA — 25 pages, local SEO, guides and call-first conversion.",
    description:
      "A 25-page local service website for Brea Garbage Disposal Pros in Brea, California. It covers replacement, installation and repair for homes and businesses, with symptom-led guide pages, neighbourhood pages, FAQ schema and a call-first flow — phone (714) 415-6595.",
    problem:
      "Homeowners with a humming, leaking or dead disposal need one thing fast: a local team they trust, and a phone number to call. A generic page does not convert.",
    solution:
      "A direct-provider site written as the local team itself: clear services, an honest repair-vs-replace guide, the exact problems people search for (humming, smell, won't turn on, leaking from the bottom), and a simple process — call, inspect, upfront options, work, test and clean up.",
    highlight: "Built to turn searches into calls — every page ends with a clear next step.",
    architecture: [
      { label: "Site", nodes: ["Static HTML/CSS/JS", "25 pages"] },
      { label: "SEO", nodes: ["Local keywords", "FAQ schema", "Sitemap"] },
      { label: "Content", nodes: ["Service pages", "Guide pages", "Neighbourhood pages"] },
      { label: "Conversion", nodes: ["Call CTAs", "Sticky call bar"] },
      { label: "Hosting", nodes: ["Cloudflare Pages"] },
    ],
    howItWorks: [
      "A homeowner searches a symptom — humming, leaking, won't turn on.",
      "They land on a guide page that explains the problem in plain language.",
      "Service and neighbourhood pages show what the team does and where.",
      "Every page leads to the same action: call (714) 415-6595.",
    ],
    technicalDecisions: [
      { decision: "Static site on Cloudflare Pages", why: "Fast, cheap and reliable for a content-led local site — no server to maintain." },
      { decision: "Direct-provider voice throughout", why: "Visitors trust a local team ('our technicians') far more than a referral directory." },
      { decision: "Symptom-led guide pages with FAQ schema", why: "People search symptoms, not service names — each guide targets a real query." },
    ],
    challenges: [
      { challenge: "New domain, no rankings at launch", resolution: "Built 25 interlinked pages around real Brea queries, submitted the sitemap, and requested indexing page by page." },
      { challenge: "Keeping every phone number consistent", resolution: "One number site-wide, verified across all pages before each deploy." },
    ],
    security: ["No user data collected", "Call-only conversion — no forms storing personal details"],
    results: ["Live at garbagedisposalbreaca.com", "25-page site with sitemap, guides and FAQ schema", "Phone and service details verified live on every deploy"],
    techStack: ["HTML", "CSS", "JavaScript", "Cloudflare Pages", "Local SEO", "Schema.org"],
    demo: "https://garbagedisposalbreaca.com/",
    image: "https://garbagedisposalbreaca.com/assets/img/hero-disposal-installation.webp",
    status: "Live",
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
