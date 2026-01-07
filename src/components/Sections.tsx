import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarClock,
  Download,
  ExternalLink,
  Github,
  Link as LinkIcon,
  Mail,
  Send,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type ProjectCategory = 'All' | 'Frontend' | 'Backend' | 'Cloud';

const SectionHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2 mb-10">
    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    <p className="text-base md:text-lg text-muted-foreground max-w-4xl leading-relaxed">{description}</p>
  </div>
);

export const AboutSection = () => {
  const highlights = [
    {
      title: 'Backend & APIs',
      detail: 'Designing microservices, event-driven flows, and well-documented APIs that stay reliable at scale.',
      period: 'Present',
    },
    {
      title: 'Cloud & DevOps',
      detail: 'Shipping containerized workloads to AWS with CI/CD, blue-green rollouts, and resilient observability.',
      period: 'Recent',
    },
    {
      title: 'Product Mindset',
      detail: 'Partnering with design and product to turn requirements into user-facing features and measurable wins.',
      period: 'Ongoing',
    },
  ];

  return (
    <section id="about" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="About"
          title="Engineer, builder, and curious collaborator."
          description="I specialize in crafting resilient services and thoughtful UIs that make complex systems feel effortless. I love pairing with teams to ship reliable features, measure impact, and keep users delighted."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I bring a pragmatic mix of backend engineering, front-end experience, and cloud know-how. Whether it’s designing a new service, improving an existing workflow, or mentoring teammates, I lean on strong fundamentals and hands-on delivery.
            </p>
            <p>
              Recent work includes modernizing Java/Spring Boot services, adding observability to distributed systems, and building React frontends that stay fast even as they grow. I enjoy joining product conversations early so we can de-risk ideas before the first line of code.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              Highlights
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </h3>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="pt-1">
                    <span className="w-2 h-2 rounded-full bg-primary block mt-1" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{item.period}</p>
                    <p className="text-foreground font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SkillsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const skillGroups = [
    {
      title: 'Languages',
      items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
    },
    {
      title: 'Frameworks',
      items: ['Spring Boot', 'React', 'Node.js', 'FastAPI', 'Express'],
    },
    {
      title: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins'],
    },
    {
      title: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis'],
    },
  ];

  return (
    <section id="skills" className="section-anchor py-16 lg:py-24 border-b border-border/60">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit for shipping production software."
          description="The stacks I reach for when building resilient services, data flows, and clean user experiences."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`bg-card border border-border rounded-2xl p-6 shadow-sm ${
                prefersReducedMotion ? '' : 'animate-skill-fade'
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 rounded-xl bg-secondary text-sm text-foreground/90 border border-border/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExperienceSection = () => {
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Nimbus Systems',
      dates: '2022 — Present',
      location: 'Sunnyvale, CA',
      summary: 'Led backend modernization and observability for cloud-native services.',
      highlights: [
        'Rebuilt a Java monolith into Spring Boot microservices, cutting deployment lead time by 60%.',
        'Designed event-driven pipelines with Kafka that reduced data latency from minutes to seconds.',
        'Introduced SLO dashboards and alerting, improving incident MTTR by 35%.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'FinEdge',
      dates: '2020 — 2022',
      location: 'San Francisco, CA',
      summary: 'Owned API surface area and developer experience for customer-facing apps.',
      highlights: [
        'Shipped GraphQL/REST gateways consumed by 6+ teams with versioned contracts and linting.',
        'Implemented CI/CD with blue-green deployments, cutting release rollback risk to near-zero.',
        'Collaborated with design to build React interfaces with a11y-first components.',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Product Studio',
      dates: '2018 — 2020',
      location: 'Remote',
      summary: 'Delivered client projects across web, data, and integrations.',
      highlights: [
        'Built FastAPI services that handled 50k+ daily requests with zero-downtime releases.',
        'Optimized SQL queries and caching, reducing page load times by up to 45%.',
        'Mentored junior developers on testing strategies and code reviews.',
      ],
    },
  ];

  return (
    <section id="experience" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Experience"
          title="Recent roles and measurable impact."
          description="I focus on outcomes: reliability, developer velocity, and user value. Here are a few snapshots."
        />

        <div className="space-y-6">
          {experiences.map((exp) => (
            <article key={`${exp.company}-${exp.role}`} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{exp.dates}</p>
                  <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground font-medium">{exp.company} — {exp.location}</p>
                  <p className="text-sm text-muted-foreground mt-2">{exp.summary}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="w-4 h-4" aria-hidden />
                  <span>Shipped with metrics-first mindset</span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {exp.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EducationSection = () => {
  const education = [
    {
      degree: 'Master of Science, Computer Science',
      school: 'San Jose State University',
      dates: '2016 — 2018',
      focus: 'Distributed systems, data engineering, and product delivery.',
    },
    {
      degree: 'Bachelor of Technology, Computer Science',
      school: 'JNTU Hyderabad',
      dates: '2012 — 2016',
      focus: 'Algorithms, operating systems, and software engineering.',
    },
  ];

  const certifications = [
    'AWS Certified Developer — Associate',
    'Oracle Certified Professional, Java',
  ];

  return (
    <section id="education" className="section-anchor py-16 lg:py-24 border-b border-border/60">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Education"
          title="Learning that shaped my engineering practice."
          description="A formal foundation in computer science, reinforced by ongoing certifications and hands-on build cycles."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {education.map((item) => (
              <div key={item.degree} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{item.dates}</p>
                    <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
                    <p className="text-muted-foreground font-medium">{item.school}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.focus}</p>
                  </div>
                  <BookOpen className="w-5 h-5 text-muted-foreground" aria-hidden />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/60 border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              Certifications Preview
              <Award className="w-5 h-5 text-muted-foreground" />
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary block" aria-hidden />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CertificationsSection = () => {
  const certifications = [
    {
      name: 'AWS Certified Developer — Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
      credentialUrl: 'https://aws.amazon.com/certification/',
    },
    {
      name: 'Oracle Certified Professional, Java SE',
      issuer: 'Oracle',
      year: '2022',
      credentialUrl: 'https://education.oracle.com/java',
    },
    {
      name: 'CKA: Certified Kubernetes Administrator',
      issuer: 'CNCF',
      year: '2021',
      credentialUrl: 'https://www.cncf.io/certification/cka/',
    },
  ];

  return (
    <section id="certifications" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials that back the work."
          description="Formal proof points across cloud, backend, and orchestration."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <article key={cert.name} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{cert.year}</p>
              <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary font-medium"
              >
                View credential
                <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProjectsSection = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const prefersReducedMotion = usePrefersReducedMotion();
  const projects = [
    {
      title: 'Calm Canvas Portfolio',
      description: 'A performant, accessible portfolio with motion controls, interactive navigation, and content-driven sections.',
      stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Frontend' as const,
    },
    {
      title: 'Streaming Analytics Pipeline',
      description: 'Real-time ingestion with Kafka and Spark streaming, surfacing insights through REST and dashboards.',
      stack: ['Java', 'Kafka', 'Spark', 'AWS'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Backend' as const,
    },
    {
      title: 'Deployment Control Plane',
      description: 'Infrastructure-as-code and GitOps workflows for multi-service deployments with automated checks.',
      stack: ['Terraform', 'Kubernetes', 'GitHub Actions', 'Helm'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Cloud' as const,
    },
    {
      title: 'Customer Insights Dashboard',
      description: 'Full-stack analytics dashboard with role-based access and exportable reports.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Frontend' as const,
    },
  ];

  const filteredProjects = projects.filter((project) => filter === 'All' || project.category === filter);

  return (
    <section id="projects" className="section-anchor py-16 lg:py-24 border-b border-border/60">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Projects"
          title="Selected projects and experiments."
          description="Hands-on builds across frontend, backend, and cloud. Filters help you jump to what matters."
        />

        <div className="flex flex-wrap gap-3 mb-6">
          {(['All', 'Frontend', 'Backend', 'Cloud'] as ProjectCategory[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full border ${
                filter === option ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'
              } ${prefersReducedMotion ? '' : 'transition-colors duration-200'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article key={project.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{project.category}</p>
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground/90 border border-border/60">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ResumeSection = () => {
  const resumeUrl = `${import.meta.env.BASE_URL || '/'}resume.pdf`;
  const handleResumeDownload = () => {
    toast({
      title: 'Resume download started',
      description: 'Opening resume.pdf with recent experience and certifications.',
    });
  };

  return (
    <section id="resume" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Resume"
          title="Download my resume."
          description="A concise, metrics-driven PDF with projects, experience, and certifications."
        />

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">One-click download</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Save the PDF or keep browsing. The highlights below mirror what you&apos;ll find inside.
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={resumeUrl}
                  download
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </TooltipTrigger>
              <TooltipContent>Downloads a fresh copy of my resume.</TooltipContent>
            </Tooltip>
          </div>

          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm uppercase tracking-[0.12em] text-muted-foreground mb-3">Preview</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Microservices, APIs, and cloud deployments that improved reliability and throughput.</li>
              <li>• Modern front-end work with React and TypeScript focused on accessibility and performance.</li>
              <li>• Certifications across AWS, Java, and Kubernetes with hands-on implementations.</li>
              <li>• Team leadership in code reviews, pairing, and playbooks for incident response.</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Prefer a quick view? Open the PDF inline in your browser and dive into the details.
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-foreground font-medium hover:text-primary"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Open inline preview</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>Opens the PDF in a new tab.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const mailto = `mailto:hello@babjikilaru.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
      formState.name || 'Visitor',
    )}&body=${encodeURIComponent(formState.message)}%0D%0A%0D%0AReply%20to:%20${encodeURIComponent(formState.email)}`;
    window.location.href = mailto;
    setStatus('sent');
    toast({
      title: 'Draft ready',
      description: 'Opening your email client with your details pre-filled.',
    });
  };

  return (
    <section id="contact" className="section-anchor py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something together."
          description="Send a quick note. I usually respond within a business day."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                Name
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="input"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                Email
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  className="input"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              Message
              <textarea
                required
                value={formState.message}
                onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                className="input min-h-[140px] resize-vertical"
                placeholder="What can we collaborate on?"
              />
            </label>

            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Send message
                  </button>
                </TooltipTrigger>
                <TooltipContent>Opens your default email client with this message.</TooltipContent>
              </Tooltip>
              <a
                href="mailto:hello@babjikilaru.com"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary"
              >
                <Mail className="w-4 h-4" />
                Prefer email? hello@babjikilaru.com
              </a>
            </div>
            {status === 'sent' && <p className="text-sm text-green-600">Opening your email client...</p>}
          </form>

          <div className="bg-secondary/60 border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              Availability
              <CalendarClock className="w-5 h-5 text-muted-foreground" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Open to backend, platform, or full-stack opportunities. Happy to consult on cloud migrations or DX upgrades too.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground border border-border/60">
                New engagements
              </span>
              <span className="px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground border border-border/60">
                Mentorship
              </span>
              <span className="px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground border border-border/60">
                Advisory
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
