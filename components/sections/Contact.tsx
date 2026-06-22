"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
// TODO: Add EmailJS keys to enable real email sending
// import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialRow } from "@/components/SocialRow";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sending, setSending] = useState(false);

  // Basic client-side validation.
  function validate(values: FormState): Partial<FormState> {
    const e: Partial<FormState> = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) e.message = "Message can't be empty.";
    return e;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSending(true);

    // TODO: Add EmailJS keys to enable real email sending.
    // Real sending is currently disabled — we just validate, show a success
    // toast, and reset the form. To enable, restore the emailjs.send() call:
    //
    //   await emailjs.send(serviceId, templateId, {
    //     from_name: form.name,
    //     reply_to: form.email,
    //     message: form.message,
    //   }, { publicKey });
    //
    // with the keys from .env.local (NEXT_PUBLIC_EMAILJS_*).

    // Simulate a brief send so the loading state is visible.
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("Message received! I'll get back to you soon.");
    setForm(EMPTY);
    setSending(false);
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="// 05. contact"
        title="Get In Touch"
        subtitle="Have a role, a project, or a threat to discuss? Drop me a line — or just talk to the terminal."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Left — contact form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="space-y-5 rounded-2xl border border-glow bg-background-secondary p-8"
        >
          <Field label="Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              className="input"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane@company.com"
              className="input"
            />
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me what's on your mind..."
              className="input resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-accent-purple px-6 py-3 font-mono text-sm font-medium text-accent-purple transition-all duration-300 hover:bg-accent-purple hover:text-white hover:shadow-glow-purple disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>&gt;_ SEND_MESSAGE</>
            )}
          </button>
        </motion.form>

        {/* Right — interactive terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <InteractiveTerminal />
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <SocialRow />
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-text-secondary">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 font-mono text-xs text-accent-red">{error}</p>}
    </div>
  );
}
