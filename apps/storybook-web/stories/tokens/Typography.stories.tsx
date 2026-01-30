import type { Meta, StoryObj } from "@storybook/react";
import { typography } from "@groxigo/tokens/typography";

const meta: Meta = {
  title: "Design Tokens/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const FontSizes: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Font Sizes
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Font size scale from extra small to 4xl. Base size is 16px.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Object.entries(typography.fontSize).map(([name, size]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "24px",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            <div style={{ width: "80px" }}>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#666" }}>
                {name}
              </span>
            </div>
            <div style={{ width: "80px" }}>
              <span style={{ fontSize: "12px", color: "#999" }}>
                {size}px / {(size / 16).toFixed(3)}rem
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: `${size}px` }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Font Weights
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Available font weights from light (300) to bold (700).
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            <div style={{ width: "100px" }}>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#666" }}>
                {name}
              </span>
            </div>
            <div style={{ width: "60px" }}>
              <span style={{ fontSize: "12px", color: "#999" }}>{weight}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "20px", fontWeight: weight }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LineHeights: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Line Heights
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Line height options for different text densities.
      </p>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {Object.entries(typography.lineHeight).map(([name, value]) => (
          <div key={name} style={{ width: "280px" }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: "12px", color: "#999", marginLeft: "8px" }}>
                ({value})
              </span>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                lineHeight: value,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation.
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LetterSpacing: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Letter Spacing
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Letter spacing options for different text styles.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Object.entries(typography.letterSpacing).map(([name, value]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            <div style={{ width: "100px" }}>
              <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#666" }}>
                {name}
              </span>
            </div>
            <div style={{ width: "80px" }}>
              <span style={{ fontSize: "12px", color: "#999" }}>{value}em</span>
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "18px",
                  letterSpacing: `${value}em`,
                  textTransform: name === "wide" ? "uppercase" : "none",
                }}
              >
                {name === "wide" ? "BUTTON TEXT" : "The quick brown fox jumps over the lazy dog"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontFamilies: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Font Families
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Font families used across the design system.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Sans (Web)</span>
          </div>
          <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#999", marginBottom: "12px" }}>
            {typography.fontFamily.sansWeb}
          </p>
          <p style={{ fontSize: "18px", fontFamily: typography.fontFamily.sansWeb }}>
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Monospace</span>
          </div>
          <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#999", marginBottom: "12px" }}>
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

export const TypeScale: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Type Scale Preview
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        How the type scale looks in practice for headings and body text.
      </p>

      <div
        style={{
          padding: "32px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
        }}
      >
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
          Body text (base / 16px) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p style={{ fontSize: `${typography.fontSize.sm}px`, color: "#666", marginBottom: "12px" }}>
          Small text (sm / 14px) - Used for helper text, captions, and secondary information.
        </p>
        <p style={{ fontSize: `${typography.fontSize.xs}px`, color: "#999" }}>
          Extra small text (xs / 12px) - Used for labels, badges, and metadata.
        </p>
      </div>
    </div>
  ),
};
