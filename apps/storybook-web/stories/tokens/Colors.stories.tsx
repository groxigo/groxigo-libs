import type { Meta, StoryObj } from "@storybook/react";
import { primitives, semantic } from "@groxigo/tokens/colors";

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Color swatch component
const ColorSwatch = ({ name, value, textColor = "black" }: { name: string; value: string; textColor?: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    }}
  >
    <div
      style={{
        width: "80px",
        height: "60px",
        backgroundColor: value,
        borderRadius: "8px",
        border: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "4px",
      }}
    >
      <span style={{ fontSize: "9px", color: textColor, fontFamily: "monospace" }}>
        {value}
      </span>
    </div>
    <span style={{ fontSize: "11px", color: "#666" }}>{name}</span>
  </div>
);

// Color scale component
const ColorScale = ({ name, colors }: { name: string; colors: Record<string, string> }) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", textTransform: "capitalize" }}>
      {name}
    </h3>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {Object.entries(colors).map(([shade, value]) => (
        <ColorSwatch
          key={shade}
          name={shade}
          value={value}
          textColor={parseInt(shade) >= 500 ? "white" : "black"}
        />
      ))}
    </div>
  </div>
);

export const PrimitiveColors: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Primitive Colors
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Raw color values - the foundation palette. These are the base colors from which all other colors are derived.
      </p>

      {/* Absolute colors */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Absolute</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <ColorSwatch name="white" value={primitives.white} />
          <ColorSwatch name="black" value={primitives.black} textColor="white" />
        </div>
      </div>

      {/* Color scales */}
      <ColorScale name="Gray" colors={primitives.gray} />
      <ColorScale name="Blue" colors={primitives.blue} />
      <ColorScale name="Green" colors={primitives.green} />
      <ColorScale name="Red" colors={primitives.red} />
      <ColorScale name="Yellow" colors={primitives.yellow} />
      <ColorScale name="Orange" colors={primitives.orange} />
      <ColorScale name="Purple" colors={primitives.purple} />
      <ColorScale name="Cyan" colors={primitives.cyan} />
      <ColorScale name="Pink" colors={primitives.pink} />
      <ColorScale name="Indigo" colors={primitives.indigo} />
      <ColorScale name="Teal" colors={primitives.teal} />
    </div>
  ),
};

export const SemanticColors: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Semantic Colors
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Meaningful names for functional purposes. These are mapped from primitive colors for specific use cases.
      </p>

      {/* Surface colors */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Surface</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.surface).map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </div>

      {/* Text colors */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Text</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.text).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              textColor={name === "inverse" ? "black" : "white"}
            />
          ))}
        </div>
      </div>

      {/* Border colors */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Border</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.border).map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </div>

      {/* Brand colors */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Brand - Primary</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.brand.primary).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              textColor={["default", "hover", "active"].includes(name) ? "white" : "black"}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Brand - Secondary</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.brand.secondary).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              textColor={["default", "hover", "active"].includes(name) ? "white" : "black"}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>Brand - Accent</h3>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(semantic.brand.accent).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              textColor={["default", "hover", "active"].includes(name) ? "white" : "black"}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const StatusColors: StoryObj = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
        Status Colors
      </h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Colors for success, warning, error, and info states.
      </p>

      {Object.entries(semantic.status).map(([status, colors]) => (
        <div key={status} style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", textTransform: "capitalize" }}>
            {status}
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {Object.entries(colors).map(([name, value]) => (
              <ColorSwatch
                key={name}
                name={name}
                value={value}
                textColor={["default", "hover", "text"].includes(name) ? "white" : "black"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
