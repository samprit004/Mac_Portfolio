import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchAllGitHubRepos,
  fetchGitHubContributionsForYear,
  fetchGitHubEvents,
} from "#/services/github/githubApi";

const useSafariStore = create(
  immer((set, get) => ({
    /* ── Browser tabs ───────────────────────────── */
    activeTab: "github",
    setActiveTab: (tab) => set((s) => { s.activeTab = tab; }),

    /* ── GitHub core ────────────────────────────── */
    githubData: null,
    githubRepos: [],
    githubAllRepos: [],
    githubProfileTab: "overview",

    loading: false,
    error: null,
    hasFetchedGitHub: false,
    hasFetchedAllRepos: false,

    setGitHubProfileTab: (tab) => set((s) => { s.githubProfileTab = tab; }),

    fetchGitHubProfile: async (username) => {
      if (get().hasFetchedGitHub) return;
      set((s) => { s.loading = true; s.error = null; });
      try {
        const [user, repos] = await Promise.all([
          fetchGitHubUser(username),
          fetchGitHubRepos(username),
        ]);
        set((s) => {
          s.githubData = user;
          s.githubRepos = repos;
          s.hasFetchedGitHub = true;
          s.loading = false;
        });
      } catch (err) {
        set((s) => { s.error = err.message; s.loading = false; });
      }
    },

    fetchAllRepos: async (username) => {
      if (get().hasFetchedAllRepos) return;
      try {
        const repos = await fetchAllGitHubRepos(username);
        set((s) => { s.githubAllRepos = repos; s.hasFetchedAllRepos = true; });
      } catch (_) {}
    },

    /* ── Contributions (per-year) ───────────────── */
    githubContributionsByYear: {},
    selectedContributionYear: new Date().getFullYear(),

    setSelectedContributionYear: (year) =>
      set((s) => { s.selectedContributionYear = year; }),

    fetchContributionsForYear: async (username, year) => {
      if (get().githubContributionsByYear[String(year)]) return;
      try {
        const data = await fetchGitHubContributionsForYear(username, year);
        if (data) set((s) => { s.githubContributionsByYear[String(year)] = data; });
      } catch (_) {}
    },

    /* ── Activity events ────────────────────────── */
    githubEvents: [],
    hasFetchedEvents: false,

    fetchEvents: async (username) => {
      if (get().hasFetchedEvents) return;
      try {
        const events = await fetchGitHubEvents(username);
        set((s) => { s.githubEvents = events; s.hasFetchedEvents = true; });
      } catch (_) {
        set((s) => { s.hasFetchedEvents = true; });
      }
    },
  }))
);

export default useSafariStore;
