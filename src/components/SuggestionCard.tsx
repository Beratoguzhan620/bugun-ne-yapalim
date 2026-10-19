import { Clock3, Pin, PinOff } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import type { Suggestion } from "@/data/suggestions";
import { formatMinutes } from "@/lib/day";

import { CategoryIcon } from "./CategoryIcon";

type Props = {
  suggestion: Suggestion | null;
  pinned: boolean;
  onTogglePin: () => void;
  colors: { ink: string; muted: string; accent: string };
};

export function SuggestionCard({ suggestion, pinned, onTogglePin, colors }: Props) {
  if (!suggestion) {
    return (
      <View
        className="min-h-[240px] justify-center gap-3 rounded-card border border-dashed border-border bg-surface p-6 dark:border-night-border dark:bg-night-surface"
        accessibilityLabel="Henüz öneri yok"
      >
        <CategoryIcon category={null} color={colors.accent} size={28} />
        <Text className="font-semibold text-xl text-ink dark:text-night-ink">Canın sıkıldı mı?</Text>
        <Text className="font-sans text-base text-muted dark:text-night-muted">
          Aşağıdaki düğmeye bas; hareket, zihin, sosyal ve ev için 44 fikirden biri gelsin.
        </Text>
      </View>
    );
  }

  return (
    <Animated.View key={suggestion.id} entering={FadeInDown.duration(260)}>
      <View
        className="min-h-[240px] gap-4 rounded-card border border-border bg-surface p-6 dark:border-night-border dark:bg-night-surface"
        accessibilityLiveRegion="polite"
        testID="suggestion-card"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2 rounded-full bg-accent-soft px-3 py-1 dark:bg-night-accent-soft">
            <CategoryIcon category={suggestion.category} color={colors.accent} size={16} />
            <Text className="font-medium text-sm text-accent dark:text-night-accent">{suggestion.category}</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Clock3 size={15} color={colors.muted} strokeWidth={1.75} />
            <Text className="font-mono text-sm text-muted dark:text-night-muted">≈ {formatMinutes(suggestion.minutes)}</Text>
          </View>
        </View>

        <Text className="font-semibold text-2xl text-ink dark:text-night-ink" accessibilityRole="header">
          {suggestion.title}
        </Text>
        <Text className="font-sans text-base text-muted dark:text-night-muted">{suggestion.description}</Text>

        <Pressable
          onPress={onTogglePin}
          accessibilityRole="button"
          accessibilityState={{ selected: pinned }}
          accessibilityLabel={pinned ? "Sabitlemeyi kaldır" : "Bugüne sabitle"}
          className="mt-auto min-h-11 flex-row items-center gap-2 self-start rounded border border-border px-3 active:opacity-80 dark:border-night-border"
        >
          {pinned ? (
            <PinOff size={16} color={colors.ink} strokeWidth={1.75} />
          ) : (
            <Pin size={16} color={colors.ink} strokeWidth={1.75} />
          )}
          <Text className="font-medium text-sm text-ink dark:text-night-ink">{pinned ? "Sabitlendi · kaldır" : "Bugüne sabitle"}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
