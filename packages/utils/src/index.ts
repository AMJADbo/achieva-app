// ─── Formatting ──────────────────────────────────────────────────────────────

export function formatTokens(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}K`;
  return String(amount);
}

export function formatRelativeDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString();
}

// ─── Validation ──────────────────────────────────────────────────────────────

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}

// ─── Pagination ──────────────────────────────────────────────────────────────

export function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const data = items.slice((page - 1) * limit, page * limit);
  return { data, meta: { page, limit, total } };
}
