// Theme is locked to light mode. Dark mode has been removed.
export function useTheme() {
  return { theme: "light" as const, toggleTheme: () => {} };
}
