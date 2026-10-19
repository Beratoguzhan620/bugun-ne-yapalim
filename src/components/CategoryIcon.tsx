import { Brain, Footprints, House, Sparkles, Users } from "lucide-react-native";

import type { Category } from "@/data/suggestions";

const ICONS = { Hareket: Footprints, Zihin: Brain, Sosyal: Users, Ev: House } as const;

export function CategoryIcon({ category, color, size = 18 }: { category: Category | null; color: string; size?: number }) {
  const Icon = category ? ICONS[category] : Sparkles;
  return <Icon size={size} color={color} strokeWidth={1.75} />;
}
