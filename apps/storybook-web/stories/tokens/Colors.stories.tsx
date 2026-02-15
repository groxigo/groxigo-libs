import type { Meta, StoryObj } from "@storybook/react";
import { primitives, semantic, semanticDark, components, componentsDark } from "@groxigo/tokens/colors";

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

/* ─── Shared styles ─── */
const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const heading: React.CSSProperties = { fontSize: "16px", fontWeight: 600, marginBottom: "12px", textTransform: "capitalize" as const };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* ─── Color swatch with CSS var name ─── */
const ColorSwatch = ({
  name,
  value,
  cssVar,
  textColor = "black",
}: {
  name: string;
  value: string;
  cssVar?: string;
  textColor?: string;
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", width: "88px" }}>
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
      <span style={{ fontSize: "9px", color: textColor, fontFamily: "monospace" }}>{value}</span>
    </div>
    <span style={{ fontSize: "11px", color: "#666", textAlign: "center" }}>{name}</span>
    {cssVar && (
      <code style={{ ...mono, color: "#2563eb", wordBreak: "break-all", textAlign: "center" }}>{cssVar}</code>
    )}
  </div>
);

/* ─── Color scale ─── */
const ColorScale = ({
  name,
  colors,
  prefix,
}: {
  name: string;
  colors: Record<string, string>;
  prefix: string;
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={heading}>{name}</h3>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {Object.entries(colors).map(([shade, value]) => (
        <ColorSwatch
          key={shade}
          name={shade}
          value={value}
          cssVar={`--${prefix}-${shade}`}
          textColor={parseInt(shade) >= 500 ? "white" : "black"}
        />
      ))}
    </div>
  </div>
);

/* ─── Semantic group ─── */
const SemanticGroup = ({
  title,
  entries,
  varPrefix,
  darkTextNames = [],
}: {
  title: string;
  entries: Record<string, string>;
  varPrefix: string;
  darkTextNames?: string[];
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={heading}>{title}</h3>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {Object.entries(entries).map(([name, value]) => (
        <ColorSwatch
          key={name}
          name={name}
          value={value}
          cssVar={`--${varPrefix}-${name}`}
          textColor={darkTextNames.includes(name) ? "white" : "black"}
        />
      ))}
    </div>
  </div>
);

/* ─── Brand group with hyphenated var names ─── */
const BrandGroup = ({
  title,
  entries,
  varPrefix,
}: {
  title: string;
  entries: Record<string, string>;
  varPrefix: string;
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={heading}>{title}</h3>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {Object.entries(entries).map(([name, value]) => {
        const varName = name === "default" ? `--${varPrefix}` : `--${varPrefix}-${name}`;
        return (
          <ColorSwatch
            key={name}
            name={name}
            value={value}
            cssVar={varName}
            textColor={["default", "hover", "active"].includes(name) ? "white" : "black"}
          />
        );
      })}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   STORY: Primitive Colors
   ═══════════════════════════════════════════ */

export const PrimitiveColors: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Primitive Colors</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tier 1 — Raw color values. The foundation palette from which all other colors derive.
        <br />
        <code style={mono}>import {"{"} primitives {"}"} from '@groxigo/tokens/colors'</code>
      </p>

      {/* Absolute */}
      <div style={{ marginBottom: "32px" }}>
        <h3 style={heading}>Absolute</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <ColorSwatch name="white" value={primitives.white} cssVar="--color-white" />
          <ColorSwatch name="black" value={primitives.black} cssVar="--color-black" textColor="white" />
        </div>
      </div>

      {/* Color families */}
      {(["gray", "blue", "green", "red", "yellow", "orange", "purple", "cyan", "pink", "indigo", "teal"] as const).map(
        (family) => (
          <ColorScale
            key={family}
            name={family}
            colors={primitives[family]}
            prefix={`color-${family}`}
          />
        )
      )}
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Semantic Colors
   ═══════════════════════════════════════════ */

export const SemanticColors: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Semantic Colors (Light)</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tier 2 — Meaningful names mapped from primitives for specific functional purposes.
        <br />
        <code style={mono}>import {"{"} semantic {"}"} from '@groxigo/tokens/colors'</code>
      </p>

      <SemanticGroup title="Surface" entries={semantic.surface} varPrefix="surface" />
      <SemanticGroup
        title="Text"
        entries={semantic.text}
        varPrefix="text"
        darkTextNames={["primary", "secondary", "link", "linkHover"]}
      />
      <SemanticGroup title="Border" entries={semantic.border} varPrefix="border" />

      <BrandGroup title="Brand — Primary" entries={semantic.brand.primary} varPrefix="brand-primary" />
      <BrandGroup title="Brand — Secondary" entries={semantic.brand.secondary} varPrefix="brand-secondary" />
      <BrandGroup title="Brand — Accent" entries={semantic.brand.accent} varPrefix="brand-accent" />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Status Colors
   ═══════════════════════════════════════════ */

export const StatusColors: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Status Colors</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Success, warning, error, and info states with CSS variable names.
      </p>

      {(Object.entries(semantic.status) as [string, Record<string, string>][]).map(
        ([status, colors]) => (
          <div key={status} style={{ marginBottom: "32px" }}>
            <h3 style={heading}>{status}</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {Object.entries(colors).map(([name, value]) => {
                const varName = name === "default" ? `--status-${status}` : `--status-${status}-${name}`;
                return (
                  <ColorSwatch
                    key={name}
                    name={name}
                    value={value}
                    cssVar={varName}
                    textColor={["default", "hover", "text"].includes(name) ? "white" : "black"}
                  />
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Dark Mode Comparison
   ═══════════════════════════════════════════ */

const ComparisonRow = ({
  label,
  lightEntries,
  darkEntries,
  varPrefix,
  darkTextNames = [],
}: {
  label: string;
  lightEntries: Record<string, string>;
  darkEntries: Record<string, string>;
  varPrefix: string;
  darkTextNames?: string[];
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={heading}>{label}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      {/* Light */}
      <div style={{ padding: "16px", borderRadius: "12px", background: "#fff", border: "1px solid #e2e8f0" }}>
        <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px", color: "#666" }}>LIGHT</h4>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {Object.entries(lightEntries).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              cssVar={`--${varPrefix}-${name}`}
              textColor={darkTextNames.includes(name) ? "white" : "black"}
            />
          ))}
        </div>
      </div>
      {/* Dark */}
      <div style={{ padding: "16px", borderRadius: "12px", background: "#0f172a", border: "1px solid #334155" }}>
        <h4 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px", color: "#94a3b8" }}>DARK</h4>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {Object.entries(darkEntries).map(([name, value]) => (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              cssVar={`--${varPrefix}-${name}`}
              textColor={darkTextNames.includes(name) ? "black" : "white"}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const DarkMode: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Light vs Dark Comparison</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Side-by-side semantic tokens. Same CSS var names, different resolved values. Dark mode activates via <code style={mono}>.dark</code> class on <code style={mono}>&lt;html&gt;</code>.
      </p>

      <ComparisonRow label="Surface" lightEntries={semantic.surface} darkEntries={semanticDark.surface} varPrefix="surface" />
      <ComparisonRow
        label="Text"
        lightEntries={semantic.text}
        darkEntries={semanticDark.text}
        varPrefix="text"
        darkTextNames={["primary", "secondary", "link", "linkHover"]}
      />
      <ComparisonRow label="Border" lightEntries={semantic.border} darkEntries={semanticDark.border} varPrefix="border" />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Component Colors
   ═══════════════════════════════════════════ */

const ComponentSection = ({
  name,
  lightTokens,
  darkTokens,
  varPrefix,
}: {
  name: string;
  lightTokens: Record<string, unknown>;
  darkTokens: Record<string, unknown>;
  varPrefix: string;
}) => {
  // Flatten one level deep for nested component tokens (e.g., button.primary.bg)
  const flattenTokens = (obj: Record<string, unknown>, prefix: string): { name: string; value: string; cssVar: string }[] => {
    const result: { name: string; value: string; cssVar: string }[] = [];
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === "string") {
        result.push({ name: key, value: val, cssVar: `--${prefix}-${key}` });
      } else if (typeof val === "object" && val !== null) {
        for (const [subKey, subVal] of Object.entries(val as Record<string, string>)) {
          if (typeof subVal === "string") {
            result.push({ name: `${key}.${subKey}`, value: subVal, cssVar: `--${prefix}-${key}-${subKey}` });
          }
        }
      }
    }
    return result;
  };

  const lightItems = flattenTokens(lightTokens, varPrefix);
  const darkItems = flattenTokens(darkTokens, varPrefix);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", textTransform: "capitalize" }}>
        {name}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Light */}
        <div style={{ padding: "16px", borderRadius: "12px", background: "#fff", border: "1px solid #e2e8f0" }}>
          <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "12px", color: "#666", letterSpacing: "0.05em" }}>LIGHT</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {lightItems.map((item) => (
              <div key={item.cssVar} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: item.value,
                    border: "1px solid rgba(0,0,0,0.1)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <code style={{ ...mono, color: "#2563eb" }}>{item.cssVar}</code>
                  <span style={{ fontSize: "9px", color: "#999", fontFamily: "monospace" }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Dark */}
        <div style={{ padding: "16px", borderRadius: "12px", background: "#0f172a", border: "1px solid #334155" }}>
          <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "12px", color: "#94a3b8", letterSpacing: "0.05em" }}>DARK</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {darkItems.map((item) => (
              <div key={item.cssVar} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: item.value,
                    border: "1px solid rgba(255,255,255,0.1)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <code style={{ ...mono, color: "#60a5fa" }}>{item.cssVar}</code>
                  <span style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace" }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ComponentColors: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Component Color Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tier 3 — Component-specific tokens with light/dark values. Use these when styling specific UI components.
        <br />
        <code style={mono}>import {"{"} components, componentsDark {"}"} from '@groxigo/tokens/colors'</code>
      </p>

      <ComponentSection name="Button" lightTokens={components.button} darkTokens={componentsDark.button} varPrefix="button" />
      <ComponentSection name="Input" lightTokens={components.input} darkTokens={componentsDark.input} varPrefix="input" />
      <ComponentSection name="Card" lightTokens={components.card} darkTokens={componentsDark.card} varPrefix="card" />
      <ComponentSection name="Badge" lightTokens={components.badge} darkTokens={componentsDark.badge} varPrefix="badge" />
      <ComponentSection name="Modal" lightTokens={components.modal} darkTokens={componentsDark.modal} varPrefix="modal" />
      <ComponentSection name="Navigation" lightTokens={components.nav} darkTokens={componentsDark.nav} varPrefix="nav" />
      <ComponentSection name="Tab" lightTokens={components.tab} darkTokens={componentsDark.tab} varPrefix="tab" />
      <ComponentSection name="Toggle" lightTokens={components.toggle} darkTokens={componentsDark.toggle} varPrefix="toggle" />
      <ComponentSection name="Progress" lightTokens={components.progress} darkTokens={componentsDark.progress} varPrefix="progress" />
      <ComponentSection name="Alert" lightTokens={components.alert} darkTokens={componentsDark.alert} varPrefix="alert" />
    </div>
  ),
};
