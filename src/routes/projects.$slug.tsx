import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { ReactNode } from "react";
import { getProject, type Project } from "@/data/projects";
import { ArchitectureDiagram, Reveal, StatusBadge, TechBadge } from "@/components/site/primitives";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const t = `${p.title} — Case Study · Syed Mudaser Shah`;
    return {
      meta: [
        { title: t },
        { name: "description", content: p.description },
        { property: "og:title", content: t },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: CaseStudy,
});

function ProjectNotFound() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <Link to="/projects" className="btn btn-outline mt-6">Back to projects</Link>
    </div>
  );
}

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-6 border-t border-border py-12 md:grid-cols-[220px_1fr]">
        <h2 className="flex gap-3 text-sm font-medium">
          <span className="font-mono text-primary">{String(n).padStart(2, "0")}</span>
          <span>{title}</span>
        </h2>
        <div className="min-w-0 leading-relaxed text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{i}</li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Github className="h-4 w-4" /> GitHub</a>}
      {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary">Live Demo <ArrowUpRight className="h-4 w-4" /></a>}
    </div>
  );
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  return (
    <article className="py-16 md:py-24">
      <div className="container-page">
        <Link to="/projects" className="btn btn-ghost -ml-2 mb-10"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        <Reveal className="max-w-3xl pb-14">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="eyebrow">{p.category}</span>
            <StatusBadge status={p.status} />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{p.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.description}</p>
          <div className="mt-8"><Links p={p} /></div>
        </Reveal>

        <Block n={1} title="Overview">
          <p>{p.description}</p>
          {p.highlight && <p className="mt-4 border-l border-primary/50 pl-4 text-foreground">{p.highlight}</p>}
        </Block>
        <Block n={2} title="Problem"><p>{p.problem}</p></Block>
        <Block n={3} title="Solution"><p>{p.solution}</p></Block>
        <Block n={4} title="Architecture"><ArchitectureDiagram layers={p.architecture} /></Block>
        <Block n={5} title="How It Works">
          <ol className="space-y-3">
            {p.howItWorks.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="font-mono text-xs leading-7 text-primary">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </Block>
        <Block n={6} title="Technical Decisions">
          <div className="grid gap-4">
            {p.technicalDecisions.map((d) => (
              <div key={d.decision} className="card-surface p-5">
                <p className="font-medium text-foreground">{d.decision}</p>
                <p className="mt-1.5 text-sm"><span className="font-mono text-xs text-primary">why → </span>{d.why}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block n={7} title="Challenges">
          <div className="grid gap-4">
            {p.challenges.map((c) => (
              <div key={c.challenge} className="border-l border-border pl-4">
                <p className="text-foreground">{c.challenge}</p>
                <p className="mt-1 text-sm">{c.resolution}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block n={8} title="Reliability & Security"><List items={p.security} /></Block>
        <Block n={9} title="Results"><List items={p.results} /></Block>
        <Block n={10} title="Tech Stack">
          <div className="flex flex-wrap gap-2">{p.techStack.map((t) => <TechBadge key={t}>{t}</TechBadge>)}</div>
        </Block>
        <Block n={11} title="Demo">
          {p.demo ? (
            <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary">Open live demo <ArrowUpRight className="h-4 w-4" /></a>
          ) : (
            <p>No public demo yet.</p>
          )}
        </Block>
        <Block n={12} title="GitHub">
          {p.github ? (
            <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Github className="h-4 w-4" /> View repository</a>
          ) : (
            <p>Repository not public yet.</p>
          )}
        </Block>
      </div>
    </article>
  );
}
