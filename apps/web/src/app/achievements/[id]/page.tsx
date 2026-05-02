"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import TokenBadge from "../../../components/TokenBadge";
import { api } from "../../../lib/api";

const CATEGORY_LABELS: Record<string, string> = {
  sport: "Sport", education: "Éducation", travel: "Voyage",
  career: "Carrière", art: "Art", other: "Autre",
};

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

export default function AchievementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    api
      .get<Achievement>(`/achievements/${id}`)
      .then((a) => {
        setAchievement(a);
        setLikes(a.likesCount);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!user || liked || !achievement) return;
    await api.post(`/achievements/${id}/like`, {});
    setLikes((n) => n + 1);
    setLiked(true);
  };

  if (loading)
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="h-80 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
      </div>
    );

  if (!achievement)
    return (
      <div className="py-24 text-center text-[var(--color-muted)]">
        Achievement introuvable.
      </div>
    );

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {/* Author */}
      <div className="mb-6 flex items-center gap-3">
        <Link href={`/profile/${achievement.author.id}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white">
            {achievement.author.displayName[0].toUpperCase()}
          </div>
        </Link>
        <div>
          <Link
            href={`/profile/${achievement.author.id}`}
            className="font-semibold hover:text-[var(--color-primary)]"
          >
            {achievement.author.displayName}
          </Link>
          <p className="text-sm text-[var(--color-muted)]">
            @{achievement.author.username} ·{" "}
            {new Date(achievement.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Category */}
      <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/15 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
        {CATEGORY_LABELS[achievement.category] ?? achievement.category}
      </span>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-black leading-tight">{achievement.title}</h1>

      {/* Media */}
      {achievement.mediaUrls?.length > 0 && (
        <div className="mb-6 overflow-hidden rounded-2xl">
          <img
            src={achievement.mediaUrls[0]}
            alt={achievement.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="mb-8 whitespace-pre-wrap text-base leading-relaxed text-[var(--color-muted)]">
        {achievement.description}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
        <button
          onClick={handleLike}
          disabled={!user || liked}
          className={`flex items-center gap-2 text-sm font-semibold transition ${
            liked ? "text-[var(--color-primary)]" : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          } disabled:cursor-default`}
        >
          <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
          <span>{likes} like{likes !== 1 ? "s" : ""}</span>
        </button>
        <TokenBadge amount={achievement.tokensEarned} />
      </div>
    </main>
  );
}
