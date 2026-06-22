"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialRow } from "@/components/SocialRow";
import { InteractiveTerminal } from "@/components/sections/InteractiveTerminal";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// EmailJS config. These are all PUBLIC/browser-safe values (they ship in the
// client bundle by design), so we keep them as inline defaults and let an
// env var override if set. This makes the live site work without configuring
// Vercel env vars. Abuse is prevented via EmailJS "Allowed Origins", NOT by
// hiding these. (Never put the EmailJS *private* key here.)
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_bnq2sgw";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_p7jta4w";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Wlw6Akakn5oOjap9m";
const EMAILJS_READY =
  !!EMAILJS_SERVICE_ID && !!EMAILJS_TEMPLATE_ID && !!EMAILJS_PUBLIC_KEY;

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

    // If EmailJS keys aren't configured yet, fail loudly in dev but don't
    // pretend to the visitor that the message was delivered.
    if (!EMAILJS_READY) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      toast.error(
        "Email sending isn't configured yet. Please reach out via the links below."
      );
      setSending(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY! }
      );
      toast.success("Message received! I'll get back to you soon.");
      setForm(EMPTY);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      toast.error("Something went wrong sending your message. Please try again.");
    } finally {
      setSending(false);
    }
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
