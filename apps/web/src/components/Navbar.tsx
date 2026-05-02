"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-[var(--color-primary)]"
        >
          Achieva
          <span className="ml-1 text-[var(--color-accent)]">✦</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <NavLink href="/feed" active={isActive("/feed")}>
            Feed
          </NavLink>
          <NavLink href="/leaderboard" active={isActive("/leaderboard")}>
            Leaderboard
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/achievements/new"
                className="rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                + Partager
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--color-accent)]">
                  {user.tokens} ✦
                </span>
                <Link href={`/profile/${user.id}`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                    {user.displayName[0].toUpperCase()}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
                >
                  Déco
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-[var(--color-surface-2)] text-[var(--color-text)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
      }`}
    >
      {children}
    </Link>
  );
}
