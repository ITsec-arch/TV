import type { Metadata } from "next";
import { ServiceTemplate, type ServiceData } from "@/components/site/ServiceTemplate";
import { pageMetadata } from "@/lib/seo";

const data: ServiceData = {
  path: "/services/red-teaming",
  breadcrumb: "Red teaming",
  title: "Red teaming that tests your defences, not just your perimeter.",
  intro:
    "Human-led adversary emulation that validates your controls under real-world attack paths, from initial access to impact.",
  serviceType: "Red Team Operations",
  overview:
    "A scoped, objective-driven emulation of a real adversary. We chain access the way an attacker would, test whether your detection and response actually fire, and report the full path with evidence your team can act on.",
  whoFor: [
    "Teams with a mature program ready to be tested",
    "Organisations validating detection and response",
    "Leaders who want assurance beyond a checklist",
  ],
  capabilities: [
    { name: "Real-world simulation", body: "End-to-end emulation of a relevant threat actor against agreed objectives.", points: ["Objective-based", "Full attack path", "Evidence-backed"] },
    { name: "Social engineering", body: "Phishing and pretext campaigns that test people and process, with care and consent.", points: ["Phishing", "Pretexting", "Awareness validation"] },
    { name: "Physical assessment", body: "On-site tests of physical controls, where in scope.", points: ["Access controls", "Tailgating", "Device drops"] },
    { name: "Purple team exercises", body: "We work alongside your defenders to tune detection as the operation runs.", points: ["Detection tuning", "ATT&CK coverage", "Live collaboration"] },
  ],
  approach: [
    { n: "01", title: "Scope and objectives", body: "Agree the goals, the rules of engagement, and what is off limits." },
    { n: "02", title: "Recon and initial access", body: "Map the surface and gain a foothold the way a real adversary would." },
    { n: "03", title: "Movement and escalation", body: "Chain access toward the objective, testing controls at each step." },
    { n: "04", title: "Impact and detection check", body: "Reach the objective and measure whether detection and response fired." },
    { n: "05", title: "Debrief and remediation", body: "Walk the full path with your team and prioritise the fixes." },
  ],
};

export const metadata: Metadata = pageMetadata({ title: "Red teaming", description: data.intro, path: data.path });
export default function Page() { return <ServiceTemplate data={data} />; }
