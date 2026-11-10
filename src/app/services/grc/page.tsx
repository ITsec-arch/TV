import type { Metadata } from "next";
import { ServiceTemplate, type ServiceData } from "@/components/site/ServiceTemplate";
import { pageMetadata } from "@/lib/seo";

const data: ServiceData = {
  path: "/services/grc",
  breadcrumb: "Strategy and GRC",
  title: "Security strategy and GRC, aligned to the business.",
  intro:
    "Maturity assessments, roadmaps and compliance support that tie security to KPIs and budget, with executive-ready reporting.",
  serviceType: "Security Strategy and GRC",
  overview:
    "For leaders who need security to make business sense. We assess where you are, build a prioritised roadmap tied to budget and risk, and support the compliance work, with reporting your board can actually read.",
  whoFor: [
    "CISOs and security leaders",
    "Organisations pursuing or maintaining compliance",
    "Boards wanting measurable security outcomes",
  ],
  capabilities: [
    { name: "Maturity assessment", body: "An honest baseline of where your program stands against a recognised model.", points: ["Baseline", "Gap analysis", "Benchmarking"] },
    { name: "Strategic roadmap", body: "A prioritised plan tied to risk and budget, not a wish list.", points: ["Prioritisation", "Budget alignment", "Milestones"] },
    { name: "Compliance validation", body: "Support for the frameworks your customers and regulators ask about.", points: ["Control mapping", "Readiness", "Evidence"] },
    { name: "Executive reporting", body: "Reporting that translates security into business terms.", points: ["Board reporting", "KPIs", "Clear outcomes"] },
  ],
  approach: [
    { n: "01", title: "Assess maturity", body: "Baseline the program honestly against a recognised model." },
    { n: "02", title: "Prioritise by risk and budget", body: "Decide what matters most given your real constraints." },
    { n: "03", title: "Build the roadmap", body: "A sequenced plan with milestones your team can own." },
    { n: "04", title: "Report and review", body: "Board-ready reporting and a cadence to keep it on track." },
  ],
};

export const metadata: Metadata = pageMetadata({ title: "Security strategy and GRC", description: data.intro, path: data.path });
export default function Page() { return <ServiceTemplate data={data} />; }
