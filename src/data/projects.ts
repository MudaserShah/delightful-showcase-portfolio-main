import researcherShot from "@/assets/researcher.jpg.asset.json";
import butlerShot from "@/assets/butler.jpg.asset.json";

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
    results: ["Live demo deployed", "Structured, sourced research reports streamed in real time"],
    techStack: ["Python", "FastAPI", "LangGraph", "RAG", "Qdrant", "Tavily", "SSE"],
    github: "https://github.com/MudaserShah/Langgraph-Agentic-Researcher",
    demo: "https://langgraph-agentic-researcher.vercel.app",
    image: researcherShot.url,
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
    techStack: ["Python", "FastAPI", "LangChain", "Qdrant", "Embeddings", "RAG"],
    github: "https://github.com/MudaserShah/Production-QA-RAG",
    demo: "https://production-qa-rag-tau.vercel.app/",
    image: butlerShot.url,
    status: "Live",
    featured: true,
  },
  {
    slug: "document-qa-assistant",
    title: "Document QA Assistant",
    category: "RAG / AI Engineering",
    tagline: "A focused exploration of RAG fundamentals.",
    description:
      "A lightweight document question-answering application built to explore the fundamentals of retrieval-augmented generation and grounded responses.",
    problem: "Understanding RAG properly requires building each stage by hand rather than relying on a black-box framework.",
    solution: "A minimal pipeline — load, chunk, embed, retrieve, generate — with each step kept explicit and inspectable.",
    architecture: [
      { label: "Load", nodes: ["Documents"] },
      { label: "Index", nodes: ["Chunks", "Embeddings", "Qdrant"] },
      { label: "Query", nodes: ["Retriever", "LLM"] },
    ],
    howItWorks: ["Load a document.", "Split and embed it.", "Store vectors in Qdrant.", "Retrieve relevant chunks for a question.", "Generate a grounded answer."],
    technicalDecisions: [{ decision: "Keep the pipeline minimal", why: "Makes it easy to see how each parameter affects answer quality." }],
    challenges: [{ challenge: "Irrelevant retrievals on short questions", resolution: "Experimented with top-k and chunk sizing." }],
    security: ["Local-first experimentation"],
    results: ["Foundation for later RAG projects like Document Butler"],
    techStack: ["Python", "FastAPI", "LangChain", "Qdrant", "Embeddings"],
    github: "https://github.com/MudaserShah/document_qa_assistant",
    status: "Prototype",
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
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
