"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../lib/api";

const CATEGORIES = [
  { value: "sport", label: "🏅 Sport" },
  { value: "education", label: "📚 Éducation" },
  { value: "travel", label: "✈️ Voyage" },
  { value: "career", label: "💼 Carrière" },
  { value: "art", label: "🎨 Art" },
  { value: "other", label: "⭐ Autre" },
];

export default function NewAchievementPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "other",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const achievement = await api.post<{ id: string }>("/achievements", form);
      router.push(`/achievements/${achievement.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la publication");
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-black">Partager une réussite</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        +10 tokens automatiquement à la publication ✦
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      >
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">Catégorie</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: c.value }))}
                className={`rounded-lg border py-2.5 text-sm font-medium transition ${
                  form.category === c.value
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Titre</label>
          <input
            type="text"
            value={form.title}
            onChange={set("title")}
            placeholder="J'ai terminé mon premier marathon !"
            required
            minLength={3}
            maxLength={120}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)] placeholder:text-[var(--color-muted)]"
          />
          <p className="mt-1 text-right text-xs text-[var(--color-muted)]">
            {form.title.length}/120
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={set("description")}
            placeholder="Raconte ta réussite en détail…"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)] placeholder:text-[var(--color-muted)]"
          />
          <p className="mt-1 text-right text-xs text-[var(--color-muted)]">
            {form.description.length}/2000
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
        >
          {submitting ? "Publication…" : "Publier et gagner +10 ✦"}
        </button>
      </form>
    </main>
  );
}
