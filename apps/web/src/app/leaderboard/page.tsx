"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../lib/api";

interface RankEntry {
  rank: number;
  tokens: number;
  user: {
    id: string;
    displayName: string;
    username: string;
    avatarUrl: string | null;
  };
}

const RANK_STYLES: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "bg-yellow-500/15", text: "text-yellow-400", label: "🥇" },
  2: { bg: "bg-gray-400/15", text: "text-gray-300", label: "🥈" },
  3: { bg: "bg-orange-600/15", text: "text-orange-400", label: "🥉" },
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<RankEntry[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number | null; tokens: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<RankEntry[]>("/leaderboard?limit=20"),
      user ? api.get<{ rank: number | null; tokens: number }>("/leaderboard/me") : Promise.resolve(null),
    ])
      .then(([top, me]) => {
        setEntries(top);
        setMyRank(me);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black">Classement</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Top 20 · Mis à jour en temps réel
        </p>
      </div>

      {/* My rank banner */}
      {user && myRank && myRank.rank && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-5 py-4">
          <div>
            <p className="text-xs font-medium text-[var(--color-accent)]">Ta position</p>
            <p className="text-xl font-black">#{myRank.rank}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-[var(--color-muted)]">Tokens</p>
            <p className="text-xl font-black text-[var(--color-accent)]">
              ✦ {myRank.tokens}
            </p>
          </div>
        </div>
      )}

      {/* Leaderboard list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-[var(--color-surface)]" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="py-24 text-center text-[var(--color-muted)]">
          <p className="text-4xl mb-3">🏆</p>
          <p>Aucun joueur pour l'instant.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => {
            const style = RANK_STYLES[entry.rank];
            const isMe = user?.id === entry.user.id;
            return (
              <Link
                key={entry.user.id}
                href={`/profile/${entry.user.id}`}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition hover:border-[var(--color-primary)] ${
                  isMe
                    ? "border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                {/* Rank */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    style ? `${style.bg} ${style.text}` : "bg-[var(--color-surface-2)] text-[var(--color-muted)]"
                  }`}
                >
                  {style ? style.label : `#${entry.rank}`}
                </div>

                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                  {entry.user.displayName[0].toUpperCase()}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold">
                    {entry.user.displayName}
                    {isMe && (
                      <span className="ml-2 text-xs text-[var(--color-primary)]">
                        (toi)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    @{entry.user.username}
                  </p>
                </div>

                {/* Tokens */}
                <div className="text-right">
                  <p className="font-black text-[var(--color-primary)]">
                    ✦ {entry.tokens}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
