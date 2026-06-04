import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '#constants/index.js'

// Always returns the highest zIndex currently in use across all windows.
const topZ = (windows) =>
    Object.values(windows).reduce((max, w) => Math.max(max, w.zIndex), INITIAL_Z_INDEX);

const useWindowStore = create(
    immer((set) => ({

    windows: WINDOW_CONFIG,

    openWindow: (windowKey, data = null) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = topZ(state.windows) + 1;
        win.data = data ?? win.data;
    }),

    closeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
    }),

    focusWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = topZ(state.windows) + 1;
    })
}))
);

useWindowStore.setState((state) => ({
    windows: {
        ...WINDOW_CONFIG,
        ...state.windows,
    },
}));

export default useWindowStore;
