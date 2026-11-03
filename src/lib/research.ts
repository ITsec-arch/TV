// Verifiable research. Every entry links to the vendor advisory AND the NVD
// record. Research was credited through the employer at the time
// (CybersecurityWorks Research Labs); attributed honestly, never overstated.

export type Cve = {
  id: string;
  product: string;
  vendor: string;
  type: string;
  year: number;
  summary: string;
  credit: string;
  nvdUrl: string;
  advisory: { label: string; url: string };
};

export const cves: Cve[] = [
  {
    id: "CVE-2020-14723",
    product: "Oracle Fusion Middleware",
    vendor: "Oracle",
    type: "Stored XSS",
    year: 2020,
    summary:
      "Stored cross-site scripting in Oracle Fusion Middleware, fixed in the Oracle July 2020 Critical Patch Update.",
    credit: "CybersecurityWorks Research Labs",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2020-14723",
    advisory: {
      label: "Oracle CPU, July 2020",
      url: "https://www.oracle.com/security-alerts/cpujul2020.html",
    },
  },
  {
    id: "CVE-2020-14444",
    product: "WSO2 Identity Server",
    vendor: "WSO2",
    type: "Reflected XSS",
    year: 2020,
    summary:
      "Cross-site scripting in the WSO2 Identity Server policy administration UI (through 5.9.0).",
    credit: "CybersecurityWorks Research Labs",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2020-14444",
    advisory: {
      label: "WSO2-2020-0707",
      url: "https://security.docs.wso2.com/en/latest/security-announcements/security-advisories/2020/WSO2-2020-0707/",
    },
  },
  {
    id: "CVE-2020-14445",
    product: "WSO2 Identity Server",
    vendor: "WSO2",
    type: "XSS / open redirect",
    year: 2020,
    summary:
      "Input-validation flaw in the WSO2 Identity Server leading to cross-site scripting / open redirect.",
    credit: "CybersecurityWorks Research Labs",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2020-14445",
    advisory: {
      label: "WSO2-2020-0711",
      url: "https://security.docs.wso2.com/en/latest/security-announcements/security-advisories/2020/WSO2-2020-0711/",
    },
  },
  {
    id: "CVE-2020-14446",
    product: "WSO2 Identity Server",
    vendor: "WSO2",
    type: "Open redirect",
    year: 2020,
    summary:
      "Open redirect in the WSO2 Identity Server that could be abused to send users to an attacker-controlled destination.",
    credit: "CybersecurityWorks Research Labs",
    nvdUrl: "https://nvd.nist.gov/vuln/detail/CVE-2020-14446",
    advisory: {
      label: "WSO2-2020-0713",
      url: "https://security.docs.wso2.com/en/latest/security-announcements/security-advisories/2020/WSO2-2020-0713/",
    },
  },
];
