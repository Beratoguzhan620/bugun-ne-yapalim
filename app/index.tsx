import "@/lib/interop";

import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { Monitor, Moon, Pin, Sun } from "lucide-react-native";
import { colorScheme as nativeColorScheme, useColorScheme } from "nativewind";
import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryChips } from "@/components/CategoryChips";
import { SuggestionCard } from "@/components/SuggestionCard";
import { SUGGESTIONS } from "@/data/suggestions";
import { activePin, dayKey, type Pin as PinState } from "@/lib/day";
import { inCategory, pickNext, remember, type CategoryFilter } from "@/lib/picker";
import { load, save } from "@/lib/storage";
import { iconColors } from "@/lib/theme";

type ThemeChoice = "system" | "light" | "dark";

const THEME_NEXT: Record<ThemeChoice, ThemeChoice> = { system: "light", light: "dark", dark: "system" };
const THEME_LABEL: Record<ThemeChoice, string> = { system: "Tema: sistem", light: "Tema: açık", dark: "Tema: koyu" };

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const colors = iconColors[colorScheme === "dark" ? "dark" : "light"];

  const [theme, setTheme] = useState<ThemeChoice>("system");
  const [category, setCategory] = useState<CategoryFilter>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [pin, setPin] = useState<PinState | null>(null);

  const today = dayKey();
  const pinnedId = activePin(pin, today);
  const current = SUGGESTIONS.find((s) => s.id === currentId) ?? null;
  const pinned = SUGGESTIONS.find((s) => s.id === pinnedId) ?? null;
  const poolSize = useMemo(() => inCategory(SUGGESTIONS, category).length, [category]);

  useEffect(() => {
    (async () => {
      const savedTheme = await load<ThemeChoice>("theme", "system");
      setTheme(savedTheme);
      nativeColorScheme.set(savedTheme);
      const savedPin = await load<PinState | null>("pin", null);
      setPin(savedPin);
      // Opening the app on the same day shows the pinned idea first.
      const id = activePin(savedPin, dayKey());
      if (id) setCurrentId(id);
    })();
  }, []);

  const suggest = () => {
    const next = pickNext(SUGGESTIONS, { category, currentId, recentIds: recent });
    if (!next) return;
    setCurrentId(next.id);
    setRecent((ids) => remember(ids, next.id));
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const togglePin = () => {
    if (!current) return;
    const next = pinnedId === current.id ? null : { day: today, id: current.id };
    setPin(next);
    save("pin", next);
    if (Platform.OS !== "web") Haptics.selectionAsync();
  };

  const cycleTheme = () => {
    const next = THEME_NEXT[theme];
    setTheme(next);
    nativeColorScheme.set(next);
    save("theme", next);
  };

  const ThemeIcon = theme === "system" ? Monitor : theme === "light" ? Sun : Moon;

  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-night-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView contentContainerClassName="grow items-center" keyboardShouldPersistTaps="handled">
        <View className="w-full max-w-[520px] flex-1 gap-5 py-6">
          <View className="flex-row items-start justify-between gap-4 px-5">
            <View className="flex-1 gap-1">
              <Text className="font-medium text-sm text-accent dark:text-night-accent">Bugün</Text>
              <Text className="font-semibold text-2xl text-ink dark:text-night-ink" accessibilityRole="header">
                Ne yapalım?
              </Text>
            </View>
            <Pressable
              onPress={cycleTheme}
              accessibilityRole="button"
              accessibilityLabel={`${THEME_LABEL[theme]}. Değiştirmek için dokun.`}
              className="h-11 w-11 items-center justify-center rounded border border-border bg-surface active:opacity-80 dark:border-night-border dark:bg-night-surface"
            >
              <ThemeIcon size={18} color={colors.ink} strokeWidth={1.75} />
            </Pressable>
          </View>

          <CategoryChips value={category} onChange={setCategory} />

          {pinned && pinned.id !== currentId && (
            <Pressable
              onPress={() => setCurrentId(pinned.id)}
              accessibilityRole="button"
              accessibilityLabel={`Bugüne sabitlenen öneri: ${pinned.title}. Göstermek için dokun.`}
              className="mx-5 flex-row items-center gap-3 rounded-card border border-border bg-surface-2 px-4 py-3 active:opacity-80 dark:border-night-border dark:bg-night-surface-2"
            >
              <Pin size={16} color={colors.accent} strokeWidth={1.75} />
              <View className="flex-1">
                <Text className="font-sans text-xs text-muted dark:text-night-muted">Bugünün önerisi</Text>
                <Text className="font-medium text-sm text-ink dark:text-night-ink" numberOfLines={1}>
                  {pinned.title}
                </Text>
              </View>
            </Pressable>
          )}

          <View className="px-5">
            <SuggestionCard suggestion={current} pinned={current !== null && current.id === pinnedId} onTogglePin={togglePin} colors={colors} />
          </View>

          <View className="mt-auto gap-2 px-5">
            <Pressable
              onPress={suggest}
              accessibilityRole="button"
              className="min-h-14 items-center justify-center rounded-card bg-primary active:opacity-90 dark:bg-night-ink"
            >
              <Text className="font-semibold text-lg text-white dark:text-night-bg">Ne Yapalım?</Text>
            </Pressable>
            <Text className="text-center font-sans text-xs text-muted dark:text-night-muted">
              {category === null ? `${poolSize} öneri arasından` : `${category} kategorisinde ${poolSize} öneri arasından`} · aynı öneri arka arkaya gelmez
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
