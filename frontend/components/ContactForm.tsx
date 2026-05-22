"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { getPublicApiBaseUrl } from "@/lib/apiBase";
import styles from "./ContactForm.module.css";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(formData: FormData) {
    const apiBaseUrl = getPublicApiBaseUrl();

    setState({ status: "submitting", message: "" });

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company") || null,
          message: formData.get("message"),
          website: formData.get("website") || null,
          captcha_token: formData.get("captcha_token") || null,
        }),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      const result = (await response.json()) as { message: string };
      setState({ status: "success", message: result.message });
    } catch {
      setState({
        status: "error",
        message: "送信に失敗しました。バックエンド起動後にもう一度試してください。",
      });
    }
  }

  return (
    <form
      className={styles.contactForm}
      onSubmit={async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleSubmit(new FormData(event.currentTarget));
      }}
    >
      <label>
        Name
        <input name="name" type="text" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Company
        <input name="company" type="text" />
      </label>
      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <input name="captcha_token" type="hidden" />
      <label>
        Message
        <textarea name="message" rows={6} required />
      </label>
      <button type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {state.message ? (
        <p
          className={`${styles.formMessage} ${state.status === "success" ? styles.success : state.status === "error" ? styles.error : ""}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
