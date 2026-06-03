import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

/**
 * Mobile-only navigation store.
 *
 * Stack model: each entry is a "screen" descriptor:
 *   { id, title, component, props, showSearch? }
 *
 * Footer tabs are shared across the whole session and defined once on open():
 *   { id, label, icon, screen }  ← screen is the root screen for that tab
 */

const useMobileWindowStore = create(
  immer((set, get) => ({
    isOpen: false,
    stack: [],          // Screen[]
    footerTabs: [],     // Tab[]
    activeTabId: null,

    open: ({ initialScreen, footerTabs = [], activeTabId = null }) =>
      set((state) => {
        state.isOpen = true
        state.stack = [initialScreen]
        state.footerTabs = footerTabs
        state.activeTabId = activeTabId
      }),

    push: (screen) =>
      set((state) => {
        state.stack.push(screen)
      }),

    pop: () =>
      set((state) => {
        if (state.stack.length <= 1) {
          state.isOpen = false
          state.stack = []
          state.footerTabs = []
          state.activeTabId = null
        } else {
          state.stack.pop()
        }
      }),

    close: () =>
      set((state) => {
        state.isOpen = false
        state.stack = []
        state.footerTabs = []
        state.activeTabId = null
      }),

    switchTab: (tabId) =>
      set((state) => {
        const tab = state.footerTabs.find((t) => t.id === tabId)
        if (!tab) return
        state.stack = [tab.screen]
        state.activeTabId = tabId
      }),
  }))
)

export default useMobileWindowStore
