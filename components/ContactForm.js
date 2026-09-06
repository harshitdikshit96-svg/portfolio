"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { colors } from "@/lib/colors";
import { SERVICES, WHATSAPP_URL, CALENDLY_URL } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { validateName, validatePhone, validateEmailOptional, validateMessage } from "@/lib/validation";

const initialForm = { name: "", phone: "", email: "", service: SERVICES[0].title, message: "" };

// Phone is required and email is optional — the reverse of what this form
// used to ask for. The Lucknow business census behind our market research
// found only 5–19% of local businesses even publish an email address;
// phone and WhatsApp are how this audience actually does business, so
// demanding an email was filtering out real enquiries.
export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const clientError =
      validateName(form.name) ||
      validatePhone(form.phone) ||
      validateEmailOptional(form.email) ||
      validateMessage(form.message);
    if (clientError) {
      setError(clientError);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: pathname }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Couldn't send that — try again, or book a call instead.");
        setStatus("error");
        return;
      }

      // Only now is this a real lead. Firing before the round-trip is what
      // made the old mailto flow report enquiries that never existed.
      trackEvent("generate_lead", { lead_type: "contact_form" });
      setForm(initialForm);
      setStatus("sent");
    } catch {
      setError("Network hiccup — try again, or book a call instead.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        style={{
          maxWidth: 520,
          border: `1px solid ${colors.borderStrong}`,
          borderRadius: 10,
          padding: "22px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <strong style={{ fontSize: 17 }}>Got it — that&apos;s with me.</strong>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: colors.textDim }}>
          I&apos;ll get back to you within one working day. If it&apos;s urgent, {WHATSAPP_URL ? "WhatsApp" : "booking a slot"} is faster.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
          <a
            href={WHATSAPP_URL || CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {WHATSAPP_URL ? "Message on WhatsApp" : "Book a free call"}
          </a>
          <button type="button" className="btn-secondary" onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
      <input
        required
        type="text"
        placeholder="Your name"
        autoComplete="name"
        className="contact-field"
        value={form.name}
        onChange={update("name")}
      />
      <input
        required
        type="tel"
        inputMode="numeric"
        placeholder="Mobile number (WhatsApp preferred)"
        autoComplete="tel"
        className="contact-field"
        value={form.phone}
        onChange={update("phone")}
      />
      <input
        type="email"
        placeholder="Email (optional)"
        autoComplete="email"
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
      <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
      {status === "error" && error && (
        <p role="alert" style={{ fontSize: 14, color: colors.accent, margin: 0 }}>
          {error}
        </p>
      )}
      <p style={{ fontSize: 13.5, color: colors.textFaintest, margin: 0, lineHeight: 1.6 }}>
        No spam, no mailing list — this goes straight to me and I reply within one working day.
      </p>
    </form>
  );
}
