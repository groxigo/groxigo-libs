import type { Meta, StoryObj } from "@storybook/react";
import { shadows } from "@groxigo/tokens";

const meta: Meta = {
  title: "Design Tokens/Shadows",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

export const ElevationScale: StoryObj = {
  render: () => {
    const mainShadows = Object.entries(shadows).filter(
      ([key, val]) => typeof val === "string" && key !== "card"
    ) as [string, string][];

    return (
      <div style={page}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Shadow / Elevation Scale</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Shadow tokens for depth and elevation. Each card shows the shadow applied.
          <br />
          <code style={mono}>import {"{"} shadows {"}"} from '@groxigo/tokens'</code>
        </p>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "48px" }}>
          {mainShadows.map(([key, value]) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "160px",
                  height: "120px",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: value,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: 600 }}>{key}</span>
                <code style={{ ...mono, color: "#2563eb" }}>--shadow-{key}</code>
              </div>
              <code style={{ ...mono, color: "#666", display: "block", marginTop: "8px", maxWidth: "160px", wordBreak: "break-all" }}>
                {value}
              </code>
            </div>
          ))}
        </div>

        {/* Card shadow */}
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Card Shadow</h3>
        <div style={{ display: "flex", gap: "24px", marginBottom: "48px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "200px",
                height: "140px",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: shadows.card,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Card</span>
              <code style={{ ...mono, color: "#2563eb" }}>--shadow-card</code>
            </div>
            <code style={{ ...mono, color: "#666", display: "block", marginTop: "8px" }}>{shadows.card}</code>
          </div>
        </div>

        {/* Glass shadows */}
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Glass Shadows</h3>
        <p style={{ color: "#666", marginBottom: "16px", fontSize: "13px" }}>
          Softer, more diffused shadows for glassmorphism effects.
        </p>
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            padding: "32px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          {Object.entries(shadows.glass).map(([key, value]) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "160px",
                  height: "120px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(12px)",
                  boxShadow: value,
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>glass.{key}</span>
                <code style={{ ...mono, color: "rgba(255,255,255,0.8)" }}>--shadow-glass-{key}</code>
              </div>
              <code style={{ ...mono, color: "rgba(255,255,255,0.7)", display: "block", marginTop: "8px", maxWidth: "160px" }}>
                {value}
              </code>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const ElevationComparison: StoryObj = {
  render: () => {
    const levels = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    return (
      <div style={page}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Elevation Comparison</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Stacked cards showing progressive elevation from xs to 2xl.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "500px",
          }}
        >
          {levels.map((key, i) => (
            <div
              key={key}
              style={{
                padding: "20px 24px",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: shadows[key],
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: `${i * 12}px`,
              }}
            >
              <div>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>Elevation {key}</span>
                <br />
                <code style={{ ...mono, color: "#2563eb" }}>--shadow-{key}</code>
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>Level {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
