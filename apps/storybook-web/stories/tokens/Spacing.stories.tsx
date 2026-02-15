import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "@groxigo/tokens/spacing";

const meta: Meta = {
  title: "Design Tokens/Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* Fluid spacing ranges from css.ts — [min at 375px, max at 1440px] */
const FLUID_SPACINGS: Record<string, [number, number]> = {
  "4": [16, 20],
  "5": [20, 24],
  "6": [24, 32],
  "7": [28, 36],
  "8": [32, 40],
  "9": [36, 44],
  "10": [40, 52],
  "11": [44, 56],
  "12": [48, 60],
  "14": [56, 72],
  "16": [64, 80],
  "20": [80, 100],
  "24": [96, 120],
};

export const SpacingScale: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Spacing Scale</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        4px base unit. Fluid tokens scale smoothly from 375px to 1440px viewport.
        <br />
        <code style={mono}>import {"{"} spacing {"}"} from '@groxigo/tokens/spacing'</code>
      </p>

      <div style={{ marginBottom: "24px", padding: "12px 16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
        <span style={{ fontSize: "12px", color: "#1e40af" }}>
          <strong>Base unit:</strong> {spacing.base}px &nbsp;&middot;&nbsp;
          <span style={{ color: "#16a34a" }}>Green = fluid</span> &nbsp;&middot;&nbsp;
          <span style={{ color: "#94a3b8" }}>Gray = fixed</span>
        </span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#475569" }}>CSS Variable</th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#475569" }}>Value</th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#475569" }}>Fluid Range</th>
            <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#475569" }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(spacing)
            .filter(([key]) => key !== "base")
            .map(([key, value]) => {
              const fluid = FLUID_SPACINGS[key];
              const isFluid = !!fluid;
              return (
                <tr key={key} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <code style={{ ...mono, color: "#2563eb" }}>--spacing-{key}</code>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: "13px" }}>{value}px</td>
                  <td style={{ padding: "10px 12px", fontSize: "12px" }}>
                    {isFluid ? (
                      <span style={{ color: "#16a34a", fontWeight: 500 }}>
                        {fluid[0]}px → {fluid[1]}px
                      </span>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>fixed</span>
                    )}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div
                      style={{
                        width: `${Math.min(value, 256)}px`,
                        height: "20px",
                        backgroundColor: isFluid ? "#3b82f6" : "#94a3b8",
                        borderRadius: "4px",
                        minWidth: "2px",
                        opacity: isFluid ? 1 : 0.6,
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  ),
};

export const SpacingExamples: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Spacing Examples</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Visual demos of padding, gap, and margin using spacing tokens.
      </p>

      {/* Padding */}
      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Padding</h3>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[1, 2, 4, 6, 8].map((key) => {
            const val = spacing[key as keyof typeof spacing];
            return (
              <div key={key} style={{ textAlign: "center" }}>
                <div style={{ backgroundColor: "#dbeafe", borderRadius: "8px", display: "inline-block" }}>
                  <div
                    style={{
                      padding: `${val}px`,
                      backgroundColor: "#3b82f6",
                      borderRadius: "4px",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    Content
                  </div>
                </div>
                <p style={{ fontSize: "11px", marginTop: "8px" }}>
                  <code style={{ ...mono, color: "#2563eb" }}>--spacing-{key}</code>
                  <br />
                  <span style={{ color: "#999", fontSize: "10px" }}>{val}px</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gap */}
      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Gap</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[1, 2, 4, 6].map((key) => {
            const val = spacing[key as keyof typeof spacing];
            return (
              <div key={key}>
                <p style={{ fontSize: "11px", marginBottom: "8px" }}>
                  <code style={{ ...mono, color: "#2563eb" }}>--spacing-{key}</code>
                  <span style={{ color: "#999", marginLeft: "8px", fontSize: "10px" }}>{val}px</span>
                </p>
                <div style={{ display: "flex", gap: `${val}px` }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "4px",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};
