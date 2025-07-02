export const categories = ["Work","Study","Exercise","Travel"]
export type Category = typeof categories[number]
export const categoryEmoji: Record<Category, string> = {
  Work: "💼",
  Study: "📚",
  Exercise: "🏃",
  Travel: "✈️",
};
export const categoryPlaceholder: Record<Category, string> = {
  Work: "What task do you need to complete?",
  Study: "What do you want to study?",
  Exercise: "What exercise will you do?",
  Travel: "Where do you want to go?",
};