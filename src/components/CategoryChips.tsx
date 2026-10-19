import { Pressable, ScrollView, Text } from "react-native";

import { CATEGORIES } from "@/data/suggestions";
import type { CategoryFilter } from "@/lib/picker";

type Props = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
};

const OPTIONS: { label: string; value: CategoryFilter }[] = [
  { label: "Hepsi", value: null },
  ...CATEGORIES.map((category) => ({ label: category, value: category })),
];

export function CategoryChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-none grow-0"
      contentContainerClassName="items-center gap-2 px-5"
      accessibilityRole="tablist"
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.label}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            hitSlop={{ top: 4, bottom: 4 }}
            className={`min-h-9 justify-center rounded-full border px-4 ${
              selected
                ? "border-primary bg-primary dark:border-night-ink dark:bg-night-ink"
                : "border-border bg-surface dark:border-night-border dark:bg-night-surface"
            }`}
          >
            <Text
              className={`font-medium text-sm ${selected ? "text-white dark:text-night-bg" : "text-ink dark:text-night-ink"}`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
