import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { label: "Home", hash: "" },
  { label: "Capabilities", hash: "capabilities" },
  { label: "About", hash: "about" },
  { label: "How I Work", hash: "how-i-work" },
  { label: "Contact", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = (
    <>
      <Link to="/" className="hover:text-foreground" onClick={() => setOpen(false)}>Home</Link>
      <Link to="/projects" className="hover:text-foreground" activeProps={{ className: "text-foreground" }} onClick={() => setOpen(false)}>Projects</Link>
      {nav.slice(1).map((n) => (
        <Link key={n.label} to="/" hash={n.hash as string} className="hover:text-foreground" onClick={() => setOpen(false)}>
          {n.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="text-sm font-semibold tracking-tight">{site.name}</Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">{links}</nav>
        <div className="flex items-center gap-1">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-ghost hidden sm:inline-flex"><Github className="h-4 w-4" /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost hidden sm:inline-flex"><Linkedin className="h-4 w-4" /></a>
          <Link to="/" hash="contact" className="btn btn-sm btn-outline ml-2 hidden sm:inline-flex">Let's Work Together</Link>
          <button className="btn btn-ghost lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="container-page flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground lg:hidden">
          {links}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">{site.name}</p>
          <p className="mt-1">{site.tagline}</p>
        </div>
        <div className="flex items-center gap-6">
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <span className="font-mono text-xs">© 2026 {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
