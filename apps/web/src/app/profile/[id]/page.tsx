"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AchievementCard from "../../../components/AchievementCard";
import { api } from "../../../lib/api";

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

interface Profile {
  id: string;
  displayName: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  tokens: number;
  kycVerified: boolean;
  createdAt: string;
  achievements: Achievement[];
}

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Profile>(`/users/${id}`)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
      </div>
    );

  if (!profile)
    return (
      <div className="py-24 text-center text-[var(--color-muted)]">
        Profil introuvable.
      </div>
    );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Profile header */}
      <div className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-3xl font-black text-white">
            {profile.displayName[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black">{profile.displayName}</h1>
              {profile.kycVerified && (
                <span
                  title="Identité vérifiée"
                  className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-accent)]"
                >
                  ✓ Vérifié
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-muted)]">@{profile.username}</p>
            {profile.bio && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-6 border-t border-[var(--color-border)] pt-5">
          <div>
            <p className="text-2xl font-black text-[var(--color-primary)]">
              ✦ {profile.tokens}
            </p>
            <p className="text-xs text-[var(--color-muted)]">Tokens</p>
          </div>
          <div>
            <p className="text-2xl font-black">{profile.achievements.length}</p>
            <p className="text-xs text-[var(--color-muted)]">Achievements</p>
          </div>
          <div>
            <p className="text-2xl font-black">
              {new Date(profile.createdAt).toLocaleDateString("fr-FR", {
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-[var(--color-muted)]">Membre depuis</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <h2 className="mb-4 text-lg font-bold">
        Réussites{" "}
        <span className="text-[var(--color-muted)]">
          ({profile.achievements.length})
        </span>
      </h2>

      {profile.achievements.length === 0 ? (
        <div className="py-16 text-center text-[var(--color-muted)]">
          <p className="text-3xl mb-2">🏆</p>
          <p>Aucune réussite partagée pour l'instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profile.achievements.map((a) => (
            <AchievementCard
              key={a.id}
              achievement={{ ...a, author: { id: profile.id, displayName: profile.displayName, username: profile.username, avatarUrl: profile.avatarUrl } }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
