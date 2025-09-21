import { type Voice } from "~/types/voice"


export const GRADIENT_COLORS = [
  "linear-gradient(45deg, #8b5cf6, #ec4899, #ffffff, #3b82f6)",
  "linear-gradient(45deg, #3b82f6, #10b981, #ffffff, #f59e0b)",
  "linear-gradient(45deg, #ec4899, #f97316, #ffffff, #8b5cf6)",
  "linear-gradient(45deg, #10b981, #3b82f6, #ffffff, #f43f5e)",
  "linear-gradient(45deg, #f43f5e, #f59e0b, #ffffff, #10b981)",
] as const;

export const VOICES: Voice[] = [
  {
    id: "andreas",
    name: "Andreas",
    gradientColors: GRADIENT_COLORS[0]!,
    service: "styletts2",
  },
  {
    id: "woman",
    name: "Woman",
    gradientColors: GRADIENT_COLORS[1]!,
    service: "styletts2",
  },
  {
    id: "andreas",
    name: "Andreas",
    gradientColors: GRADIENT_COLORS[0]!,
    service: "seedvc",
  },
  {
    id: "woman",
    name: "Woman",
    gradientColors: GRADIENT_COLORS[1]!,
    service: "seedvc",
  },
  {
    id: "trump",
    name: "Trump",
    gradientColors: GRADIENT_COLORS[2]!,
    service: "seedvc",
  },
];
