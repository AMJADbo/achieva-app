import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center px-4 text-center">
      {/* Hero */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-4xl shadow-lg shadow-[var(--color-primary)]/30">
        🏆
      </div>

      <h1 className="mb-4 text-5xl font-black tracking-tight">
        Partage tes{" "}
        <span className="text-[var(--color-primary)]">réussites</span>.{" "}
        <br />
        Gagne des{" "}
        <span className="text-[var(--color-accent)]">tokens</span>.
      </h1>

      <p className="mb-10 max-w-lg text-lg text-[var(--color-muted)]">
        Achieva est le réseau social de tes accomplissements — sport, carrière,
        voyages, art. Prouve qui tu es, grimpe dans le classement.
      </p>

      <div className="flex gap-4">
        <Link
          href="/register"
          className="rounded-xl bg-[var(--color-primary)] px-8 py-3 text-base font-bold text-white shadow-lg shadow-[var(--color-primary)]/30 transition hover:bg-[var(--color-primary-hover)]"
        >
          Commencer gratuitement
        </Link>
        <Link
          href="/feed"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-3 text-base font-bold text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Voir le feed
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-20 flex gap-12 text-center">
        {[
          { value: "100%", label: "Identités vérifiées" },
          { value: "+10", label: "Tokens par actu" },
          { value: "#1", label: "Grimpez le classement" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-black text-[var(--color-primary)]">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{s.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
