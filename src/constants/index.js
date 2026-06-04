const navLinks = [
    {
      id: 1,
      name: "Projects",
      type: "finder",
    },
    {
      id: 3,
      name: "Contact",
      type: "contact",
    },
    {
      id: 4,
      name: "Resume",
      type: "resume",
    },
  ];
  
  const navIcons = [
    {
      id: 1,
      img: "/icons/wifi.svg",
    },
    {
      id: 2,
      img: "/icons/search.svg",
    },
    {
      id: 3,
      img: "/icons/user.svg",
    },
    {
      id: 4,
      img: "/icons/mode.svg",
    },
  ];
  
  const dockApps = [
    {
      id: "finder",
      name: "Portfolio", // was "Finder"
      icon: "finder.png",
      canOpen: true,
    },
    {
      id: "safari",
      name: "Articles", // was "Safari"
      icon: "safari.png",
      canOpen: true,
    },
    {
      id: "contact",
      name: "Contact", // or "Get in touch"
      icon: "contact.png",
      canOpen: true,
    },
    {
      id: "terminal",
      name: "Skills", // was "Terminal"
      icon: "terminal.png",
      canOpen: true,
    },
    {
      id: "trash",
      name: "Archive", // was "Trash"
      icon: "trash.png",
      canOpen: true,
    },
    {
      id: "photos",
      name: "Gallery", // was "Photos"
      icon: "photos.png",
      canOpen: true,
    },
  ];

  export const education = [
    {
      degree: "Bachelor of Technology - CSE (AI & ML)",
      institute: "University of Engineering and Management, Kolkata",
      score: "8.11 CGPA",
      year: "2026",
    },
    {
      degree: "Senior Secondary",
      institute: "Dum Dum Kishore Bharati High School",
      score: "88%",
      year: "2022",
    },
    {
      degree: "Secondary",
      institute: "Dum Dum Kishore Bharati High School",
      score: "88%",
      year: "2020",
    },
  ]
  
  export const experience = [
    {
      company: "Meru Technosoft Private Limited",
      role: "Lead Frontend Developer",
      duration: "Jun 2025 - Dec 2025",
      location: "Gujarat, India",
      description:
        "Led frontend development of a scalable accounting platform using React and Tailwind CSS, building reusable component-based architectures and optimizing performance to improve workflows and accessibility.",
    },
    {
      company: "Meru Technosoft Private Limited",
      role: "Frontend Developer intern",
      duration: "Dec 2025 - Present",
      location: "Gujarat, India",
      description:
        "Developed and optimized modern frontend applications with scalable UI solutions, efficient state management, and seamless backend integration.",
    },
    {
      company: "Coding Jr.",
      role: "AI Intern",
      duration: "Sep 2025 - Dec 2025",
      location: "Remote",
      description:
        "Worked on AI-powered solutions and automation workflows, assisting in prompt engineering, model integrations, and building intelligent user-focused features for real-world applications.",
    },
  ]
  export const achievements = [
    {
      title: "Winner - Best GenAI Hack Track",
      organization: "Kolkata Hackathon",
      year: "2025",
      description:
        "Won the Best GenAI Hack Track award for building an AI-powered legal awareness platform.",
    },
    {
      title: "SIH 2024 Finalist",
      organization: "Smart India Hackathon",
      year: "2024",
      description:
        "Selected as a finalist for developing the S&T and R&D Coal Project Management System.",
    },
    {
      title: "1st Place - Hackhive Hoopla 2.0",
      organization: "UEM Kolkata",
      year: "2024",
      description:
        "Secured 1st place for building an advanced home security solution during the hackathon.",
    },
  ]
  
  const blogPosts = [
    {
      id: 1,
      date: "Sep 2, 2025",
      title:
        "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
      image: "/images/blog1.png",
      link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
      id: 2,
      date: "Aug 28, 2025",
      title: "The Ultimate Guide to Mastering Three.js for 3D Development",
      image: "/images/blog2.png",
      link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
      id: 3,
      date: "Aug 15, 2025",
      title: "The Ultimate Guide to Mastering GSAP Animations",
      image: "/images/blog3.png",
      link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
  ];
  
  const techStack = [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript"],
    },
    {
      category: "Mobile",
      items: ["React Native", "Expo"],
    },
    {
      category: "Styling",
      items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL"],
    },
    {
      category: "Dev Tools",
      items: ["Git", "GitHub", "Docker"],
    },
  ];
  
  const socials = [
    {
      id: 1,
      text: "Github",
      icon: "/icons/github.svg",
      bg: "#f4656b",
      link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
      id: 2,
      text: "Platform",
      icon: "/icons/atom.svg",
      bg: "#4bcb63",
      link: "https://jsmastery.com/",
    },
    {
      id: 3,
      text: "Twitter/X",
      icon: "/icons/twitter.svg",
      bg: "#ff866b",
      link: "https://x.com/jsmasterypro",
    },
  ];
  
  const photosLinks = [
    {
      id: 1,
      icon: "/icons/gicon1.svg",
      title: "Library",
    },
    {
      id: 2,
      icon: "/icons/gicon2.svg",
      title: "Memories",
    },
    {
      id: 3,
      icon: "/icons/file.svg",
      title: "Places",
    },
    {
      id: 4,
      icon: "/icons/gicon4.svg",
      title: "People",
    },
    {
      id: 5,
      icon: "/icons/gicon5.svg",
      title: "Favorites",
    },
  ];
  
  const gallery = [
    {
      id: 1,
      img: "/images/gal1.png",
    },
    {
      id: 2,
      img: "/images/gal2.png",
    },
    {
      id: 3,
      img: "/images/gal3.png",
    },
    {
      id: 4,
      img: "/images/gal4.png",
    },
  ];
  
  export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
  };

  const SKILLS_LOCATION = {
    id: "skills-root",
    type: "skills",
    name: "Skills",
    icon: "/icons/skills.svg",
    kind: "folder",
    children: [
      {
        id: "skills-frontend",
        type: "skill-category",
        skillCategory: "frontend",
        name: "Front-end",
        icon: "/images/folder.png",
        kind: "folder",
        children: [],
      },
      {
        id: "skills-backend",
        type: "skill-category",
        skillCategory: "backend",
        name: "Back-end",
        icon: "/images/folder.png",
        kind: "folder",
        children: [],
      },
      {
        id: "skills-database",
        type: "skill-category",
        skillCategory: "db",
        name: "Database",
        icon: "/images/folder.png",
        kind: "folder",
        children: [],
      },
      {
        id: "skills-devops",
        type: "skill-category",
        skillCategory: "devops",
        name: "DevOps",
        icon: "/images/folder.png",
        kind: "folder",
        children: [],
      },
    ],
  };
  
  const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
      // ▶ Project 1
      {
        id: 5,
        name: "Pocket legal aid",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-10 left-5", // icon position inside Finder
        windowPosition: "top-[13vh] left-8", // home icon position
        children: [
          {
            id: 1,
            name: "Pocket legal aid.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 left-5",
           

description: [
  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Problem Statement</span>",
  "Despite having access to constitutional rights and legal protections, a significant portion of the population lacks **proper legal awareness and guidance**. This knowledge gap often leaves individuals vulnerable to **misinformation, exploitation, and injustice**. Furthermore, traditional legal resources are often **complex, difficult to navigate, and inaccessible** to the average citizen, creating the need for a more engaging and user-friendly approach to legal education.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Our Solution</span>",
  "To address this challenge, we developed **Pocket Legal Aid**, an **AI-powered legal awareness platform** designed to make constitutional knowledge accessible to everyone. By combining **gamified learning experiences**, **interactive modules**, and an **intelligent chatbot**, the platform enables users to understand their rights and discover relevant legal information in a structured and intuitive manner. Acting as a **digital legal companion**, it simplifies legal education and encourages users to actively learn about the constitution.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Results &amp; Impact</span>",
  "The platform was launched with **100+ constitutional resources** and AI-assisted chatbot capabilities to enhance accessibility and user engagement. We implemented **contextual search using n-gram models**, resulting in a **40% improvement in search relevance** and enabling users to retrieve more accurate information. This project helped me win the **GenAI Track at the Diversion 2025 Hackathon**, where our team earned the **MLH Best GenAI Hack Track Award at Diversion 2K25, Kolkata**.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Tech Stack</span>",
  "**Pocket Legal Aid** was built by a team of **4 members** using **React, Flask, Firebase, Gemini API, Hugging Face, OpenStreetMap, Tailwind CSS, Figma, and Ngrok**. The architecture delivers a **fast, responsive, and seamless experience** across both desktop and mobile devices."
]



             
          },
          {
            id: 2,
            name: "Pocket legal aid.com",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://github.com/samprit004/Diversion_2k25/tree/main/my-tailwind-app",
            position: "top-10 right-20",
          },
          {
            id: 4,
            name: "Pocket legal aid.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 right-80",
            imageUrl: "/images/pocket_legal_aid.png",
          },
          // {
          //   id: 5,
          //   name: "Tech Stack",
          //   icon: "/images/plain.png",
          //   kind: "file",
          //   fileType: "fig",
          //   href: "https://google.com",
          //   position: "top-60 right-20",
          // },
        ],
      },
  
      // ▶ Project 2
      {
        id: 6,
        name: "Marg Sathi",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-52 right-80",
        windowPosition: "top-[32vh] left-11",
        children: [
          {
            id: 1,
            name: "Marg Sathi.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 right-10",
           
description: [
  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Problem Statement</span>",
  "As part of a **Ministry of Coal** problem statement for **Smart India Hackathon 2024 (7th Edition)**, we identified that the management of **S&T and R&D coal projects** relied heavily on **manual processes, paperwork, and fragmented data management**. Tracking project progress, generating reports, and coordinating information across multiple stakeholders were tedious and time-consuming tasks, often leading to inefficiencies and delays in decision-making. There was a clear need for a **centralized digital solution** capable of modernizing project management workflows.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Our Solution</span>",
  "To address these challenges, we developed **Marg Sathi**, an **AI-powered project management platform** designed specifically for managing **Science & Technology and R&D coal projects**. The platform transformed traditional pen-and-paper operations into a **centralized digital ecosystem**, enabling real-time project tracking, AI-assisted assessments, and streamlined reporting workflows. By integrating intuitive dashboards and data visualization capabilities, the system provided stakeholders with a unified view of project progress and insights, making management more efficient and data-driven.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Results & Impact</span>",
  "Marg Sathi successfully digitized the management of **100+ coal projects**, significantly improving operational efficiency. The implementation of centralized dashboards and visual analytics enhanced **decision-making efficiency by 70%**, while automated reporting workflows reduced **manual effort by 80%**. The solution's practical impact and innovation led our team to become **Finalists of Smart India Hackathon 2024 (7th Edition)**, earning national-level recognition for addressing a real-world challenge posed by the **Ministry of Coal**.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Tech Stack</span>",
  "**Marg Sathi** was developed by a team of **5 members** using **Next.js, Tailwind CSS, PocketBase, MongoDB, Gemini, and Figma**. The architecture delivers a **fast, responsive, and intuitive experience**, enabling seamless access to project data and analytics across different devices and stakeholders."
]


              
          },
          {
            id: 2,
            name: "Marg Sathi.com",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://github.com/samprit004/sih",
            position: "top-20 left-20",
          },
          {
            id: 4,
            name: "Marg Sathi.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/marg_sathi.png",
          },
          // {
          //   id: 5,
          //   name: "Tech Stack",
          //   icon: "/images/plain.png",
          //   kind: "file",
          //   fileType: "fig",
          //   href: "https://google.com",
          //   position: "top-60 left-5",
          // },
        ],
      },
  
      // ▶ Project 3
      {
        id: 7,
        name: "Freelance Work",
        icon: "/images/folder.png",
        kind: "folder",
        position: "top-10 left-80",
        windowPosition: "top-[50vh] left-8",
        children: [
          {
            id: 1,
            name: "Freelance Work.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-5 left-10",
           
description: [
  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Problem Statement</span>",
  "As a **creative designer**, the client required a portfolio that could do more than simply showcase projects. The challenge was to create a digital presence that truly reflected her **personality, creativity, and design philosophy**, while presenting her work in a way that would leave a lasting impression on potential employers and collaborators. A conventional portfolio lacked the visual identity and engaging experience needed to represent the unique value she brings to the table.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Our Solution</span>",
  "To address this, I designed and developed a **premium and modern portfolio experience** tailored specifically to the client's creative style and professional aspirations. Instead of building a static website, I focused on creating an immersive experience through **smooth GSAP animations**, **interactive components**, and carefully crafted UI elements. Every section was designed with the goal of highlighting her work while maintaining a visual language that resonated with her personality and artistic vision.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Results & Impact</span>",
  "The final product delivered a **fast, visually striking, and fully responsive portfolio** that effectively showcases the client's work across desktop and mobile devices. By combining aesthetics with usability, the website provides an engaging experience for visitors while establishing a strong professional identity. The portfolio now serves as a centralized platform for presenting her projects and strengthening her online presence as a creative professional.",

  "<span style='display:inline-block;font-size:1.5rem;font-weight:700;line-height:1.2;padding-bottom:0.35rem;border-bottom:2px solid var(--window-divider);'>Tech Stack</span>",
  "The website was built using **React, Tailwind CSS, GSAP, and Supabase**, enabling smooth animations, modern UI components, and efficient backend functionality. The architecture ensures a **responsive, high-performance, and easily customizable experience**, allowing the client to manage and showcase her work seamlessly."
]


              
          },
          {
            id: 2,
            name: "Freelance Work.com",
            icon: "/images/safari.png",
            kind: "file",
            fileType: "url",
            href: "https://tonima-das-portfolio.netlify.app/",
            position: "top-10 right-20",
          },
          {
            id: 4,
            name: "Freelance Work.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 right-80",
            imageUrl: "/images/freelance.png",
          },
          // {
          //   id: 5,
          //   name: "Tech Stack",
          //   icon: "/images/plain.png",
          //   kind: "file",
          //   fileType: "fig",
          //   href: "https://google.com",
          //   position: "top-60 right-20",
          // },
        ],
      },
    ],
  };
  
  const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-10 left-5",
        imageUrl: "/images/samprit-1.jpg",
      },
      {
        id: 2,
        name: "casual-me.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-28 right-72",
        imageUrl: "/images/samprit-2.jpg",
      },
      // {
      //   id: 3,
      //   name: "conference-me.png",
      //   icon: "/images/image.png",
      //   kind: "file",
      //   fileType: "img",
      //   position: "top-52 left-80",
      //   imageUrl: "/images/adrian-3.jpeg",
      // },
      {
        id: 4,
        name: "about-me.txt",
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-60 left-5",
        subtitle: "Meet the Developer Behind the Code",
        image: "/images/samprit-1.jpg",
        description: [
          "Hey! I'm Samprit 👋, a Frontend Developer who enjoys turning ideas into clean, interactive web experiences.",
          "I primarily work with JavaScript, React, Next.js, and modern frontend tools, focusing on building fast, responsive, and user-friendly applications.",
          "I'm passionate about creating polished UI, improving user experience, and writing maintainable code that scales without becoming a headache.",
          "Beyond coding, you'll usually find me refining my portfolio, exploring new web technologies, following football, or spending way too much time perfecting tiny design details that most people won't notice 😅",
        ],
      },
      {
        id: 5,
        name: "Experience",
        icon: "/images/plain.png",
        kind: "file",
        fileType: "timeline",
        timelineType: "experience",
        position: "top-10 left-5",
      },
      {
        id: 6,
        name: "Education",
        icon: "/images/plain.png",
        kind: "file",
        fileType: "timeline",
        timelineType: "education",
        position: "top-28 right-72",
      },
      {
        id: 7,
        name: "Achievements",
        icon: "/images/plain.png",
        kind: "file",
        fileType: "timeline",
        timelineType: "achievements",
        position: "top-52 left-80",
      }
    ],
  };
  
  const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "Resume.pdf",
        icon: "/images/pdf.png",
        kind: "file",
        fileType: "pdf",
        // you can add `href` if you want to open a hosted resume
        // href: "/your/resume/path.pdf",
      },
    ],
  };
  
  const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
      {
        id: 1,
        name: "trash1.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-10 left-10",
        imageUrl: "/images/trash-1.png",
      },
      {
        id: 2,
        name: "trash2.png",
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-40 left-80",
        imageUrl: "/images/trash-2.png",
      },
    ],
  };
  
  export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    skills: SKILLS_LOCATION,
    trash: TRASH_LOCATION,
  };
  
  const INITIAL_Z_INDEX = 1000;
  
  const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    gmail: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    timelinefile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    settings: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  };
  
  export { INITIAL_Z_INDEX, WINDOW_CONFIG };