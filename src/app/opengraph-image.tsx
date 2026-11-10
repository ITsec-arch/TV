import { ImageResponse } from "next/og";

export const alt = "ThreatVet: offensive security and threat intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static brand OG. Flexbox-only subset; default font (latin), no fs read.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          color: "#f6f7f8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", height: "6px", width: "140px", background: "#ff5c52" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em" }}>
            ThreatVet
            <div style={{ display: "flex", height: "28px", width: "28px", background: "#ff5c52", borderRadius: "4px" }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#9aa0a8" }}>
            Offensive security &amp; threat intelligence
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#868c93" }}>
          Penetration testing &middot; AI/LLM red teaming &middot; threat hunting &middot; Vyra
        </div>
      </div>
    ),
    { ...size },
  );
}
