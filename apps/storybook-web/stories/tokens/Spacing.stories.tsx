import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "@groxigo/tokens/spacing";

const meta: Meta = {
  title: "Design Tokens/Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const SpacingScale: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Spacing Scale
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Spacing scale based on a 4px base unit. Use these values for margins, paddings, and gaps.
      </p>

      <div style={{ marginBottom: "24px", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>
          <strong>Base unit:</strong> {spacing.base}px
        </p>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
            <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>Token</th>
            <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>Value (px)</th>
            <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>Value (rem)</th>
            <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(spacing)
            .filter(([key]) => key !== "base")
            .map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: "14px" }}>
                  spacing.{key}
                </td>
                <td style={{ padding: "12px", fontSize: "14px" }}>{value}px</td>
                <td style={{ padding: "12px", fontSize: "14px", color: "#666" }}>
                  {(value / 16).toFixed(3)}rem
                </td>
                <td style={{ padding: "12px" }}>
                  <div
                    style={{
                      width: `${value}px`,
                      height: "24px",
                      backgroundColor: "#3b82f6",
                      borderRadius: "4px",
                      minWidth: "4px",
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ),
};

export const SpacingExamples: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Spacing Examples
      </h2>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Padding</h3>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[1, 2, 4, 6, 8].map((key) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                <div
                  style={{
                    padding: `${spacing[key as keyof typeof spacing]}px`,
                    backgroundColor: "#3b82f6",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  Content
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                p-{key} ({spacing[key as keyof typeof spacing]}px)
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Gap</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[1, 2, 4, 6].map((key) => (
            <div key={key}>
              <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                gap-{key} ({spacing[key as keyof typeof spacing]}px)
              </p>
              <div
                style={{
                  display: "flex",
                  gap: `${spacing[key as keyof typeof spacing]}px`,
                }}
              >
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
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Margin</h3>
        <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px" }}>
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: `${spacing[4]}px`,
            }}
          >
            Box with mb-4 ({spacing[4]}px)
          </div>
          <div
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: `${spacing[6]}px`,
            }}
          >
            Box with mb-6 ({spacing[6]}px)
          </div>
          <div
            style={{
              backgroundColor: "#f59e0b",
              color: "white",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            Last box
          </div>
        </div>
      </div>
    </div>
  ),
};
