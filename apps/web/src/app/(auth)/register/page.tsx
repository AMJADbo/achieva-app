"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    username: "",
    displayName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      router.push("/feed");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-4xl">🏆</span>
          <h1 className="mt-3 text-2xl font-black">Créer un compte</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Identité vérifiée · Classement mondial
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4"
        >
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          {[
            { key: "email", label: "Email", type: "email", placeholder: "toi@example.com" },
            { key: "username", label: "Nom d'utilisateur", type: "text", placeholder: "john_doe" },
            { key: "displayName", label: "Prénom & Nom", type: "text", placeholder: "John Doe" },
            { key: "password", label: "Mot de passe", type: "password", placeholder: "8 caractères minimum" },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={set(field.key as keyof typeof form)}
                placeholder={field.placeholder}
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)] placeholder:text-[var(--color-muted)]"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-bold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
          >
            {loading ? "Création…" : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--color-accent)] hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
