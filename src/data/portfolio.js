import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaFigma,
  FaGithub, FaLinkedin, FaInstagram
} from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs,
  SiMongodb, SiPostgresql, SiFirebase, SiVite,
  SiExpress, SiRedux
} from 'react-icons/si'

export const personalInfo = {
  name: 'Muhammed Niyas',
  title: 'Full Stack Developer',
  tagline: 'I craft beautiful digital experiences that live at the intersection of design and technology.',
  email: 'hello@muhammedniyas.dev',
  location: 'San Francisco, CA',
  bio: `I'm a passionate full-stack developer with 5+ years of experience building modern web applications. 
  I specialize in creating performant, accessible, and visually stunning digital products. 
  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
  or sipping coffee at a local café.`,
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/muhammedniyas', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/muhammedniyas', icon: FaLinkedin },
  { name: 'Instagram', url: 'https://instagram.com/muhammedniyas', icon: FaInstagram },
]

export const skills = {
  frontend: {
    title: 'Frontend',
    items: [
      { name: 'React', level: 95, icon: FaReact },
      { name: 'JavaScript', level: 90, icon: SiJavascript },
      { name: 'TypeScript', level: 85, icon: SiTypescript },
      { name: 'Next.js', level: 88, icon: SiNextdotjs },
      { name: 'Tailwind CSS', level: 92, icon: SiTailwindcss },
      { name: 'Redux', level: 80, icon: SiRedux },
    ],
  },
  backend: {
    title: 'Backend',
    items: [
      { name: 'Node.js', level: 88, icon: FaNodeJs },
      { name: 'Express', level: 85, icon: SiExpress },
      { name: 'Python', level: 78, icon: FaPython },
      { name: 'MongoDB', level: 82, icon: SiMongodb },
      { name: 'PostgreSQL', level: 80, icon: SiPostgresql },
      { name: 'Firebase', level: 75, icon: SiFirebase },
    ],
  },
  tools: {
    title: 'Tools',
    items: [
      { name: 'Git', level: 90, icon: FaGitAlt },
      { name: 'Docker', level: 72, icon: FaDocker },
      { name: 'Vite', level: 88, icon: SiVite },
      { name: 'Figma', level: 76, icon: FaFigma },
    ],
  },
}

export const projects = [
  {
    title: 'ShopStream',
    description: 'Full-stack e-commerce platform with product catalog, cart system, Stripe payments, admin dashboard, and order tracking built with MERN stack.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    github: 'https://github.com/muhammedniyas/shopstream',
    demo: 'https://shopstream-demo.vercel.app',
    color: '#a855f7',
  },
  {
    title: 'TeamSync',
    description: 'Real-time project management SaaS with Kanban boards, team chat, file sharing, and role-based access control. WebSocket-powered live updates.',
    tech: ['Next.js', 'Node.js', 'Socket.io', 'PostgreSQL'],
    github: 'https://github.com/muhammedniyas/teamsync',
    demo: 'https://teamsync-app.vercel.app',
    color: '#06b6d4',
  },
  {
    title: 'FinDash',
    description: 'Financial analytics dashboard with interactive charts, expense tracking, budget planning, and PDF report generation via REST API.',
    tech: ['React', 'Express', 'MongoDB', 'Chart.js'],
    github: 'https://github.com/muhammedniyas/findash',
    demo: 'https://findash-demo.vercel.app',
    color: '#ec4899',
  },
  {
    title: 'BlogForge',
    description: 'Full-stack blogging platform with markdown editor, comment system, user authentication, image uploads, and SEO-optimized server-side rendering.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/muhammedniyas/blogforge',
    demo: 'https://blogforge.vercel.app',
    color: '#10b981',
  },
  {
    title: 'HireHub',
    description: 'Job board web application with resume parsing, applicant tracking, employer dashboards, and real-time notifications for job seekers.',
    tech: ['React', 'Express', 'MongoDB', 'Redis'],
    github: 'https://github.com/muhammedniyas/hirehub',
    demo: 'https://hirehub-app.vercel.app',
    color: '#f59e0b',
  },
  {
    title: 'MedConnect',
    description: 'Healthcare appointment booking system with doctor profiles, video consultations, patient records management, and payment integration.',
    tech: ['Next.js', 'Node.js', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/muhammedniyas/medconnect',
    demo: 'https://medconnect.vercel.app',
    color: '#8b5cf6',
  },
]

export const experience = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    organization: 'WebCraft Solutions',
    period: '2023 – Present',
    description: 'Architecting and building end-to-end web applications using React, Node.js, and PostgreSQL. Leading a team of 5 developers and delivering scalable SaaS products.',
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'ByteWorks Technologies',
    period: '2021 – 2023',
    description: 'Developed REST APIs with Express and MongoDB, built responsive React frontends, and integrated third-party services like Stripe, AWS S3, and SendGrid.',
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science',
    organization: 'University of Calicut',
    period: '2017 – 2021',
    description: 'Specialized in web technologies and software engineering. Built capstone project — a full-stack student management system using MERN stack.',
  },
  {
    type: 'work',
    title: 'Web Development Intern',
    organization: 'InnoTech Labs',
    period: '2020 – 2021',
    description: 'Built full-stack features with React and Node.js. Designed database schemas, created RESTful APIs, and deployed applications to AWS EC2.',
  },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
