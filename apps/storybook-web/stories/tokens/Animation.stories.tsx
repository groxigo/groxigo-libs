import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { animation } from "@groxigo/tokens/animation";

const meta: Meta = {
  title: "Design Tokens/Animation",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mono: React.CSSProperties = { fontFamily: "monospace", fontSize: "10px" };
const page: React.CSSProperties = { padding: "32px", fontFamily: "var(--font-family-sans, system-ui)" };

/* ═══════════════════════════════════════════
   STORY: Durations
   ═══════════════════════════════════════════ */

const DurationBox = ({ name, ms }: { name: string; ms: number }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => {
        setPlaying(true);
        setTimeout(() => setPlaying(false), ms + 100);
      }}
    >
      <div style={{ width: "100px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
      </div>
      <code style={{ ...mono, color: "#2563eb", width: "130px" }}>--duration-{name}</code>
      <span style={{ fontSize: "12px", color: "#666", width: "60px" }}>{ms}ms</span>
      <div style={{ flex: 1, position: "relative", height: "32px" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "#3b82f6",
            transform: playing ? "translateX(200px)" : "translateX(0)",
            transition: `transform ${ms}ms ease-out`,
          }}
        />
      </div>
      <span style={{ fontSize: "10px", color: "#94a3b8" }}>Click to play</span>
    </div>
  );
};

export const Durations: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Duration Tokens</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Click each row to see the timing. Boxes translate 200px at the specified duration.
        <br />
        <code style={mono}>import {"{"} animation {"}"} from '@groxigo/tokens/animation'</code>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(animation.duration).map(([name, ms]) => (
          <DurationBox key={name} name={name} ms={ms} />
        ))}
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Easings
   ═══════════════════════════════════════════ */

const EasingBar = ({ name, value }: { name: string; value: string }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 16px",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => {
        setPlaying(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setPlaying(true));
        });
        setTimeout(() => setPlaying(false), 1000);
      }}
    >
      <div style={{ width: "100px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
      </div>
      <code style={{ ...mono, color: "#2563eb", width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        --easing-{name.replace(/([A-Z])/g, "-$1").toLowerCase()}
      </code>
      <div style={{ flex: 1, position: "relative", height: "24px", backgroundColor: "#e2e8f0", borderRadius: "12px" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: "#3b82f6",
            transform: playing ? "translateX(calc(100% + 200px))" : "translateX(0)",
            transition: `transform 600ms ${value}`,
          }}
        />
      </div>
      <span style={{ fontSize: "10px", color: "#94a3b8", width: "50px" }}>Click</span>
    </div>
  );
};

export const Easings: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Easing Curves</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Click each row to compare easing curves. All animate at 600ms to make differences visible.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(animation.easing).map(([name, value]) => (
          <EasingBar key={name} name={name} value={value} />
        ))}
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Transitions
   ═══════════════════════════════════════════ */

export const Transitions: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Transition Presets</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Pre-composed CSS transition strings. Copy the variable name and apply directly.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "170px 1fr",
            gap: "16px",
            padding: "10px 16px",
            borderBottom: "2px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>CSS Variable</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>Value</span>
        </div>

        {Object.entries(animation.transition).map(([name, value]) => {
          const cssVarName = `--transition-${name.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
          return (
            <div
              key={name}
              style={{
                display: "grid",
                gridTemplateColumns: "170px 1fr",
                gap: "16px",
                padding: "10px 16px",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                alignItems: "center",
              }}
            >
              <code style={{ ...mono, color: "#2563eb" }}>{cssVarName}</code>
              <code style={{ ...mono, color: "#666", wordBreak: "break-all" }}>{value}</code>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════
   STORY: Delays
   ═══════════════════════════════════════════ */

export const Delays: StoryObj = {
  render: () => (
    <div style={page}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Delay Tokens</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Common delay values for staggered animations.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(animation.delay).map(([name, ms]) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 140px 80px 1fr",
              gap: "16px",
              padding: "12px 16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
            <code style={{ ...mono, color: "#2563eb" }}>--delay-{name}</code>
            <span style={{ fontSize: "12px", color: "#666" }}>{ms}ms</span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    backgroundColor: "#3b82f6",
                    opacity: 0.2 + i * 0.2,
                  }}
                />
              ))}
              <span style={{ fontSize: "10px", color: "#94a3b8", alignSelf: "center", marginLeft: "4px" }}>
                {name === "stagger" ? `+${ms}ms per item` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
