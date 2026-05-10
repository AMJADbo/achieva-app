"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import TokenBadge from "./TokenBadge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaUrls: string[];
  tokensEarned: number;
  likesCount: number;
  createdAt: string;
  author: {
    id: string;
    displayName: string;
    username: string;
    avatarUrl: string | null;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  sport: "bg-emerald-500/15 text-emerald-400",
  education: "bg-blue-500/15 text-blue-400",
  travel: "bg-violet-500/15 text-violet-400",
  career: "bg-[var(--color-accent)]/15 text-[var(--color-accent)]",
  art: "bg-pink-500/15 text-pink-400",
  other: "bg-[var(--color-surface-2)] text-[var(--color-muted)]",
};

const CATEGORY_LABELS: Record<string, string> = {
  sport: "Sport",
  education: "Éducation",
  travel: "Voyage",
  career: "Carrière",
  art: "Art",
  other: "Autre",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}j`;
}

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(achievement.likesCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user || liked) return;
    try {
      await api.post(`/achievements/${achievement.id}/like`, {});
      setLikes((n) => n + 1);
      setLiked(true);
    } catch {}
  };

  const firstImage = achievement.mediaUrls?.[0];

  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-xl overflow-hidden transition hover:shadow-lg hover:shadow-black/20 hover:border-white/20">
      {/* Image */}
      {firstImage && (
        <Link href={`/achievements/${achievement.id}`}>
          <img
            src={firstImage}
            alt={achievement.title}
            className="h-48 w-full object-cover"
          />
        </Link>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <Link href={`/profile/${achievement.author.id}`} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white shrink-0">
              {achievement.author.displayName[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                {achievement.author.displayName}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                @{achievement.author.username}
              </p>
            </div>
          </Link>
          <span className="text-xs text-[var(--color-muted)]">
            {timeAgo(achievement.createdAt)}
          </span>
        </div>

        {/* Category */}
        <span
          className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            CATEGORY_COLORS[achievement.category] ?? CATEGORY_COLORS.other
          }`}
        >
          {CATEGORY_LABELS[achievement.category] ?? achievement.category}
        </span>

        {/* Title */}
        <Link href={`/achievements/${achievement.id}`}>
          <h3 className="mb-1 text-base font-bold leading-snug hover:text-[var(--color-primary)] transition">
            {achievement.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-[var(--color-muted)]">
          {achievement.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={!user || liked}
            className={`flex items-center gap-1.5 text-sm transition ${
              liked
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            } disabled:cursor-default`}
          >
            <span>{liked ? "❤️" : "🤍"}</span>
            <span className="font-medium">{likes}</span>
          </button>

          <TokenBadge amount={achievement.tokensEarned} />
        </div>
      </div>
    </article>
  );
}
