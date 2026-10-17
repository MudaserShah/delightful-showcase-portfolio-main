import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import type { ArchitectureLayer, Project } from "@/data/projects";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-visible={visible} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-border py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground">
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  const dot = status === "Live" ? "bg-primary" : status === "In Progress" ? "bg-primary/50" : "bg-muted-foreground";
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

export function ProjectPreview({ project }: { project: Project }) {
  if (project.image)
    return (
      <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" width={1280} height={800}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
    );
  const nodes = project.architecture.flatMap((l) => l.nodes).slice(0, 6);
  return (
    <div className="grid-bg flex h-full flex-wrap content-center items-center justify-center gap-2 p-6">
      {nodes.map((n, i) => (
        <span key={n} className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition-transform duration-500 group-hover:-translate-y-0.5 ${
          i === 2 ? "border-primary text-primary" : "border-border-strong bg-background text-muted-foreground"}`}>{n}</span>
      ))}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group card-surface card-hover flex h-full flex-col overflow-hidden">
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-surface" tabIndex={-1} aria-hidden>
        <ProjectPreview project={project} />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 backdrop-blur"><StatusBadge status={project.status} /></span>
        <span className="absolute right-3 top-3 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{project.category}</span>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="hover:text-primary">{project.title}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => <TechBadge key={t}>{t}</TechBadge>)}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="btn btn-sm btn-primary">Case Study</Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline"><Github className="h-3.5 w-3.5" /> GitHub</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">Live <ArrowUpRight className="h-3.5 w-3.5" /></a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="card-surface grid-bg overflow-x-auto p-6 md:p-8">
      <ol className="flex min-w-max items-stretch gap-3 md:min-w-0">
        {layers.map((layer, i) => (
          <li key={layer.label} className="flex items-center gap-3 md:flex-1">
            <div className="flex w-40 flex-col gap-2 md:w-auto md:flex-1">
              <span className="eyebrow">{layer.label}</span>
              {layer.nodes.map((n) => (
                <div key={n} className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground/90">
                  {n}
                </div>
              ))}
            </div>
            {i < layers.length - 1 && <span aria-hidden className="font-mono text-primary/70">→</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
