"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="admin-login-form">
      <label htmlFor="admin-password" className="admin-login-label">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="contact-field"
      />
      {state?.error && <p className="admin-login-error">{state.error}</p>}
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
