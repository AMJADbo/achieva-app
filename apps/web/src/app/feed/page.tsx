"use client";

import { useEffect, useState } from "react";
import AchievementCard from "../../components/AchievementCard";
import { api } from "../../lib/api";

const CATEGORIES = [
  { value: "", label: "Tout" },
  { value: "sport", label: "Sport" },
  { value: "education", label: "Éducation" },
  { value: "travel", label: "Voyage" },
  { value: "career", label: "Carrière" },
  { value: "art", label: "Art" },
  { value: "fishing", label: "🎣 Pêche" },
  { value: "other", label: "Autre" },
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaUrls: string[];
  tokensEarned: number;
  likesCount: number;
  createdAt: string;
  author: { id: string; displayName: string; username: string; avatarUrl: string | null };
}

export default function FeedPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const LIMIT = 12;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
    if (category) params.set("category", category);
    api
      .get<{ data: Achievement[]; meta: { total: number } }>(`/achievements?${params}`)
      .then((res) => {
        setAchievements(res.data);
        setTotal(res.meta.total);
      })
      .finally(() => setLoading(false));
  }, [category, page]);

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-black">Feed</h1>

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => handleCategory(c.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c.value
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl bg-[var(--color-surface)]"
            />
          ))}
        </div>
      ) : achievements.length === 0 ? (
        <div className="py-24 text-center text-[var(--color-muted)]">
          <p className="text-4xl mb-3">🏆</p>
          <p className="font-medium">Aucun achievement pour l'instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > LIMIT && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm disabled:opacity-40 hover:border-[var(--color-primary)]"
          >
            ← Précédent
          </button>
          <span className="text-sm text-[var(--color-muted)]">
            Page {page} / {Math.ceil(total / LIMIT)}
          </span>
          <button
            disabled={page >= Math.ceil(total / LIMIT)}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm disabled:opacity-40 hover:border-[var(--color-primary)]"
          >
            Suivant →
          </button>
        </div>
      )}
    </main>
  );
}
