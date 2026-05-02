// ─── User ────────────────────────────────────────────────────────────────────

export type UserId = string;

export interface User {
  id: UserId;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  tokens: number;
  kycVerified: boolean;
  createdAt: string;
}

// ─── Achievement ─────────────────────────────────────────────────────────────

export type AchievementId = string;

export type AchievementCategory =
  | "sport"
  | "education"
  | "travel"
  | "career"
  | "art"
  | "other";

export interface Achievement {
  id: AchievementId;
  authorId: UserId;
  title: string;
  description: string;
  category: AchievementCategory;
  mediaUrls: string[];
  tokensEarned: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
