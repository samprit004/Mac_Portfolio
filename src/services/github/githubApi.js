const BASE = "https://api.github.com";

const get = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`GitHub API ${r.status}`);
    return r.json();
  });

export const fetchGitHubUser    = (u) => get(`${BASE}/users/${u}`);
export const fetchGitHubRepos   = (u) => get(`${BASE}/users/${u}/repos?sort=updated&per_page=6`);
export const fetchAllGitHubRepos= (u) => get(`${BASE}/users/${u}/repos?sort=updated&per_page=100`);
export const fetchGitHubStarred = (u) => get(`${BASE}/users/${u}/starred?per_page=30`);

export const fetchGitHubReadme = async (u) => {
  const r = await fetch(`${BASE}/repos/${u}/${u}/readme`);
  if (!r.ok) return null;
  const data = await r.json();
  return atob(data.content.replace(/\n/g, ""));
};

export const fetchGitHubContributionsForYear = async (u, year) => {
  const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${u}?y=${year}`);
  if (!r.ok) return null;
  return r.json();
};

export const fetchGitHubEvents = async (u) => {
  const r = await fetch(`${BASE}/users/${u}/events?per_page=100`);
  if (!r.ok) return [];
  return r.json();
};
