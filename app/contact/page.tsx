"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const PLACEMENTS = [
  "Arm", "Forearm", "Sleeve", "Chest", "Back",
  "Shoulder", "Neck", "Hand", "Leg", "Thigh", "Calf", "Rib", "Other",
];

const SIZES = [
  "Small (1–3 inches)",
  "Medium (4–7 inches)",
  "Large (8–12 inches)",
  "Half Sleeve",
  "Full Sleeve",
  "Large piece / multiple sessions",
];

const BUDGETS = [
  "Under $200",
  "$200 – $500",
  "$500 – $1,000",
  "$1,000+",
  "Not sure",
];

const COLOR_STYLES = ["Black & Grey", "Full Color", "Not Sure Yet"];

const TATTOO_STYLES = [
  "Realism",
  "Traditional",
  "Neo-Traditional",
  "Blackwork",
  "Fine Line",
  "Lettering",
  "Portrait",
  "Japanese",
  "Geometric",
  "Not Sure",
];

const ARTISTS = [
  "No Preference",
  "Hunter Hulley",
  "Austin Jackels",
  "Nick Gagnon",
  "John Carpenter",
];

const TIMELINES = [
  "As soon as possible",
  "Within the next month",
  "Within the next few months",
  "Flexible",
];

const divider = (
  <div style={{ borderTop: "1px solid rgba(191,132,26,0.15)", margin: "2.5rem 0" }} />
);

const fieldLabel = (text: string, required = false): React.ReactNode => (
  <label
    style={{
      display: "block",
      fontFamily: '"trajan-pro-3", serif',
      fontSize: "clamp(0.85rem, 2vw, 1rem)",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#f5f5f5",
      marginBottom: "0.6rem",
    }}
  >
    {text}
    {required && <span style={{ color: "rgba(191,132,26,0.8)", marginLeft: "0.3em" }}>*</span>}
  </label>
);

const hint = (text: string) => (
  <p
    style={{
      fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
      fontSize: "0.8rem",
      fontWeight: 300,
      color: "rgba(255,255,255,0.35)",
      margin: "0.4rem 0 0",
      letterSpacing: "0.04em",
    }}
  >
    {text}
  </p>
);

const radioRow = (
  opts: string[],
  name: string,
  value: string,
  onChange: (v: string) => void,
  required?: boolean,
) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.25rem" }}>
    {opts.map((o) => (
      <label
        key={o}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
          fontSize: "0.95rem",
          fontWeight: 300,
          color: value === o ? "#f5f5f5" : "rgba(255,255,255,0.55)",
          cursor: "pointer",
          padding: "0.5em 1em",
          border: `1px solid ${value === o ? "rgba(191,132,26,0.6)" : "rgba(191,132,26,0.2)"}`,
          borderRadius: 2,
          transition: "all 0.2s",
          textTransform: "none",
          letterSpacing: "normal",
        }}
      >
        <input
          type="radio"
          name={name}
          value={o}
          checked={value === o}
          onChange={() => onChange(o)}
          required={required && value === ""}
          style={{ display: "none" }}
        />
        {o}
      </label>
    ))}
  </div>
);

