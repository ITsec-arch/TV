import type { Metadata } from "next";
import { ServiceTemplate, type ServiceData } from "@/components/site/ServiceTemplate";
import { pageMetadata } from "@/lib/seo";

const data: ServiceData = {
  path: "/services/cloud-security",
  breadcrumb: "Cloud security",
  title: "Cloud security for the estate you actually run.",
  intro:
    "Security assessments for AWS, Azure and GCP: identity, network, data and workload, mapped to a concrete hardening plan.",
  serviceType: "Cloud Security Assessment",
  overview:
    "Multi-cloud estates drift. We review your landing zones and controls against provider and CIS benchmarks, find the misconfigurations and identity paths that matter, and prioritise them by real blast radius, not raw count.",
  whoFor: [
    "Teams on AWS, Azure or GCP, or all three",
    "Organisations with compliance obligations",
    "Platform teams hardening landing zones",
  ],
  capabilities: [
    { name: "Multi-cloud review", body: "AWS, Azure and GCP measured against provider and CIS benchmarks.", points: ["AWS", "Azure", "GCP"] },
    { name: "IAM and identity", body: "Over-privilege, role chaining and the identity paths to your crown jewels.", points: ["Least privilege", "Role chaining", "Key hygiene"] },
    { name: "Network segmentation", body: "Exposure, segmentation and the paths between tiers and accounts.", points: ["Exposure", "Segmentation", "Peering and VPC"] },
    { name: "Compliance validation", body: "Map findings to the controls your auditors ask about.", points: ["CIS benchmarks", "Control mapping", "Evidence"] },
  ],
  approach: [
    { n: "01", title: "Inventory and access", body: "Enumerate the accounts, services and identities in scope." },
    { n: "02", title: "Benchmark and identity review", body: "Measure config against benchmarks and trace privileged paths." },
    { n: "03", title: "Exposure and blast radius", body: "Rank issues by what an attacker could actually reach." },
    { n: "04", title: "Prioritised hardening plan", body: "A fix list ordered by risk, mapped to your controls." },
  ],
};

export const metadata: Metadata = pageMetadata({ title: "Cloud security", description: data.intro, path: data.path });
export default function Page() { return <ServiceTemplate data={data} />; }
