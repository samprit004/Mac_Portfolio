You are an expert React frontend engineer. Build a Safari-style portfolio interface using React + Tailwind CSS + Zustand for state management + Immer middleware.

Project goal:
Create ONLY the Safari interface part of my macOS-style portfolio.

The interface must look like a modern Safari browser window with:
1. macOS traffic light buttons
2. Safari address/search bar
3. Two pinned tabs:
   - LinkedIn
   - GitHub
4. Tab switching state handled by Zustand
5. Zustand store must use Immer middleware
6. GitHub profile data must auto-sync using GitHub public API
7. LinkedIn profile data should be shown from local JSON/config because LinkedIn does not allow simple public profile API access without approval
8. UI must be polished, responsive, dark futuristic/sci-fi style, and portfolio-ready

Important folder requirement:
Do NOT put everything in one file.
Create a clean folder-based structure so the project does not become cluttered.

Use this exact organized folder structure:

src/
  components/
    safari/
      SafariPortfolio.jsx
      SafariHeader.jsx
      SafariTabs.jsx
      SafariAddressBar.jsx
      SafariWindowControls.jsx

    profiles/
      linkedin/
        LinkedInProfile.jsx
        LinkedInHero.jsx
        LinkedInAbout.jsx
        LinkedInSkills.jsx
        LinkedInExperience.jsx

      github/
        GitHubProfile.jsx
        GitHubHero.jsx
        GitHubStats.jsx
        GitHubRepoList.jsx
        GitHubRepoCard.jsx
        GitHubLoading.jsx
        GitHubError.jsx

    ui/
      GlowCard.jsx
      SectionTitle.jsx
      ExternalLinkButton.jsx
      SkillChip.jsx

  store/
    safari/
      safariStore.js

  data/
    profiles/
      linkedinProfile.js
      profileConfig.js

  services/
    github/
      githubApi.js

  constants/
    tabs.js
    socialLinks.js

  utils/
    formatDate.js
    cn.js

Tech requirements:
- React
- Tailwind CSS
- Zustand
- Immer middleware
- lucide-react icons
- No Redux
- No unnecessary UI library
- Component-based structure
- Clean reusable code
- Fully responsive
- Loading and error states for GitHub API
- External profile buttons should open LinkedIn/GitHub in a new tab
- Keep every file small and focused
- Do not create one huge component

Install dependencies:
zustand
immer
lucide-react

State management:
Create the Zustand store at:

src/store/safari/safariStore.js

Use Immer middleware like this:

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

Store should contain:
- activeTab: "linkedin" | "github"
- githubData
- githubRepos
- loading
- error
- hasFetchedGitHub
- setActiveTab(tab)
- fetchGitHubProfile(username)

Behavior:
- Default active tab should be LinkedIn
- Clicking GitHub tab should switch content to GitHub
- GitHub data should fetch only when GitHub tab is opened
- Do not refetch repeatedly if GitHub data already exists
- Show loading state while fetching
- Show error state if API fails
- Keep UI stable during loading

GitHub API service:
Create:

src/services/github/githubApi.js

It should export:
- fetchGitHubUser(username)
- fetchGitHubRepos(username)

Use:
https://api.github.com/users/YOUR_GITHUB_USERNAME
https://api.github.com/users/YOUR_GITHUB_USERNAME/repos?sort=updated&per_page=6

The GitHub username should be stored in:

src/data/profiles/profileConfig.js

Example:

export const profileConfig = {
  githubUsername: "YOUR_GITHUB_USERNAME",
  linkedinUrl: "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/",
  githubUrl: "https://github.com/YOUR_GITHUB_USERNAME"
};

Add comments showing where I need to replace my username and links.

GitHub profile UI should show:
- avatar
- name
- username
- bio
- followers
- following
- public repos
- location
- latest 6 repos
- repo name
- description
- language
- stars
- forks
- updated date
- button to open GitHub profile

LinkedIn data:
Create:

src/data/profiles/linkedinProfile.js

Use this format:

export const linkedinProfile = {
  name: "Samprit Das",
  role: "Full Stack Developer",
  headline: "Full Stack Developer | React | Node.js | MongoDB | AI-powered Products",
  location: "India",
  about: "I build scalable full-stack web applications with clean UI, strong backend logic, and product-focused thinking.",
  profileUrl: "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/",
  skills: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "JavaScript",
    "REST API",
    "GitHub"
  ],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Your Company / Freelance / Student",
      duration: "2024 - Present"
    }
  ]
};

LinkedIn profile UI should show:
- name
- role
- headline
- location
- about
- skills chips
- experience cards
- button to open LinkedIn profile

Safari UI details:
Main component:

src/components/safari/SafariPortfolio.jsx

Design:
- centered browser window
- max width around 1100px
- glassmorphism background
- rounded-2xl
- subtle border
- dark gradient background
- shadow glow
- top browser bar height around 64px
- pinned tabs below or inside header
- active tab should have highlighted border/background
- content area should animate softly when switching tabs
- make the GitHub and LinkedIn tabs look like pinned Safari tabs with small icons
- GitHub tab icon can use Github from lucide-react
- LinkedIn tab can use a simple blue "in" badge

Folder responsibility:
- components/safari should only contain Safari browser layout components
- components/profiles/linkedin should only contain LinkedIn profile UI components
- components/profiles/github should only contain GitHub profile UI components
- components/ui should contain reusable small UI components
- store/safari should contain Zustand state only
- data/profiles should contain static profile data/config only
- services/github should contain API logic only
- constants should contain tab/social constants only
- utils should contain helper functions only

Important:
Do NOT iframe LinkedIn or GitHub pages because they may block embedding.
Instead, create custom profile views using fetched data for GitHub and local config for LinkedIn.

Code quality:
- Return complete code for every file
- Make sure imports match the folder structure
- Make sure the app runs without missing imports
- Use Tailwind classes only for styling
- No CSS file unless absolutely required
- Keep code readable and production-ready
- Add comments only where I need to replace profile details
- Do not clutter components with API logic
- Do not clutter store with UI logic
- Do not put all sections inside one component

Final output:
Give me the full project code file-by-file.
Each file should be clearly labeled with its path.