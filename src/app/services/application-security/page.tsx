import type { Metadata } from "next";
import { ServiceTemplate, type ServiceData } from "@/components/site/ServiceTemplate";
import { pageMetadata } from "@/lib/seo";

const data: ServiceData = {
  path: "/services/application-security",
  breadcrumb: "Application security",
  title: "Application security built into how you ship.",
  intro:
    "DevSecOps and secure-delivery testing across the SDLC: find and fix issues in code, pipelines and running apps before release.",
  serviceType: "Application Security Testing",
  overview:
    "We assess the application the way it is actually built and shipped: the source, the pipeline, the dependencies, the containers and the running service. The output is reproducible findings mapped to where they live in your SDLC, with fixes your engineers can act on.",
  whoFor: [
    "Product and platform engineering teams",
    "Teams adopting DevSecOps and CI/CD security",
    "Apps handling sensitive or regulated data",
  ],
  capabilities: [
    { name: "SAST and DAST integration", body: "Static and dynamic testing wired into your pipeline, not bolted on after.", points: ["Pipeline integration", "Static analysis", "Dynamic testing"] },
    { name: "Secure code review", body: "Manual review by testers who read code, tracing untrusted input to the sink.", points: ["Manual review", "Dataflow analysis", "Root-cause fixes"] },
    { name: "API testing", body: "Authentication, authorization, business logic and abuse cases across REST and GraphQL.", points: ["REST", "GraphQL", "Authz and logic"] },
    { name: "Container security", body: "Image, registry and runtime checks for the containers you ship.", points: ["Image scanning", "Registry hygiene", "Runtime config"] },
  ],
  approach: [
    { n: "01", title: "Map the SDLC", body: "Understand how code goes from commit to production, and where risk enters." },
    { n: "02", title: "Review code and dependencies", body: "Manual and automated review of the source and its supply chain." },
    { n: "03", title: "Test the running app and APIs", body: "Exercise the deployed service for real, exploitable issues." },
    { n: "04", title: "Fix guidance and pipeline gates", body: "Concrete fixes plus the checks to keep the issue from returning." },
  ],
};

export const metadata: Metadata = pageMetadata({ title: "Application security", description: data.intro, path: data.path });
export default function Page() { return <ServiceTemplate data={data} />; }
