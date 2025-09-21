export const MOCK_SKILLS = [
    { name: 'TypeScript', level: 85 },
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 75 },
    { name: 'GraphQL', level: 60 },
    { name: 'CI/CD', level: 45 },
  ];
  
  export const MOCK_ROADMAP = [
    {
      title: 'Master Advanced React Patterns',
      description: 'Completed on 2024-05-20',
      status: 'completed',
    },
    {
      title: 'Build a Full-Stack Next.js Project',
      description: 'Currently in progress. Due by 2024-07-30.',
      status: 'current',
    },
    {
      title: 'Learn GraphQL and Apollo Client',
      description: 'Upcoming goal for Q3 2024.',
      status: 'upcoming',
    },
    {
      title: 'Contribute to an Open-Source Project',
      description: 'Upcoming goal for Q4 2024.',
      status: 'upcoming',
    },
  ];
  
  export const MOCK_CHART_DATA = [
    { name: 'Mon', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Tue', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Wed', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Thu', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Fri', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Sat', total: Math.floor(Math.random() * 120) + 10 },
    { name: 'Sun', total: Math.floor(Math.random() * 120) + 10 },
  ];

  export const MOCK_JOBS = [
    {
      title: 'Senior Frontend Engineer',
      company: 'Innovate Inc.',
      location: 'Remote',
      tags: ['React', 'TypeScript', 'Next.js'],
      match: 95,
      posted: '2 days ago',
    },
    {
      title: 'Full-Stack Developer',
      company: 'Creative Solutions',
      location: 'New York, NY',
      tags: ['Node.js', 'React', 'GraphQL'],
      match: 88,
      posted: '5 days ago',
    },
    {
      title: 'Lead Product Designer',
      company: 'DataDriven Co.',
      location: 'San Francisco, CA',
      tags: ['UX', 'UI', 'Figma'],
      match: 82,
      posted: '1 week ago',
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudFlow',
      location: 'Austin, TX',
      tags: ['AWS', 'Kubernetes', 'CI/CD'],
      match: 76,
      posted: '2 weeks ago',
    },
  ];
  
  // --- New: Standardized AI fallbacks ---
  export const MOCK_LEARNING_RECOMMENDATIONS = {
    skillGaps: [
      'System Design',
      'Data Structures & Algorithms',
      'Cloud Fundamentals (AWS/GCP/Azure)',
      'Testing (Jest, React Testing Library)',
      'CI/CD & DevOps Basics',
    ],
    recommendedResources: [
      'Grokking the System Design Interview (Educative)',
      'The Missing Semester of CS (MIT OpenCourseWare)',
      'AWS Certified Cloud Practitioner Free Course (freeCodeCamp)',
      'Jest + RTL Testing Crash Course (YouTube)',
      'CI/CD for Beginners with GitHub Actions (Blog Series)'
    ]
  };

  export const MOCK_QUIZ_RESULTS = {
    recommendations: [
      {
        career: 'Data Scientist',
        pros: [
          'High demand across industries',
          'Strong salary growth',
          'Impactful, data-driven work'
        ],
        cons: [
          'Steep learning curve in statistics',
          'Tooling changes quickly'
        ],
        salaryTrend: 'Upward trend with 10-15% YoY growth in many regions.'
      },
      {
        career: 'Full-Stack Developer',
        pros: [
          'Versatile skill set',
          'Opportunities in startups and enterprises'
        ],
        cons: [
          'Requires balancing frontend and backend depth'
        ],
        salaryTrend: 'Stable to upward trend with strong mid-level demand.'
      },
      {
        career: 'ML Engineer',
        pros: [
          'Cutting-edge projects',
          'High-impact roles in AI-driven companies'
        ],
        cons: [
          'Heavy math/ML foundations required'
        ],
        salaryTrend: 'Strong upward trend in AI-focused sectors.'
      }
    ]
  };

  export const MOCK_RESUME_OUTPUT = {
    improvedSummary:
      'Full-stack developer with 3+ years of experience building scalable web applications. Known for writing clean, maintainable code, collaborating cross-functionally, and delivering user-centric features. Passionate about performance, DX, and continuous learning.',
    suggestedSkills: [
      'Next.js',
      'React Query',
      'Playwright',
      'Docker',
      'Kubernetes Basics',
      'AWS (EC2, S3, CloudFront)',
      'Redis',
      'PostgreSQL',
      'CI/CD (GitHub Actions)',
      'Monitoring (Sentry, Grafana)'
    ],
    formattedExperience: [
      {
        jobTitle: 'Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        formattedResponsibilities: [
          'Developed and shipped features used by 50k+ monthly users with React and Next.js.',
          'Reduced API response times by 30% by optimizing DB queries and adding Redis caching.',
          'Improved test coverage to 85% with Jest and React Testing Library.',
        ]
      }
    ]
  };

  export const MOCK_CHATBOT_REPLY = `Here are a few things I can help with while the AI is warming up:
- Suggest career paths based on your skills (try: "I know React and Python")
- Identify skill gaps for a target role (try: "I want to be a data engineer")
- Recommend learning resources (try: "Courses for system design basics")
If this persists, the live AI service might be unavailable — using mock tips for now.`;