import { describe, expect, it } from "vitest";

import { CATEGORIES, SUGGESTIONS, type Suggestion } from "@/data/suggestions";
import { activePin, dayKey, formatMinutes } from "@/lib/day";
import { inCategory, pickNext, remember } from "@/lib/picker";

describe("suggestions", () => {
  it("has at least 40 ideas with unique ids", () => {
    expect(SUGGESTIONS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(SUGGESTIONS.map((s) => s.id)).size).toBe(SUGGESTIONS.length);
  });

  it("covers every category with several ideas", () => {
    for (const category of CATEGORIES) {
      expect(inCategory(SUGGESTIONS, category).length).toBeGreaterThanOrEqual(8);
    }
  });

  it("has a title, description and positive duration for each idea", () => {
    for (const s of SUGGESTIONS) {
      expect(s.title.trim().length).toBeGreaterThan(3);
      expect(s.description.trim().length).toBeGreaterThan(10);
      expect(s.minutes).toBeGreaterThan(0);
    }
  });
});

describe("pickNext", () => {
  it("never returns the current suggestion", () => {
    let currentId: string | null = null;
    for (let i = 0; i < 500; i++) {
      const next: Suggestion = pickNext(SUGGESTIONS, { category: null, currentId })!;
      expect(next.id).not.toBe(currentId);
      currentId = next.id;
    }
  });

  it("stays inside the chosen category", () => {
    for (let i = 0; i < 100; i++) {
      expect(pickNext(SUGGESTIONS, { category: "Ev" })!.category).toBe("Ev");
    }
  });

  it("avoids recently seen ideas while others are left", () => {
    const pool = inCategory(SUGGESTIONS, "Zihin");
    const recent = pool.slice(0, pool.length - 1).map((s) => s.id);
    const next = pickNext(SUGGESTIONS, { category: "Zihin", recentIds: recent, random: () => 0 });
    expect(next!.id).toBe(pool[pool.length - 1].id);
  });

  it("falls back to recent ideas when everything was seen", () => {
    const pool = inCategory(SUGGESTIONS, "Sosyal");
    const next = pickNext(SUGGESTIONS, { category: "Sosyal", currentId: pool[0].id, recentIds: pool.map((s) => s.id), random: () => 0 });
    expect(next!.id).toBe(pool[1].id);
  });

  it("handles a random source that returns 1", () => {
    expect(pickNext(SUGGESTIONS, { category: "Hareket", random: () => 1 })).not.toBeNull();
  });

  it("returns null when nothing is left", () => {
    expect(pickNext([SUGGESTIONS[0]], { category: null, currentId: SUGGESTIONS[0].id })).toBeNull();
  });

  it("spreads picks across the pool", () => {
    const seen = new Set<string>();
    let currentId: string | null = null;
    let recent: string[] = [];
    for (let i = 0; i < 400; i++) {
      const next: Suggestion = pickNext(SUGGESTIONS, { category: null, currentId, recentIds: recent })!;
      seen.add(next.id);
      currentId = next.id;
      recent = remember(recent, next.id);
    }
    expect(seen.size).toBe(SUGGESTIONS.length);
  });
});

describe("remember", () => {
  it("keeps the newest first without duplicates and caps the size", () => {
    expect(remember(["b", "a"], "a")).toEqual(["a", "b"]);
    expect(remember(["1", "2", "3"], "4", 3)).toEqual(["4", "1", "2"]);
  });
});

describe("day helpers", () => {
  it("formats the local day", () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
  });

  it("keeps a pin for its own day only", () => {
    expect(activePin({ day: "2026-10-19", id: "h01" }, "2026-10-19")).toBe("h01");
    expect(activePin({ day: "2026-10-18", id: "h01" }, "2026-10-19")).toBeNull();
    expect(activePin(null, "2026-10-19")).toBeNull();
  });

  it("formats durations", () => {
    expect(formatMinutes(15)).toBe("15 dk");
    expect(formatMinutes(60)).toBe("1 sa");
    expect(formatMinutes(90)).toBe("1 sa 30 dk");
  });
});
