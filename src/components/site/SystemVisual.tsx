const nodes = [
  { id: "in", x: 40, y: 150, label: "input" },
  { id: "router", x: 150, y: 150, label: "router" },
  { id: "rag", x: 270, y: 70, label: "retrieve" },
  { id: "tool", x: 270, y: 150, label: "tools" },
  { id: "rules", x: 270, y: 230, label: "rules" },
  { id: "llm", x: 380, y: 150, label: "llm" },
  { id: "out", x: 480, y: 150, label: "output" },
];
const edges: [string, string][] = [
  ["in", "router"], ["router", "rag"], ["router", "tool"], ["router", "rules"],
  ["rag", "llm"], ["tool", "llm"], ["rules", "llm"], ["llm", "out"],
];
const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function SystemVisual() {
  return (
    <div className="card-surface grid-bg relative p-4" aria-hidden>
      <div className="mb-2 flex items-center justify-between px-2 font-mono text-[10px] text-muted-foreground">
        <span>system.graph</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary" />running</span>
      </div>
      <svg viewBox="0 0 520 300" className="h-auto w-full">
        {edges.map(([a, b]) => {
          const p = pos[a]!, q = pos[b]!;
          const mx = (p.x + q.x) / 2;
          return (
            <path key={a + b} d={`M${p.x} ${p.y} C${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`}
              fill="none" stroke="var(--border-strong)" strokeWidth="1" className="flow-line" />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect x={n.x - 34} y={n.y - 13} width="68" height="26" rx="5"
              fill="var(--background)" stroke={n.id === "llm" ? "var(--primary)" : "var(--border-strong)"} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)"
              fill={n.id === "llm" ? "var(--primary)" : "var(--muted-foreground)"}>{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
