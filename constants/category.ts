export const categories = ["Work","Study","Exercise","Travel"]
export type Category = typeof categories[number]
export const categoryEmoji: Record<Category, string> = {
  Work: "💼",
  Study: "📚",
  Exercise: "🏃",
  Travel: "✈️",
};