export default function ContactPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverUpFileInputRef = useRef<HTMLInputElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [coverUpFileNames, setCoverUpFileNames] = useState<string[]>([]);

  const [form, setForm] = useState({
    idea: "",
    placement: "",
    size: "",
    budget: "",
    colorStyle: "",
    tattooStyle: "",
    isCoverUp: "",
    firstTattoo: "",
    artist: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    ageConfirmed: false,
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setRadio = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFileNames(files.map((f) => f.name));
  };

  const handleCoverUpFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setCoverUpFileNames(files.map((f) => f.name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sectionHead = (title: string) => (
    <h2
      style={{
        fontFamily: '"trajan-pro-3", serif',
        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(191,132,26,0.85)",
        margin: "0 0 1.5rem",
      }}
    >
      {title}
    </h2>
  );

  if (submitted) {
    return (
      <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f5", fontFamily: '"trajan-pro-3", serif' }}>
        <div className="px-6 py-6">
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            ← Back
          </Link>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(191,132,26,0.7)", marginBottom: "1.5rem" }}>
            Request Received
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 1.5rem" }}>
            Thanks, {form.name || "friend"}
          </h1>
          <p style={{ fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif', fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 2.5rem" }}>
            We&apos;ve received your tattoo request and will be in touch with next steps. Our team reviews requests weekly — we appreciate your patience.
          </p>
          <Link href="/" className="gold-btn">
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f5", fontFamily: '"trajan-pro-3", serif' }}>
      {/* Back nav */}
      <div className="px-6 py-6">
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Header */}
      <section style={{ textAlign: "center", padding: "1rem 1.5rem 3.5rem", maxWidth: 700, margin: "0 auto", width: "100%" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
          Ink Kings Tattoo
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 1.5rem" }}>
          Request Custom Art
        </h1>
        <p style={{ fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif', fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto" }}>
          Tell us about the tattoo you&apos;re thinking about. The more detail you provide, the easier it is for our artists to give you accurate feedback and scheduling options.
        </p>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem 6rem", width: "100%" }}
      >
        {/* ── Tattoo Details ── */}
        {sectionHead("Tattoo Details")}

        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Tattoo Idea", true)}
          <textarea
            className="ik-input"
            rows={6}
            placeholder="Describe the tattoo idea, theme, symbols, or imagery you want."
            value={form.idea}
            onChange={set("idea")}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        {divider}

        {/* ── Placement ── */}
        {sectionHead("Placement on Body")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Body Placement", true)}
          <select className="ik-input" value={form.placement} onChange={set("placement")} required>
            <option value="" disabled>Select placement…</option>
            {PLACEMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {divider}

        {/* ── Size ── */}
        {sectionHead("Tattoo Size")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Approximate Size", true)}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.25rem" }}>
            {SIZES.map((s) => (
              <label
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  color: form.size === s ? "#f5f5f5" : "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  textTransform: "none",
                  letterSpacing: "normal",
                  transition: "color 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={form.size === s}
                  onChange={set("size")}
                  required={form.size === ""}
                  style={{ accentColor: "#bf841a", width: 16, height: 16, flexShrink: 0 }}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {divider}

        {/* ── Budget ── */}
        {sectionHead("Estimated Budget")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Budget Range", true)}
          {hint("Helps our artists recommend the right scale for your idea.")}
          <select
            className="ik-input"
            value={form.budget}
            onChange={set("budget")}
            required
            style={{ marginTop: "0.75rem" }}
          >
            <option value="" disabled>Select a range…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {divider}

        {/* ── Color Style ── */}
        {sectionHead("Color Style")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Ink Preference", true)}
          {radioRow(COLOR_STYLES, "colorStyle", form.colorStyle, setRadio("colorStyle"), true)}
        </div>

        {divider}

        {/* ── Tattoo Style ── */}
        {sectionHead("Tattoo Style")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Style Preference", true)}
          {hint("Not sure? That's fine — our artists can help guide you.")}
          <select
            className="ik-input"
            value={form.tattooStyle}
            onChange={set("tattooStyle")}
            required
            style={{ marginTop: "0.75rem" }}
          >
            <option value="" disabled>Select a style…</option>
            {TATTOO_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {divider}

        {/* ── Reference Images ── */}
        {sectionHead("Reference Images")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Upload References")}
          {hint("Upload inspiration images or references (optional)")}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              marginTop: "0.75rem",
              border: "1px dashed rgba(191,132,26,0.3)",
              borderRadius: 2,
              padding: "2rem 1.5rem",
              textAlign: "center",
              cursor: "pointer",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p style={{ fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif', fontSize: "0.9rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              {fileNames.length > 0 ? fileNames.join(", ") : "Click to upload images"}
            </p>
          </div>
          <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFiles} style={{ display: "none" }} />
        </div>

        {divider}

        {/* ── Cover-Up ── */}
        {sectionHead("Cover-Up")}
        <div style={{ marginBottom: form.isCoverUp === "Yes" ? "1.25rem" : "1.75rem" }}>
          {fieldLabel("Is this tattoo covering an existing tattoo?", true)}
          {radioRow(["No", "Yes"], "isCoverUp", form.isCoverUp, setRadio("isCoverUp"), true)}
        </div>

        {form.isCoverUp === "Yes" && (
          <div style={{ marginBottom: "1.75rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(191,132,26,0.25)" }}>
            {fieldLabel("Upload a photo of the existing tattoo")}
            {hint("This helps our artists plan the design and sizing.")}
            <div
              onClick={() => coverUpFileInputRef.current?.click()}
              style={{
                marginTop: "0.75rem",
                border: "1px dashed rgba(191,132,26,0.3)",
                borderRadius: 2,
                padding: "2rem 1.5rem",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p style={{ fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif', fontSize: "0.9rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                {coverUpFileNames.length > 0 ? coverUpFileNames.join(", ") : "Click to upload photo"}
              </p>
            </div>
            <input ref={coverUpFileInputRef} type="file" multiple accept="image/*" onChange={handleCoverUpFiles} style={{ display: "none" }} />
          </div>
        )}

        {divider}

        {/* ── Preferred Artist ── */}
        {sectionHead("Preferred Artist")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Artist")}
          <select className="ik-input" value={form.artist} onChange={set("artist")}>
            <option value="">Select an artist…</option>
            {ARTISTS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {divider}

        {/* ── Scheduling ── */}
        {sectionHead("Scheduling")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("When are you hoping to get tattooed?", true)}
          <select className="ik-input" value={form.timeline} onChange={set("timeline")} required>
            <option value="" disabled>Select a timeframe…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {divider}

        {/* ── Contact Info ── */}
        {sectionHead("Contact Info")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          <div>
            {fieldLabel("Name", true)}
            <input className="ik-input" type="text" placeholder="Your name" value={form.name} onChange={set("name")} required />
          </div>
          <div>
            {fieldLabel("Phone")}
            <input className="ik-input" type="tel" placeholder="(000) 000-0000" value={form.phone} onChange={set("phone")} />
          </div>
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Email", true)}
          <input className="ik-input" type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />
        </div>

        {divider}

        {/* ── First Tattoo ── */}
        {sectionHead("Your Experience")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Is this your first tattoo?")}
          {radioRow(["Yes", "No"], "firstTattoo", form.firstTattoo, setRadio("firstTattoo"))}
        </div>

        {divider}

        {/* ── Additional Notes ── */}
        {sectionHead("Additional Notes")}
        <div style={{ marginBottom: "1.75rem" }}>
          {fieldLabel("Anything else we should know?")}
          {hint("Optional — allergies, skin conditions, or anything else relevant.")}
          <textarea
            className="ik-input"
            rows={4}
            placeholder="Any additional details…"
            value={form.notes}
            onChange={set("notes")}
            style={{ resize: "vertical", marginTop: "0.75rem" }}
          />
        </div>

        {divider}

        {/* ── Age confirmation ── */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            cursor: "pointer",
            marginBottom: "2rem",
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={form.ageConfirmed}
            onChange={(e) => setForm((prev) => ({ ...prev, ageConfirmed: e.target.checked }))}
            required
            style={{ accentColor: "#bf841a", width: 18, height: 18, flexShrink: 0, marginTop: 2 }}
          />
          I confirm I am 18 years or older
        </label>

        {/* ── Submit ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
          <button type="submit" className="gold-btn">
            <span>SUBMIT TATTOO REQUEST</span>
          </button>
          <p style={{ fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif', fontSize: "0.8rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.04em" }}>
            Our team reviews tattoo requests weekly and will respond with next steps.
          </p>
        </div>
      </form>
    </main>
  );
}
