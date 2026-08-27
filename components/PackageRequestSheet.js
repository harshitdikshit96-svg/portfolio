"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { validateName, validatePhone } from "@/lib/validation";

const formatRs = (n) => `₹${n.toLocaleString("en-IN")}`;

/**
 * The "Request this package" form — a centered modal on wider screens, a
 * bottom sheet on phone widths (same markup, styled differently past the
 * breakpoint in globals.css, matching how .nav-mobile-panel
 * already handle responsive presentation here without a JS breakpoint
 * check). Replaces the old mailto: link — submissions now save to the
 * database and show up in /admin instead of opening the visitor's email
 * client.
 *
 * Portals to document.body rather than rendering inline. Every page
 * section here has `animation: fadeUp ... both` (see globals.css), and
 * because that animation's end keyframe is `transform: translateY(0)` —
 * not literally `none` — the fill-mode keeps a real (non-none) transform
 * applied to the section forever, which per spec makes it the containing
 * block for any `position: fixed` descendant. Rendered inline, this
 * modal's backdrop ended up sized/positioned against that section's box
 * instead of the viewport (confirmed: its rect was thousands of pixels
 * tall, offset far above the screen). A portal escapes that ancestor
 * entirely, which is the standard fix for this class of bug regardless of
 * this specific cause.
 */
export default function PackageRequestSheet({ tier, addons, total, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      return;
    }
    setErrors({});
    setServerError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/package-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          tierId: tier.id,
          addonIds: addons.map((a) => a.id),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.error || "Something went wrong — please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Couldn't reach the server — check your connection and try again.");
      setStatus("error");
    }
  };

  // No SSR/mount guard needed for document.body here — this component only
  // ever mounts from a client-side click on "Request this package"
  // (PackageBuilder's showRequestSheet starts false), never during the
  // initial server render, so `document` is always available by the time
  // this runs.
  return createPortal(
    <div className="request-sheet-backdrop" onClick={onClose}>
      <div
        className="request-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="request-sheet-handle" aria-hidden="true" />
        <button type="button" className="request-sheet-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {status === "success" ? (
          <div className="request-sheet-success">
            <h3 id="request-sheet-title" style={{ margin: "0 0 8px" }}>
              Got it — thanks{name ? `, ${name.trim().split(" ")[0]}` : ""}!
            </h3>
            <p style={{ margin: 0 }}>
              I&apos;ll reach out on {phone.trim()} within a few hours to confirm scope and next steps.
            </p>
            <button type="button" className="btn-primary" style={{ marginTop: 20 }} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 id="request-sheet-title" style={{ margin: "0 0 4px" }}>
              Request {tier.name}
            </h3>
            <p className="request-sheet-summary">
              {formatRs(total)}
              {addons.length ? ` — ${tier.name} + ${addons.length} add-on${addons.length > 1 ? "s" : ""}` : ""}, starting
              price
            </p>

            <form onSubmit={handleSubmit} className="request-sheet-form">
              <div>
                <label htmlFor="request-name" className="admin-login-label">
                  Your name
                </label>
                <input
                  id="request-name"
                  ref={nameRef}
                  type="text"
                  className="contact-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                {errors.name && <p className="request-sheet-field-error">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="request-phone" className="admin-login-label">
                  Mobile number
                </label>
                <input
                  id="request-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="98765 43210"
                  className="contact-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
                {errors.phone && <p className="request-sheet-field-error">{errors.phone}</p>}
              </div>

              {serverError && <p className="request-sheet-field-error">{serverError}</p>}

              <button type="submit" className="btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send request →"}
              </button>
              <p className="request-sheet-disclaimer">
                No payment, no spam — just a callback to confirm scope and price.
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
