import type { Meta, StoryObj } from "@storybook/react";
import { radius } from "@groxigo/tokens";

const meta: Meta = {
  title: "Design Tokens/Border Radius",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* Fluid radius ranges from css.ts */
const FLUID_RADII: Record<string, [number, number]> = {
  lg: [10, 14],
  xl: [14, 20],
  "2xl": [20, 24],
  "3xl": [24, 28],
  "4xl": [28, 32],
  "5xl": [32, 40],
};

/* Use-case labels from DESIGN_RULES §13 */
const USE_CASES: Record<string, string> = {
  none: "Sharp edges, tables",
  xs: "Menus, tags, small cards",
  sm: "Inputs, small buttons",
  md: "Medium buttons, dropdowns",
  lg: "Base radius, standard cards",
  xl: "Large cards, panels",
  "2xl": "Large cards, modals",
  "3xl": "Hero cards, large modals",
  "4xl": "Feature cards",
  "5xl": "Jumbo cards, splash screens",
  full: "Pills, avatars, circles",
};

export const RadiusScale: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Border Radius Scale</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Rounded corner tokens with use-case guidance from DESIGN_RULES §13. Fluid tokens scale from 375px → 1440px.
        <br />
        <code style={mono}>import {"{"} radius {"}"} from '@groxigo/tokens'</code>
      </p>

      <div style={{ marginBottom: "24px", padding: "12px 16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
        <span style={{ fontSize: "12px", color: "#1e40af" }}>
          <strong>Base radius:</strong> {radius.base}px &nbsp;&middot;&nbsp;
          <span style={{ color: "#16a34a" }}>Green = fluid</span> &nbsp;&middot;&nbsp;
          <span style={{ color: "#94a3b8" }}>Gray = fixed</span>
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Object.entries(radius)
          .filter(([key]) => key !== "base")
          .map(([key, value]) => {
            const fluid = FLUID_RADII[key];
            const isFluid = !!fluid;
            const size = key === "full" ? 60 : Math.max(60, value * 2 + 40);
            const displayRadius = key === "full" ? "50%" : `${value}px`;

            return (
              <div
                key={key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 140px 160px 200px 1fr",
                  gap: "16px",
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                {/* Visual preview */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: `${size}px`,
                      height: "60px",
                      borderRadius: displayRadius,
                      backgroundColor: isFluid ? "#3b82f6" : "#94a3b8",
                      opacity: isFluid ? 1 : 0.7,
                    }}
                  />
                </div>

                {/* CSS var */}
                <code style={{ ...mono, color: "#2563eb" }}>--radius-{key}</code>

                {/* Value + fluid range */}
                <div>
                  <span style={{ fontSize: "13px" }}>
                    {key === "full" ? "9999px" : `${value}px`}
                  </span>
                  {isFluid ? (
                    <span style={{ fontSize: "10px", color: "#16a34a", marginLeft: "6px" }}>
                      {fluid[0]}px → {fluid[1]}px
                    </span>
                  ) : (
                    <span style={{ fontSize: "10px", color: "#94a3b8", marginLeft: "6px" }}>fixed</span>
                  )}
                </div>

                {/* Token name */}
                <span style={{ fontSize: "13px", fontWeight: 500 }}>{key}</span>

                {/* Use case */}
                <span style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>
                  {USE_CASES[key] || ""}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  ),
};

export const RadiusComparison: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Radius Comparison</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        All radius values applied to identical cards for visual comparison.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {Object.entries(radius)
          .filter(([key]) => key !== "base")
          .map(([key, value]) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "100px",
                  height: "80px",
                  borderRadius: key === "full" ? "50%" : `${value}px`,
                  backgroundColor: "#fff",
                  border: "2px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 500, color: "#3b82f6" }}>
                  {key === "full" ? "full" : `${value}px`}
                </span>
              </div>
              <p style={{ marginTop: "8px" }}>
                <code style={{ ...mono, color: "#2563eb" }}>--radius-{key}</code>
              </p>
            </div>
          ))}
      </div>
    </div>
  ),
};
