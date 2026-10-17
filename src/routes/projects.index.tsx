import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { ProjectCard, Reveal } from "@/components/site/primitives";

const title = "Projects — Syed Mudaser Shah";
const description = "RAG systems, AI agents, and automation workflows built by Syed Mudaser Shah, with full case studies.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Selected Work</h1>
          <p className="mt-4 text-lg text-muted-foreground">Systems I've built, engineered, and experimented with.</p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug}><ProjectCard project={p} index={i} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
