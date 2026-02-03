export function useColorScheme() {
  // On web, always return 'light' unless the user has set a preference
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
