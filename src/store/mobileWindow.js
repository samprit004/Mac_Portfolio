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

const MOBILE_HISTORY_KEY = '__mobileWindowState'

const createHistorySnapshot = ({ isOpen, stack, footerTabs, activeTabId }) => ({
  [MOBILE_HISTORY_KEY]: true,
  isOpen,
  stack,
  footerTabs,
  activeTabId,
})

const syncBrowserHistory = (mode, state) => {
  if (typeof window === 'undefined') return

  const snapshot = createHistorySnapshot(state)

  if (mode === 'replace') {
    window.history.replaceState(snapshot, '')
    return
  }

  window.history.pushState(snapshot, '')
}

const applyClosedState = (state) => {
  state.isOpen = false
  state.stack = []
  state.footerTabs = []
  state.activeTabId = null
}

const useMobileWindowStore = create(
  immer((set, get) => ({
    isOpen: false,
    stack: [],          // Screen[]
    footerTabs: [],     // Tab[]
    activeTabId: null,

    open: ({ initialScreen, footerTabs = [], activeTabId = null }) => {
      set((state) => {
        state.isOpen = true
        state.stack = [initialScreen]
        state.footerTabs = footerTabs
        state.activeTabId = activeTabId
      }),
      syncBrowserHistory('push', get())
    },

    push: (screen) => {
      set((state) => {
        state.stack.push(screen)
      }),
      syncBrowserHistory('push', get())
    },

    pop: () => {
      if (typeof window !== 'undefined' && get().isOpen) {
        window.history.back()
        return
      }

      set((state) => {
        if (state.stack.length <= 1) {
          applyClosedState(state)
        } else {
          state.stack.pop()
        }
      })
    },

    close: () => {
      const { isOpen, stack } = get()

      if (typeof window !== 'undefined' && isOpen && stack.length > 0) {
        window.history.go(-stack.length)
        return
      }

      set((state) => {
        applyClosedState(state)
      })
    },

    switchTab: (tabId) => {
      set((state) => {
        const tab = state.footerTabs.find((t) => t.id === tabId)
        if (!tab) return
        state.stack = [tab.screen]
        state.activeTabId = tabId
      }),
      syncBrowserHistory('replace', get())
    },

    restoreFromHistory: (snapshot) =>
      set((state) => {
        if (!snapshot?.[MOBILE_HISTORY_KEY]) {
          applyClosedState(state)
          return
        }

        state.isOpen = Boolean(snapshot.isOpen)
        state.stack = snapshot.stack ?? []
        state.footerTabs = snapshot.footerTabs ?? []
        state.activeTabId = snapshot.activeTabId ?? null
      }),

    isMobileHistoryState: (historyState) => Boolean(historyState?.[MOBILE_HISTORY_KEY]),
  }))
)

export default useMobileWindowStore
