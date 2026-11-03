// Academy programs. Structured, cohort-based, mentor-led. Data-driven so a new
// program needs no layout work. Team-generic throughout: our mentors and
// practitioners teach; no personal names, no hourly rates, no fabricated
// counts, ratings or testimonials. Fees resolve from lib/pending (never a raw
// token); cohort status is a waitlist until a real date is set.

export type Module = { title: string; points: string[] };
export type Tier = "Foundational" | "Intermediate" | "Advanced";

export type Program = {
  slug: string;
  title: string;
  tier: Tier;
  promise: string; // outcome-led, one line
  whoFor: string;
  level: string;
  outcomes: string[];
  prerequisites: string[];
  modules: Module[];
  durationWeeks: string;
  liveHours: string;
  labHours: string;
  format: string;
  language: string;
  certs?: string[];
};

export const TIERS: Tier[] = ["Foundational", "Intermediate", "Advanced"];

const COMMON = {
  format: "Live online, hands-on",
  language: "English and Tamil",
};

export const programs: Program[] = [
  {
    slug: "web-app-pentesting-fundamentals",
    title: "Web App Pentesting Fundamentals",
    tier: "Foundational",
    promise:
      "Build a solid foundation in web application testing to OWASP WSTG, from enumeration to a clean report.",
    whoFor: "New testers and developers moving into security.",
    level: "Foundational",
    outcomes: [
      "Enumerate an application's real attack surface",
      "Find and prove the common OWASP classes",
      "Produce a clear, reproducible report",
    ],
    prerequisites: ["Basic HTTP and web fundamentals"],
    modules: [
      { title: "Recon and mapping", points: ["Surface discovery", "Auth flows", "Tooling"] },
      { title: "Core classes", points: ["Injection", "Access control", "Client-side"] },
      { title: "Proof and reporting", points: ["Reproduction", "Impact", "Write-up"] },
    ],
    durationWeeks: "8 weeks",
    liveHours: "24 hours live",
    labHours: "36 hours lab",
    ...COMMON,
  },
  {
    slug: "offensive-security-practitioner",
    title: "Offensive Security Practitioner",
    tier: "Intermediate",
    promise:
      "Run a web, network and mobile assessment end to end, by hand and with tooling, and write a report that stands up.",
    whoFor: "Testers and engineers moving into hands-on offensive security.",
    level: "Intermediate",
    outcomes: [
      "Enumerate and exploit web, network and mobile targets",
      "Chain findings into real impact, safely",
      "Produce a reproducible, client-ready report",
    ],
    prerequisites: ["Comfortable with HTTP, Linux and basic networking"],
    modules: [
      { title: "Recon and mapping", points: ["Surface discovery", "Auth flows", "Tooling"] },
      { title: "Web exploitation", points: ["OWASP WSTG", "Access control", "Injection"] },
      { title: "Network and services", points: ["Service attacks", "Pivoting", "Privilege escalation"] },
      { title: "Mobile basics", points: ["Android and iOS", "MASTG checks", "API testing"] },
      { title: "Reporting and retest", points: ["Evidence", "Severity", "Remediation"] },
    ],
    durationWeeks: "10 weeks",
    liveHours: "30 hours live",
    labHours: "50 hours lab",
    ...COMMON,
  },
  {
    slug: "secure-code-review",
    title: "Secure Code Review",
    tier: "Intermediate",
    promise:
      "Adopt a repeatable method for reviewing real codebases for security, and document findings a developer can act on.",
    whoFor: "Engineers and application security reviewers.",
    level: "Intermediate",
    outcomes: [
      "Apply a consistent review method under time pressure",
      "Prioritise by impact and exploitability",
      "Write findings with clear reproduction and fixes",
    ],
    prerequisites: ["Working knowledge of one server-side language"],
    modules: [
      { title: "Review strategy", points: ["Where to look first", "Data-flow reading", "Threat-led triage"] },
      { title: "Framework pitfalls", points: ["Type confusion", "Unsafe defaults", "Deserialisation"] },
      { title: "Reporting", points: ["Severity and impact", "Reproduction", "Remediation"] },
    ],
    durationWeeks: "6 weeks",
    liveHours: "18 hours live",
    labHours: "24 hours lab",
    ...COMMON,
  },
  {
    slug: "certification-prep",
    title: "Certification Prep",
    tier: "Intermediate",
    promise:
      "A structured track to prepare for hands-on certifications: lab strategy, methodology, time management and reporting.",
    whoFor: "Candidates preparing for practical security certifications.",
    level: "Cross-level track",
    certs: ["OSCP", "OSEP", "OSWP", "CRTP", "CEH", "CySA+", "Pentest+", "Splunk", "CompTIA"],
    outcomes: [
      "Work a lab methodically under exam conditions",
      "Manage time and note-taking across a long assessment",
      "Write a report that meets exam standards",
    ],
    prerequisites: ["Fundamentals of networking and web security"],
    modules: [
      { title: "Methodology", points: ["Enumeration discipline", "Pivoting", "Privilege escalation"] },
      { title: "Exam craft", points: ["Time management", "Note-taking", "Avoiding rabbit holes"] },
      { title: "Reporting", points: ["Evidence", "Structure", "Review"] },
    ],
    durationWeeks: "Rolling track",
    liveHours: "Scheduled by track",
    labHours: "Guided lab time",
    ...COMMON,
  },
  {
    slug: "ai-llm-red-teaming",
    title: "AI and LLM Red Teaming",
    tier: "Advanced",
    promise:
      "Run prompt injection, agent abuse and data exfiltration against live targets, and map every finding to recognised AI security standards.",
    whoFor: "Security engineers and ML or platform teams working on AI features.",
    level: "Advanced",
    outcomes: [
      "Run direct and indirect prompt injection on a real target",
      "Test tool-use and agent abuse, and exfiltration paths",
      "Map findings to the OWASP LLM Top 10 and MITRE ATLAS",
    ],
    prerequisites: ["Familiar with how LLM applications are built"],
    modules: [
      { title: "AI attack surface", points: ["Prompts and context", "Retrieval", "Tools and agency"] },
      { title: "Injection and exfiltration", points: ["Direct injection", "Indirect injection", "Output handling"] },
      { title: "Agents and tools", points: ["Excessive agency", "Tool abuse", "Containment"] },
      { title: "Defend and measure", points: ["Guardrails", "Evaluation", "Standard mappings"] },
    ],
    durationWeeks: "6 weeks",
    liveHours: "18 hours live",
    labHours: "30 hours lab",
    ...COMMON,
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function programsByTier(tier: Tier): Program[] {
  return programs.filter((p) => p.tier === tier);
}
