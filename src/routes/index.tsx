import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Play } from "lucide-react";
import { featuredProjects, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCard, Reveal, Section, TechBadge } from "@/components/site/primitives";
import { SystemVisual } from "@/components/site/SystemVisual";

const title = "Syed Mudaser Shah — AI Engineer & Automation Engineer";
const description = "AI Engineer building RAG systems, AI agents, automation workflows, and GTM engineering systems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          jobTitle: site.role,
          sameAs: [site.github, site.linkedin],
        }),
      },
    ],
  }),
  component: Home,
});

const focus = ["AI Engineering", "RAG & Knowledge Systems", "AI Agents", "Automation", "GTM Engineering"];

const capabilities = [
  { t: "AI Engineering", d: "RAG systems, LLM applications, backend APIs, AI integrations, production-oriented AI architecture." },
  { t: "Agentic AI", d: "AI agents, tool calling, multi-step workflows, orchestration, stateful agent systems." },
  { t: "AI Automation", d: "Business process automation, API integrations, workflow orchestration, AI-powered automation." },
  { t: "GTM Engineering", d: "Lead intelligence, signal-based workflows, enrichment, qualification, outbound automation, and revenue workflows." },
];

const principles = [
  { t: "Understand the Problem First", d: "Start with the business or user problem before selecting a model or framework." },
  { t: "Architecture Before Tools", d: "Design the workflow and system boundaries before choosing tools." },
  { t: "Reliability Over Demos", d: "Build systems that handle failures, validation, edge cases, and real workflows." },
  { t: "AI Where It Adds Value", d: "Don't use AI simply because it's available. Use deterministic logic where it's better." },
  { t: "Measure What Matters", d: "Focus on outcomes, quality, reliability, latency, cost, and user experience." },
  { t: "Keep Improving", d: "Build, test, observe, learn, and iterate." },
];

const stack: Record<string, string[]> = {
  "AI / LLM": ["LLMs", "RAG", "Embeddings", "Prompt Engineering", "Agentic AI"],
  Frameworks: ["LangChain", "LangGraph", "FastAPI", "React", "Next.js"],
  Data: ["PostgreSQL", "Qdrant", "SQL", "Redis"],
  Automation: ["n8n", "Make", "Webhooks", "REST APIs"],
  Engineering: ["Python", "Git", "Docker", "JWT", "OAuth", "Testing", "Observability"],
};

