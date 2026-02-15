import type { Meta, StoryObj } from "@storybook/react";
import { typography } from "@groxigo/tokens/typography";

const meta: Meta = {
  title: "Design Tokens/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* Fluid ranges from css.ts — [min at 375px, max at 1440px] */
const FLUID_RANGES: Record<string, [number, number]> = {
  "2xs": [10, 10],
  xs: [12, 14],
  sm: [14, 16],
  base: [16, 20],
  lg: [18, 22],
  xl: [20, 26],
  xxl: [22, 28],
  "2xl": [24, 32],
  xxxl: [28, 36],
  "3xl": [30, 40],
  "4xl": [36, 48],
};

export const FontSizes: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Font Sizes</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Font size scale with CSS variable names and fluid scaling ranges (375px → 1440px).
        <br />
        <code style={mono}>import {"{"} typography {"}"} from '@groxigo/tokens/typography'</code>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 140px 140px 1fr",
            gap: "16px",
            padding: "12px 16px",
            borderBottom: "2px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Token</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>CSS Variable</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Value / Fluid Range</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Preview</span>
        </div>

        {Object.entries(typography.fontSize).map(([name, size]) => {
          const fluid = FLUID_RANGES[name];
          const isFluid = fluid && fluid[0] !== fluid[1];
          return (
            <div
              key={name}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 140px 140px 1fr",
                gap: "16px",
                padding: "12px 16px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
              <code style={{ ...mono, color: "#2563eb" }}>--font-size-{name}</code>
              <div>
                <span style={{ fontSize: "12px", color: "#333" }}>{size}px</span>
                {isFluid && (
                  <span style={{ fontSize: "10px", color: "#16a34a", marginLeft: "6px" }}>
                    {fluid[0]}px → {fluid[1]}px
                  </span>
                )}
                {!isFluid && (
                  <span style={{ fontSize: "10px", color: "#94a3b8", marginLeft: "6px" }}>fixed</span>
                )}
              </div>
              <span style={{ fontSize: `${size}px`, lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const FontWeights: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Font Weights</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Available font weights from light (300) to bold (700).
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 160px 60px 1fr",
              gap: "16px",
              padding: "14px 16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
            <code style={{ ...mono, color: "#2563eb" }}>--font-weight-{name}</code>
            <span style={{ fontSize: "12px", color: "#999" }}>{weight}</span>
            <span style={{ fontSize: "20px", fontWeight: weight }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontFamilies: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Font Families</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Font families used across the design system.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ padding: "24px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Sans (Web)</span>
            <code style={{ ...mono, color: "#2563eb" }}>--font-family-sans</code>
          </div>
          <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#999", marginBottom: "12px" }}>
            {typography.fontFamily.sansWeb}
          </p>
          <p style={{ fontSize: "18px", fontFamily: typography.fontFamily.sansWeb }}>
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>

        <div style={{ padding: "24px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Monospace</span>
            <code style={{ ...mono, color: "#2563eb" }}>--font-family-mono</code>
          </div>
          <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#999", marginBottom: "12px" }}>
            {typography.fontFamily.mono}
          </p>
          <p style={{ fontSize: "18px", fontFamily: typography.fontFamily.mono }}>
            const message = "Hello, World!"; // 0123456789
          </p>
        </div>
      </div>
    </div>
  ),
};

export const LineHeightsAndSpacing: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Line Heights & Letter Spacing</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Line height and letter spacing tokens with CSS variable names.
      </p>

      <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Line Heights</h3>
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "48px" }}>
        {Object.entries(typography.lineHeight).map(([name, value]) => (
          <div key={name} style={{ width: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{name}</span>
              <code style={{ ...mono, color: "#2563eb" }}>--line-height-{name}</code>
              <span style={{ fontSize: "12px", color: "#999" }}>({value})</span>
            </div>
            <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px", lineHeight: value }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>Letter Spacing</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Object.entries(typography.letterSpacing).map(([name, value]) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 180px 80px 1fr",
              gap: "16px",
              padding: "14px 16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
            <code style={{ ...mono, color: "#2563eb" }}>--letter-spacing-{name}</code>
            <span style={{ fontSize: "12px", color: "#999" }}>{value}em</span>
            <span
              style={{
                fontSize: "18px",
                letterSpacing: `${value}em`,
                textTransform: name === "wide" ? "uppercase" : "none",
              }}
            >
              {name === "wide" ? "BUTTON TEXT LABEL" : "The quick brown fox jumps over the lazy dog"}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TypeScale: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Type Scale Preview</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        How the type scale looks in practice for headings and body text.
      </p>

      <div style={{ padding: "32px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
        <h1 style={{ fontSize: `${typography.fontSize["4xl"]}px`, fontWeight: 700, marginBottom: "16px" }}>
          Heading 1 (4xl / 36px)
        </h1>
        <h2 style={{ fontSize: `${typography.fontSize["3xl"]}px`, fontWeight: 600, marginBottom: "16px" }}>
          Heading 2 (3xl / 30px)
        </h2>
        <h3 style={{ fontSize: `${typography.fontSize["2xl"]}px`, fontWeight: 600, marginBottom: "16px" }}>
          Heading 3 (2xl / 24px)
        </h3>
        <h4 style={{ fontSize: `${typography.fontSize.xl}px`, fontWeight: 600, marginBottom: "16px" }}>
          Heading 4 (xl / 20px)
        </h4>
        <h5 style={{ fontSize: `${typography.fontSize.lg}px`, fontWeight: 500, marginBottom: "16px" }}>
          Heading 5 (lg / 18px)
        </h5>
        <p style={{ fontSize: `${typography.fontSize.base}px`, marginBottom: "12px", lineHeight: 1.6 }}>
          Body text (base / 16px) &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p style={{ fontSize: `${typography.fontSize.sm}px`, color: "#666", marginBottom: "12px" }}>
          Small text (sm / 14px) &mdash; Used for helper text, captions, and secondary information.
        </p>
        <p style={{ fontSize: `${typography.fontSize.xs}px`, color: "#999" }}>
          Extra small text (xs / 12px) &mdash; Used for labels, badges, and metadata.
        </p>
      </div>
    </div>
  ),
};
