"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialRow } from "@/components/SocialRow";

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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service isn't configured yet.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey }
      );
      toast.success("Message sent — I'll be in touch soon!");
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading
        index="08."
        title="Get In Touch"
        subtitle="Have a role, a project, or a threat to discuss? Drop me a line."
      />

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="space-y-5 rounded-2xl border border-border bg-card p-8"
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
          className="btn-neon w-full border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </motion.form>

      <div className="mt-10 flex justify-center">
        <SocialRow />
      </div>

      {/* Local input styling kept inline to keep the component self-contained */}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #1c2842;
          background-color: #0a0f1e;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: #e2e8f0;
          font-family: var(--font-jetbrains);
          transition: all 0.2s ease;
        }
        :global(.input::placeholder) {
          color: #4a5a7a;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #00ff9f;
          box-shadow: 0 0 0 1px #00ff9f, 0 0 12px rgba(0, 255, 159, 0.25);
        }
      `}</style>
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
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      {children}
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
