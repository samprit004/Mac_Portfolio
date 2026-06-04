import { create } from 'zustand'

const STORAGE_KEY = 'portfolio-ui-theme'
const VALID_THEMES = ['light', 'dark']

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  if (VALID_THEMES.includes(storedTheme)) return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const persistTheme = (theme) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, theme)
}

const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (!VALID_THEMES.includes(theme)) return
    persistTheme(theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark'
      persistTheme(nextTheme)
      return { theme: nextTheme }
    }),
}))

export default useThemeStore
