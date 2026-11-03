// Academy catalogue. Data-driven so adding a course needs no layout work.
// The catalogue is provisional pending confirmation (see {{NEEDS_INPUT}} below).
// Individual prices are markers; corporate cohorts are quote-only.

export type Module = { title: string; points: string[] };

export type Course = {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  prerequisites: string[];
  outcomes: string[];
  modules: Module[];
  duration: string;
  format: string;
  priceMarker: string; // individual seat price
};

export const CATALOGUE_STATUS = "{{NEEDS_INPUT: confirm academy catalogue and course details}}";

export const courses: Course[] = [
  {
    slug: "offensive-security-for-developers",
    title: "Offensive security for developers",
    summary:
      "How attackers actually break the code you write, taught by testers who read codebases. Developers leave able to spot and kill whole vulnerability classes before review.",
    audience: "Software and platform engineers, tech leads",
    prerequisites: ["Comfortable reading and writing code in at least one language"],
    outcomes: [
      "Recognise the vulnerability classes that map to your own stack",
      "Trace untrusted input to a sink and reason about impact",
      "Write code and tests that close a class, not just one bug",
    ],
    modules: [
      { title: "Attacker mental model", points: ["Trust boundaries", "Input to sink", "Impact over severity labels"] },
      { title: "Web and API classes", points: ["Injection", "Access control", "SSRF and request forgery"] },
      { title: "Secrets, dependencies, supply chain", points: ["Secret handling", "Dependency risk", "Build integrity"] },
      { title: "Fix and verify", points: ["Remediation patterns", "Regression tests", "Review checklists"] },
    ],
    duration: "2 days",
    format: "Live, online or on-site",
    priceMarker: "{{NEEDS_INPUT: course price}}",
  },
  {
    slug: "secure-code-review",
    title: "Secure code review",
    summary:
      "A repeatable method for reviewing code for security, not style. Review faster, find the issues that matter, and document findings a developer can act on.",
    audience: "Engineers, application security reviewers",
    prerequisites: ["Working knowledge of one server-side language"],
    outcomes: [
      "Apply a consistent review method under time pressure",
      "Prioritise by impact and exploitability",
      "Write findings with clear reproduction and fixes",
    ],
    modules: [
      { title: "Review strategy", points: ["Where to look first", "Data-flow reading", "Threat-led triage"] },
      { title: "Language and framework pitfalls", points: ["Type confusion", "Unsafe defaults", "Deserialisation"] },
      { title: "Reporting", points: ["Severity and impact", "Reproduction", "Remediation guidance"] },
    ],
    duration: "2 days",
    format: "Live, online or on-site",
    priceMarker: "{{NEEDS_INPUT: course price}}",
  },
  {
    slug: "ai-llm-red-teaming",
    title: "AI and LLM red teaming",
    summary:
      "Hands-on red teaming of LLM features, RAG systems and agents, mapped to the OWASP LLM Top 10 and MITRE ATLAS. Run the attacks and learn to defend against them.",
    audience: "Security engineers, ML and platform teams shipping AI features",
    prerequisites: ["Familiarity with how LLM applications are built"],
    outcomes: [
      "Run direct and indirect prompt injection against a real target",
      "Test tool-use and agent abuse, and data exfiltration paths",
      "Map findings to recognised AI security standards",
    ],
    modules: [
      { title: "AI attack surface", points: ["Prompts and context", "Retrieval", "Tools and agency"] },
      { title: "Injection and exfiltration", points: ["Direct injection", "Indirect injection", "Output handling"] },
      { title: "Agents and tools", points: ["Excessive agency", "Tool abuse", "Containment"] },
      { title: "Defend and measure", points: ["Guardrails", "Evaluation", "Standard mappings"] },
    ],
    duration: "2 days",
    format: "Live, online or on-site",
    priceMarker: "{{NEEDS_INPUT: course price}}",
  },
  {
    slug: "web-app-pentesting-fundamentals",
    title: "Web app pentesting fundamentals",
    summary:
      "A grounding in web application testing to OWASP WSTG: how to enumerate, find and prove the common vulnerability classes, with a report that stands up.",
    audience: "New testers, developers moving into security",
    prerequisites: ["Basic HTTP and web fundamentals"],
    outcomes: [
      "Enumerate an application's real attack surface",
      "Find and prove the common OWASP classes",
      "Produce a clear, reproducible report",
    ],
    modules: [
      { title: "Recon and mapping", points: ["Surface discovery", "Auth flows", "Tooling"] },
      { title: "Core classes", points: ["Injection", "Access control", "Client-side"] },
      { title: "Proof and reporting", points: ["Reproduction", "Impact", "Write-up"] },
    ],
    duration: "3 days",
    format: "Live, online or on-site",
    priceMarker: "{{NEEDS_INPUT: course price}}",
  },
  {
    slug: "certification-prep",
    title: "Certification prep",
    summary:
      "Structured preparation for hands-on offensive security certifications: lab strategy, methodology, time management and reporting, run by certified practitioners.",
    audience: "Candidates preparing for practical security certifications",
    prerequisites: ["Fundamentals of networking and web security"],
    outcomes: [
      "Work a lab methodically under exam conditions",
      "Manage time and note-taking across a long assessment",
      "Write a report that meets exam standards",
    ],
    modules: [
      { title: "Methodology", points: ["Enumeration discipline", "Pivoting", "Privilege escalation"] },
      { title: "Exam craft", points: ["Time management", "Note-taking", "Avoiding rabbit holes"] },
      { title: "Reporting", points: ["Evidence", "Structure", "Review"] },
    ],
    duration: "{{NEEDS_INPUT: duration}}",
    format: "Live, online or on-site",
    priceMarker: "{{NEEDS_INPUT: course price}}",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
