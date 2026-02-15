import type { Meta, StoryObj } from "@storybook/react";
import { components, componentsDark } from "@groxigo/tokens/colors";

const meta: Meta = {
  title: "Design Tokens/Component Tokens",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* ─── Token list helper ─── */
const TokenList = ({
  tokens,
  prefix,
  dark = false,
}: {
  tokens: Record<string, string>;
  prefix: string;
  dark?: boolean;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    {Object.entries(tokens).map(([key, value]) => {
      const cssVar = `--${prefix}-${key}`;
      return (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              backgroundColor: value,
              border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`,
              flexShrink: 0,
            }}
          />
          <code style={{ ...mono, color: dark ? "#60a5fa" : "#2563eb" }}>{cssVar}</code>
        </div>
      );
    })}
  </div>
);

/* ─── Dual-mode section ─── */
const DualSection = ({
  title,
  description,
  lightTokens,
  darkTokens,
  prefix,
  visual,
}: {
  title: string;
  description: string;
  lightTokens: Record<string, string>;
  darkTokens: Record<string, string>;
  prefix: string;
  visual?: React.ReactNode;
}) => (
  <div style={{ marginBottom: "48px" }}>
    <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>{title}</h3>
    <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>{description}</p>

    {visual && <div style={{ marginBottom: "16px" }}>{visual}</div>}

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {/* Light */}
      <div style={{ padding: "16px", borderRadius: "12px", background: "#fff", border: "1px solid #e2e8f0" }}>
        <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "10px", color: "#666", letterSpacing: "0.05em" }}>LIGHT</h4>
        <TokenList tokens={lightTokens} prefix={prefix} />
      </div>
      {/* Dark */}
      <div style={{ padding: "16px", borderRadius: "12px", background: "#0f172a", border: "1px solid #334155" }}>
        <h4 style={{ fontSize: "11px", fontWeight: 600, marginBottom: "10px", color: "#94a3b8", letterSpacing: "0.05em" }}>DARK</h4>
        <TokenList tokens={darkTokens} prefix={prefix} dark />
      </div>
    </div>
  </div>
);

/* ─── Helper to flatten nested tokens with proper var naming ─── */
const flattenToStrings = (obj: Record<string, unknown>, prefix: string): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "string") {
      result[key] = val;
    }
  }
  return result;
};

/* ═══════════════════════════════════════════
   STORY: Button Tokens
   ═══════════════════════════════════════════ */

export const ButtonTokens: StoryObj = {
  render: () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;

    return (
      <div style={page}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Button Tokens</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          All button variant tokens with light/dark comparison. Use <code style={mono}>--button-{"{variant}"}-{"{property}"}</code>.
          <br />
          <code style={mono}>import {"{"} components, componentsDark {"}"} from '@groxigo/tokens/colors'</code>
        </p>

        {/* Visual preview */}
        <div style={{ marginBottom: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {variants.map((v) => {
            const light = components.button[v];
            return (
              <button
                key={v}
                type="button"
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  backgroundColor: light.bg,
                  color: light.text,
                  border: light.border === "transparent" ? "2px solid transparent" : `2px solid ${light.border}`,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {v}
              </button>
            );
          })}
        </div>

        {variants.map((variant) => (
          <DualSection
            key={variant}
            title={`Button — ${variant}`}
            description={`Tokens for the ${variant} button variant.`}
            lightTokens={flattenToStrings(components.button[variant], "")}
            darkTokens={flattenToStrings(componentsDark.button[variant], "")}
            prefix={`button-${variant}`}
          />
        ))}
      </div>
    );
  },
};

/* ═══════════════════════════════════════════
   STORY: Input Tokens
   ═══════════════════════════════════════════ */

export const InputTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Input Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tokens for text inputs, selects, and form controls.
      </p>

      {/* Visual preview */}
      <div style={{ marginBottom: "24px", maxWidth: "320px" }}>
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: `2px solid ${components.input.border}`,
            backgroundColor: components.input.bg,
            color: components.input.text,
            fontSize: "14px",
          }}
        >
          Placeholder text
        </div>
      </div>

      <DualSection
        title="Input"
        description="Background, text, placeholder, border states (default, hover, focus, error, disabled)."
        lightTokens={flattenToStrings(components.input, "")}
        darkTokens={flattenToStrings(componentsDark.input, "")}
        prefix="input"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Card Tokens
   ═══════════════════════════════════════════ */

export const CardTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Card Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tokens for card backgrounds, borders, and shadows.
      </p>

      {/* Visual preview */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "24px" }}>
        <div
          style={{
            width: "200px",
            height: "140px",
            borderRadius: "12px",
            backgroundColor: components.card.bg,
            border: `1px solid ${components.card.border}`,
            boxShadow: components.card.shadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Default card
        </div>
        <div
          style={{
            width: "200px",
            height: "140px",
            borderRadius: "12px",
            backgroundColor: components.card.bgHover,
            border: `1px solid ${components.card.borderHover}`,
            boxShadow: components.card.shadowHover,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Hovered card
        </div>
      </div>

      <DualSection
        title="Card"
        description="Background, border, and shadow for default and hover states."
        lightTokens={flattenToStrings(components.card, "")}
        darkTokens={flattenToStrings(componentsDark.card, "")}
        prefix="card"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Badge Tokens
   ═══════════════════════════════════════════ */

export const BadgeTokens: StoryObj = {
  render: () => {
    const variants = ["default", "primary", "secondary", "success", "warning", "error", "info"] as const;

    return (
      <div style={page}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Badge Tokens</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Tokens for badge/tag variants. Use <code style={mono}>--badge-{"{variant}"}-{"{bg|text|border}"}</code>.
        </p>

        {/* Visual preview */}
        <div style={{ marginBottom: "24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {variants.map((v) => {
            const light = components.badge[v];
            return (
              <span
                key={v}
                style={{
                  display: "inline-flex",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: light.bg,
                  color: light.text,
                  border: `1px solid ${light.border}`,
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {v}
              </span>
            );
          })}
        </div>

        {variants.map((variant) => (
          <DualSection
            key={variant}
            title={`Badge — ${variant}`}
            description={`Background, text, and border for ${variant} badges.`}
            lightTokens={flattenToStrings(components.badge[variant], "")}
            darkTokens={flattenToStrings(componentsDark.badge[variant], "")}
            prefix={`badge-${variant}`}
          />
        ))}
      </div>
    );
  },
};

/* ═══════════════════════════════════════════
   STORY: Modal Tokens
   ═══════════════════════════════════════════ */

export const ModalTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Modal Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Background, border, overlay, and shadow tokens for modals/dialogs.
      </p>

      <DualSection
        title="Modal"
        description="Modal background, border, overlay backdrop, and shadow."
        lightTokens={flattenToStrings(components.modal, "")}
        darkTokens={flattenToStrings(componentsDark.modal, "")}
        prefix="modal"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Navigation & Tab Tokens
   ═══════════════════════════════════════════ */

export const NavAndTabTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Navigation & Tab Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tokens for navigation bars and tab components.
      </p>

      <DualSection
        title="Navigation"
        description="Nav bar background, text, and border for default/hover/active states."
        lightTokens={flattenToStrings(components.nav, "")}
        darkTokens={flattenToStrings(componentsDark.nav, "")}
        prefix="nav"
      />

      <DualSection
        title="Tab"
        description="Tab backgrounds, text, and border for default/hover/active states."
        lightTokens={flattenToStrings(components.tab, "")}
        darkTokens={flattenToStrings(componentsDark.tab, "")}
        prefix="tab"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Toggle & Progress Tokens
   ═══════════════════════════════════════════ */

export const ToggleAndProgressTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Toggle & Progress Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tokens for toggle switches and progress bars.
      </p>

      {/* Toggle visual */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "24px" }}>
        {/* Off state */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "52px",
              height: "28px",
              borderRadius: "14px",
              backgroundColor: components.toggle.bgOff,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "11px",
                backgroundColor: components.toggle.thumb,
                position: "absolute",
                top: "3px",
                left: "3px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <span style={{ fontSize: "10px", color: "#999" }}>Off</span>
        </div>
        {/* On state */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "52px",
              height: "28px",
              borderRadius: "14px",
              backgroundColor: components.toggle.bgOn,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "11px",
                backgroundColor: components.toggle.thumb,
                position: "absolute",
                top: "3px",
                right: "3px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <span style={{ fontSize: "10px", color: "#999" }}>On</span>
        </div>
      </div>

      <DualSection
        title="Toggle / Switch"
        description="Background for on/off/disabled states, and thumb colors."
        lightTokens={flattenToStrings(components.toggle, "")}
        darkTokens={flattenToStrings(componentsDark.toggle, "")}
        prefix="toggle"
      />

      {/* Progress visual */}
      <div style={{ marginBottom: "16px", maxWidth: "400px" }}>
        <div style={{ height: "8px", borderRadius: "4px", backgroundColor: components.progress.bg, overflow: "hidden" }}>
          <div style={{ width: "65%", height: "100%", borderRadius: "4px", backgroundColor: components.progress.fill }} />
        </div>
      </div>

      <DualSection
        title="Progress"
        description="Track background and fill colors (default, success, warning, error)."
        lightTokens={flattenToStrings(components.progress, "")}
        darkTokens={flattenToStrings(componentsDark.progress, "")}
        prefix="progress"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Alert Tokens
   ═══════════════════════════════════════════ */

export const AlertTokens: StoryObj = {
  render: () => {
    const statuses = ["success", "warning", "error", "info"] as const;

    return (
      <div style={page}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Alert Tokens</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>
          Tokens for alert/notification banners. Use <code style={mono}>--alert-{"{status}"}-{"{bg|border|text}"}</code>.
        </p>

        {/* Visual preview */}
        <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px", maxWidth: "500px" }}>
          {statuses.map((s) => {
            const t = components.alert[s];
            return (
              <div
                key={s}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: t.bg,
                  border: `1px solid ${t.border}`,
                  color: t.text,
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}: This is a {s} alert message.
              </div>
            );
          })}
        </div>

        {statuses.map((status) => (
          <DualSection
            key={status}
            title={`Alert — ${status}`}
            description={`Background, border, text, and icon color for ${status} alerts.`}
            lightTokens={flattenToStrings(components.alert[status], "")}
            darkTokens={flattenToStrings(componentsDark.alert[status], "")}
            prefix={`alert-${status}`}
          />
        ))}
      </div>
    );
  },
};

/* ═══════════════════════════════════════════
   STORY: Glass Tokens
   ═══════════════════════════════════════════ */

export const GlassTokens: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Glass / Glassmorphism Tokens</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Tokens for frosted glass effects on cards, buttons, and navigation.
      </p>

      {/* Visual preview */}
      <div
        style={{
          padding: "32px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          marginBottom: "24px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Glass card */}
        <div
          style={{
            width: "180px",
            height: "120px",
            borderRadius: "12px",
            backgroundColor: components.glass.card.bg,
            backdropFilter: "blur(12px)",
            border: `1px solid ${components.glass.card.border}`,
            boxShadow: components.glass.card.shadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Glass Card
        </div>
        {/* Glass button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="button"
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              backgroundColor: components.glass.button.bg,
              backdropFilter: "blur(12px)",
              border: `1px solid ${components.glass.button.border}`,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Glass Button
          </button>
        </div>
      </div>

      {(["card", "button", "nav", "modal"] as const).map((variant) => (
        <DualSection
          key={variant}
          title={`Glass — ${variant}`}
          description={`Glassmorphism tokens for ${variant} components.`}
          lightTokens={flattenToStrings(components.glass[variant], "")}
          darkTokens={flattenToStrings(componentsDark.glass[variant], "")}
          prefix={`glass-${variant}`}
        />
      ))}
    </div>
  ),
};
