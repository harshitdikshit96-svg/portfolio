"use client";

import { useState } from "react";
import { colors } from "@/lib/colors";
import { SOCIAL, SERVICES } from "@/lib/data";

const initialForm = { name: "", email: "", service: SERVICES[0].title, message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Freelance inquiry: ${form.service}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `What I need help with: ${form.service}`,
      "",
      form.message,
    ].join("\n");
    const mailto = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
      <input
        required
        type="text"
        placeholder="Your name"
        className="contact-field"
        value={form.name}
        onChange={update("name")}
      />
      <input
        required
        type="email"
        placeholder="Your email"
        className="contact-field"
        value={form.email}
        onChange={update("email")}
      />
      <select className="contact-field" value={form.service} onChange={update("service")}>
        {SERVICES.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title}
          </option>
        ))}
        <option value="Something else">Something else</option>
      </select>
      <textarea
        required
        rows={5}
        placeholder="What are you trying to build or fix?"
        className="contact-field"
        style={{ resize: "vertical", fontFamily: "inherit" }}
        value={form.message}
        onChange={update("message")}
      />
      <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
        Send message →
      </button>
      {sent && (
        <p style={{ fontSize: 14, color: colors.textDimmer, margin: 0 }}>
          Opening your email client with this pre-filled — send it over and I&apos;ll reply within a couple of days.
        </p>
      )}
    </form>
  );
}
