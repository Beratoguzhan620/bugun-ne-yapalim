import type { Category, Suggestion } from "@/data/suggestions";

export type CategoryFilter = Category | null;

export function inCategory(pool: readonly Suggestion[], category: CategoryFilter): Suggestion[] {
  return category === null ? [...pool] : pool.filter((s) => s.category === category);
}

/**
 * Picks a random suggestion from the filtered pool. The current one is never picked again right away,
 * and recently seen ones are avoided while there is anything else left.
 */
export function pickNext(
  pool: readonly Suggestion[],
  options: { category: CategoryFilter; currentId?: string | null; recentIds?: readonly string[]; random?: () => number },
): Suggestion | null {
  const random = options.random ?? Math.random;
  const candidates = inCategory(pool, options.category).filter((s) => s.id !== options.currentId);
  if (candidates.length === 0) return null;

  const recent = new Set(options.recentIds ?? []);
  const fresh = candidates.filter((s) => !recent.has(s.id));
  const choices = fresh.length > 0 ? fresh : candidates;
  return choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];
}

/** Keeps the last few ids, newest first, without duplicates. */
export function remember(recentIds: readonly string[], id: string, size = 8): string[] {
  return [id, ...recentIds.filter((existing) => existing !== id)].slice(0, size);
}