const learning = ["AI Engineering", "Agentic AI", "RAG Evaluation", "Production Backend Systems", "GTM Engineering", "AI Automation"];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div aria-hidden className="hero-glow pointer-events-none absolute -right-40 top-20 h-[520px] w-[620px]" />
        <div className="container-page relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-primary/60" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
              Open to projects & roles
            </span>
            <p className="animate-fade-up delay-1 mt-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">Hello, I'm</p>
            <h1 className="animate-fade-up delay-1 mt-2 text-6xl font-bold tracking-tight md:text-8xl">
              <span className="text-gradient">Mudaser</span>
              <span className="text-brand">.</span>
            </h1>
            <svg aria-hidden viewBox="0 0 300 12" className="draw-line -mt-1 h-3 w-56 text-primary md:w-80"><path d="M2 8 Q 80 2 150 7 T 298 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
            <p className="animate-fade-up delay-2 mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              <span className="font-semibold text-foreground">AI Engineer</span> building production-oriented{" "}
              <span className="text-foreground underline decoration-primary decoration-2 underline-offset-4">RAG systems & AI agents</span> — plus the{" "}
              <span className="text-foreground underline decoration-primary decoration-2 underline-offset-4">automation & GTM workflows</span> that solve real business problems.
            </p>
            <div className="animate-fade-up delay-2 mt-6 flex flex-wrap gap-2">
              {["RAG Systems", "AI Agents", "Automation", "GTM Engineering"].map((c) => (
                <span key={c} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground"><span className="text-primary">/</span> {c}</span>
              ))}
            </div>
            <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-primary">View My Work <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/" hash="contact" className="btn btn-outline">Let's Talk</Link>
              <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-outline px-3"><Github className="h-4 w-4" /></a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-outline px-3"><Linkedin className="h-4 w-4" /></a>
            </div>
            <dl className="animate-fade-up delay-4 mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-t border-border pt-6">
              {[
                [String(projects.length), "Case studies"],
                [String(projects.filter((p) => p.demo).length), "Live demos"],
                ["25+", "Public repos"],
              ].map(([n, l]) => (
                <div key={l} className="px-4 first:pl-0">
                  <dt className="text-3xl font-semibold">{n}<span className="text-primary">+</span></dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Intro video */}
          <div id="intro" className="animate-scale-in delay-3 relative mx-auto w-full max-w-sm">
            <span aria-hidden className="absolute -left-3 -top-3 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-primary" />
            <span aria-hidden className="absolute -bottom-3 -right-3 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-primary" />
            <div className="card-surface float-slow relative aspect-[9/14] overflow-hidden">
              {site.introVideo ? (
                <video src={site.introVideo} controls playsInline preload="metadata" className="h-full w-full object-cover" />
              ) : (
                <div className="grid-bg flex h-full flex-col items-center justify-center gap-5 bg-surface">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_60px_-10px_var(--primary)] transition-transform hover:scale-110">
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  </span>
                  <div className="text-center">
                    <p className="font-medium">Portfolio intro</p>
                    <p className="mt-1 text-sm text-muted-foreground">Video coming soon</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-x-0 top-0 flex items-center gap-3 bg-gradient-to-b from-background/90 to-transparent p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">M</span>
                <div className="leading-tight"><p className="text-sm font-medium">Intro video</p><p className="text-xs text-muted-foreground">{site.name}</p></div>
              </div>
            </div>
            <span className="absolute -bottom-5 left-4 -rotate-3 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground shadow-lg">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />press play
            </span>
          </div>
        </div>
      </section>

      {/* Focus strip */}
      <div className="border-y border-border bg-surface">
        <ul className="container-page flex flex-wrap justify-between gap-x-8 gap-y-3 py-6 text-sm text-muted-foreground">
          {focus.map((f) => (
            <li key={f} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" />{f}</li>
          ))}
        </ul>
      </div>

      <Section id="work" eyebrow="Selected Work" title="Systems I've built" subtitle="Systems I've built, engineered, and experimented with.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug}><ProjectCard project={p} index={i} /></Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/projects" className="btn btn-outline">All projects <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      <Section id="capabilities" eyebrow="Capabilities" title="What I Build">
        <Reveal className="mb-10"><SystemVisual /></Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <div key={c.t} className="bg-card p-8 transition-colors hover:bg-surface">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="how-i-work" eyebrow="How I Work" title="How I Think">
        <ol className="grid gap-x-12 md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.t} className="border-t border-border py-7">
              <Reveal className="flex gap-6">
                <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold">{p.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="stack" eyebrow="Tech Stack" title="Tools I work with">
        <dl className="divide-y divide-border border-y border-border">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group} className="grid gap-4 py-5 md:grid-cols-[180px_1fr]">
              <dt className="eyebrow pt-1.5">{group}</dt>
              <dd className="flex flex-wrap gap-2">{items.map((t) => <TechBadge key={t}>{t}</TechBadge>)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="about" eyebrow="About">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">About Me</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>I'm building my career around AI engineering, agentic systems, and automation.</p>
              <p>
                My focus is not just learning AI tools, but understanding how reliable systems are designed — from
                retrieval and tool calling to APIs, databases, authentication, deployment, evaluation, and observability.
              </p>
              <p>
                Alongside AI engineering, I'm exploring GTM engineering to understand how technology can connect
                directly with business growth and revenue.
              </p>
              <p className="text-foreground">I learn by building real systems, documenting what I learn, and continuously improving the architecture.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card-surface p-8">
              <p className="eyebrow mb-6">Currently Building & Learning</p>
              <ol className="relative space-y-5 border-l border-border pl-6">
                {learning.map((l, i) => (
                  <li key={l} className="relative">
                    <span className={`absolute -left-[29px] top-1.5 h-2 w-2 rounded-full ${i < 2 ? "bg-primary" : "border border-border-strong bg-background"}`} />
                    <span className="text-sm">{l}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Learning in Public">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-xl text-foreground/90">I document what I build, what breaks, and what I learn along the way.</p>
          <div className="flex gap-3">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Github className="h-4 w-4" /> GitHub</a>
          </div>
        </Reveal>
      </Section>

      <Section id="contact" className="bg-surface">
        <Reveal className="mx-auto max-w-2xl py-8 text-center">
          <p className="eyebrow mb-6">Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Have a problem worth solving?</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            If you're building an AI product, automation workflow, or intelligent business system, I'd be happy to connect.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-primary">Let's Connect <ArrowRight className="h-4 w-4" /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Github className="h-4 w-4" /> GitHub</a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
