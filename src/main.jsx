import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const images = {
  training: '/images/training.jpg',
  dashboard: '/images/dashboard.jpg',
  operations: '/images/operations.jpg',
  workshop: '/images/workshop-room.jpg'
};

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const tickerItems = [
  'AI Workforce Training',
  'Custom Software Builds',
  'Process Automation',
  'On-site Workshops',
  'Hyderabad & Across India',
  'Document Processing',
  'Production Dashboards',
  'Discovery-First Engagements'
];

const stats = [
  { value: '100%', label: 'Custom-built, no generic templates' },
  { value: '2×', label: 'Average team productivity gain' },
  { value: '24h', label: 'Response guarantee' }
];

const problems = [
  {
    icon: 'grid',
    image: '/images/training.jpg',
    imageAlt: 'Team learning AI tools in a workshop',
    title: 'Teams underusing AI tools',
    pain: 'Employees know AI exists but are unsure what to use, when, and how to do it safely.',
    response: 'We run structured training — on-site workshops or remote webinars — so your workforce gets more done in less time.'
  },
  {
    icon: 'doc',
    image: '/images/documents.jpg',
    imageAlt: 'Professional reviewing business documents',
    title: 'Manual documents & data entry',
    pain: 'Teams spend hours on forms, verification, and re-keying information between systems.',
    response: 'We build document processing and digitization workflows tailored to how your team already works.'
  },
  {
    icon: 'chart',
    image: '/images/dashboard.jpg',
    imageAlt: 'Analytics dashboard on a laptop screen',
    title: 'Repetitive reporting & spreadsheets',
    pain: 'Critical numbers live in scattered sheets and take too long to compile each week.',
    response: 'We deliver automated reporting and production tracking dashboards built for your operations.'
  }
];

const services = [
  {
    index: '01',
    title: 'AI Workforce Training',
    icon: 'grid',
    image: images.training,
    imageAlt: 'Facilitator leading an AI tools workshop for a business team',
    intro: 'We conduct structured AI training sessions for your employees — teaching them how to use modern AI tools to get more done in less time. Available as on-site workshops or remote webinars.',
    bullets: null,
    cta: 'Get in Touch',
    href: '/contact?interest=ai-training',
    accent: 'blue'
  },
  {
    index: '02',
    title: 'Software & Automation Solutions',
    icon: 'pulse',
    image: images.dashboard,
    imageAlt: 'Business analytics dashboard on screen',
    intro: 'We analyse your existing processes, identify where time and effort is being lost, and build reliable software to automate them. Every solution is built specifically around your workflow.',
    bullets: [
      'Inventory Management Systems',
      'Production Tracking Dashboards',
      'Automated Reporting',
      'Document Processing & Digitization'
    ],
    cta: 'Get in Touch',
    href: '/contact?interest=software',
    accent: 'teal'
  }
];

const industries = [
  {
    icon: 'factory',
    label: 'Manufacturing',
    desc: 'Inventory systems, production tracking, floor-level dashboards'
  },
  {
    icon: 'doc',
    label: 'Document-Heavy Teams',
    desc: 'Form digitization, verification workflows, data extraction'
  },
  {
    icon: 'truck',
    label: 'Logistics & Supply Chain',
    desc: 'Automated reporting, tracking dashboards, dispatch tools'
  },
  {
    icon: 'chart',
    label: 'Admin & Back Office',
    desc: 'Repetitive task automation, reporting, AI tool adoption'
  },
  {
    icon: 'grid',
    label: 'Professional Services',
    desc: 'AI upskilling for teams, workflow analysis, smart tooling'
  },
  {
    icon: 'shield',
    label: 'Healthcare Admin',
    desc: 'Records processing, compliance workflows, scheduling tools'
  }
];

const outcomes = [
  {
    before: 'Staff unaware of which AI tools are safe and relevant',
    after: 'Team trained and productive within one workshop',
    tag: 'AI Training'
  },
  {
    before: 'Hours spent compiling weekly reports manually',
    after: 'Automated in minutes — data pulls itself',
    tag: 'Reporting'
  },
  {
    before: 'Paper forms re-keyed into three separate systems',
    after: 'Single digitized flow — zero double entry',
    tag: 'Automation'
  }
];

const whyCastor = [
  {
    title: 'Practical training',
    body: 'Structured sessions that teach tools and techniques your team can apply immediately — not theory-only decks.',
    icon: 'grid'
  },
  {
    title: 'Built around your workflow',
    body: 'Custom software shaped around your specific processes, not a generic template forced to fit.',
    icon: 'pulse'
  },
  {
    title: 'Support after delivery',
    body: 'We ensure your team is comfortable using what we deliver and remain available for ongoing improvements.',
    icon: 'shield'
  }
];

const workSteps = [
  {
    number: '01',
    title: 'Discovery',
    image: '/images/discovery-meeting.jpg',
    imageAlt: 'Team discovery meeting mapping out processes',
    body: 'We meet with your team to understand your operations in detail — mapping your current processes and identifying exactly where time, effort, and resources are being lost.',
    deliverables: ['Process mapping session', 'Pain-point summary', 'Clear recommendation on next steps']
  },
  {
    number: '02',
    title: 'Solution Design',
    image: '/images/hero-office.jpg',
    imageAlt: 'Professionals planning a solution in an office setting',
    body: 'We design a solution around your specific requirements — whether that is a structured training programme, a custom software build, or a combination of both.',
    deliverables: ['Training plan or software scope', 'Timeline and milestones', 'Alignment with your team before build']
  },
  {
    number: '03',
    title: 'Delivery & Support',
    image: '/images/collaboration-feature.jpg',
    imageAlt: 'Team collaborating on delivered solution',
    body: 'We deliver the solution, ensure your team is comfortable using it, and remain available for ongoing support and improvements.',
    deliverables: ['Hands-on delivery', 'Team handover', 'Ongoing support as needed']
  }
];

const faqItems = [
  {
    q: 'What AI tools do you cover in training?',
    a: 'We cover the tools your team will actually use day-to-day — ChatGPT, Copilot, Gemini, and others depending on your role and industry. Sessions are hands-on, not slide-heavy.'
  },
  {
    q: 'How long does a training session take?',
    a: 'A standard workshop runs half a day to a full day depending on depth and team size. Remote webinars can be shorter and split across multiple sessions to fit your schedule.'
  },
  {
    q: 'Does our team need any technical background?',
    a: 'No. Training is designed for regular employees — not developers or IT staff. We start from where your team currently is and build from there.'
  },
  {
    q: 'How long does a software build take?',
    a: 'A focused automation or reporting dashboard typically takes 4–8 weeks. We agree on a clear timeline before starting, based on your specific requirements.'
  },
  {
    q: 'Can we start with training and add software later?',
    a: 'Yes — and it often makes sense to. Training first helps your team understand what AI can do, which makes it easier to identify where custom software would have the biggest impact.'
  },
  {
    q: 'How is pricing handled?',
    a: 'Scope and pricing are agreed after we understand what you need. We do not charge for the initial conversation — just fill in the contact form and we will respond within 24 hours.'
  }
];

function interestFromSearch(search) {
  const param = new URLSearchParams(search).get('interest');
  if (param === 'ai-training') return 'AI Workforce Training';
  if (param === 'software') return 'Software & Automation';
  return 'Not Sure Yet';
}

function useRoute() {
  const getLocation = () => ({ path: window.location.pathname, search: window.location.search });
  const [location, setLocation] = useState(getLocation);

  useEffect(() => {
    const sync = () => setLocation(getLocation());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    return () => window.cancelAnimationFrame(frame);
  }, [location.path, location.search]);

  const navigate = (href) => {
    const nextUrl = new URL(href, window.location.origin);
    const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (nextPath === currentPath) { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); return; }
    window.history.pushState({}, '', nextPath);
    setLocation({ path: nextUrl.pathname, search: nextUrl.search });
  };

  return { path: location.path, search: location.search, navigate };
}

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return value;
}

function App() {
  const { path, search, navigate } = useRoute();
  const [fading, setFading] = useState(false);
  const [displayedPath, setDisplayedPath] = useState(path);
  const [displayedSearch, setDisplayedSearch] = useState(search);

  useEffect(() => {
    const titles = {
      '/': 'Castor',
      '/services': 'Services – Castor',
      '/about': 'About – Castor',
      '/contact': 'Contact – Castor',
    };
    document.title = titles[path] || 'Castor – AI Training & Custom Software';
  }, [path]);

  useEffect(() => {
    if (path === displayedPath && search === displayedSearch) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setDisplayedPath(path); setDisplayedSearch(search); return; }
    setFading(true);
    const t = setTimeout(() => {
      setDisplayedPath(path);
      setDisplayedSearch(search);
      setFading(false);
    }, 160);
    return () => clearTimeout(t);
  }, [path, search]);

  const page = useMemo(() => {
    if (displayedPath === '/about') return <AboutPage navigate={navigate} />;
    if (displayedPath === '/contact') return <ContactPage search={displayedSearch} />;
    if (displayedPath === '/services') return <ServicesPage navigate={navigate} />;
    if (displayedPath === '/') return <HomePage navigate={navigate} />;
    return <NotFoundPage navigate={navigate} />;
  }, [displayedPath, displayedSearch, navigate]);

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll('.reveal-section'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { sections.forEach(s => s.classList.add('is-visible')); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('is-visible', 'is-initial-view');
        return;
      }
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [displayedPath, displayedSearch]);

  return (
    <div className="min-h-screen bg-white" style={{ color: 'var(--c-ink)' }}>
      <Navbar path={displayedPath} navigate={navigate} />
      <main style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.16s ease' }}>
        {page}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function RevealSection({ children, className = '', ...props }) {
  return (
    <section className={`reveal-section ${className}`} {...props}>
      {children}
    </section>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow mb-5 ${light ? 'text-white/50' : 'text-[var(--c-blue)]'}`}>
      <span className="eyebrow-dot" style={light ? { background: 'rgba(255,255,255,0.4)' } : {}} />
      {children}
    </p>
  );
}

function LogoMark({ inverse = false, size = 40 }) {
  return (
    <span
      className="grid place-items-center rounded-full"
      style={{
        width: size, height: size,
        background: inverse ? 'rgba(255,255,255,0.1)' : '#fff',
        border: inverse ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--c-line)',
        boxShadow: '0 8px 24px rgba(10,37,64,0.12)',
        flexShrink: 0
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
        <circle cx="20" cy="20" r="20" fill={inverse ? 'transparent' : 'white'} />
        <path d="M12 20h4.4M20 12v4.4M20 23.6V28" stroke="#246BFE" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="27" cy="20" r="3.1" fill="#246BFE" />
        <circle cx="27" cy="20" r="1.2" fill="#00D4AA" />
      </svg>
    </span>
  );
}

function NavAnchor({ item, path, navigate, onClick }) {
  const active = path === item.href;
  return (
    <button
      type="button"
      onClick={() => { onClick?.(); navigate(item.href); }}
      style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500 }}
      className={`transition-colors duration-150 ${active ? 'text-[var(--c-ink)]' : 'text-neutral-500 hover:text-[var(--c-ink)]'}`}
    >
      {item.label}
    </button>
  );
}

function Navbar({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent border-b border-transparent'}`}
      style={!scrolled ? { background: 'rgba(255,255,255,0.0)', backdropFilter: 'none' } : {}}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3"
          aria-label="Castor home"
        >
          <LogoMark />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            Castor
          </span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {navItems.map(item => <NavAnchor key={item.href} item={item} path={path} navigate={navigate} />)}
        </div>

        <div className="hidden md:block">
          <button type="button" onClick={() => navigate('/contact')} className="btn-primary">
            Get in Touch
            <ArrowRight size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
          style={{ borderColor: 'var(--c-line)' }}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <HamburgerIcon open={open} />
        </button>
      </nav>

      <div className={`mobile-nav-panel md:hidden${open ? ' is-open' : ''}`}>
        <div>
          <div className="border-t nav-glass px-5 py-5" style={{ borderColor: 'var(--c-line)' }}>
            <div className="mx-auto flex max-w-7xl flex-col gap-5">
              {navItems.map(item => (
                <NavAnchor key={item.href} item={item} path={path} navigate={navigate} onClick={() => setOpen(false)} />
              ))}
              <button type="button" onClick={() => { setOpen(false); navigate('/contact'); }} className="btn-primary w-full">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon({ open }) {
  return (
    <span className="relative h-4 w-5 block">
      <span className={`absolute left-0 h-0.5 w-5 transition-all duration-200 ${open ? 'top-2 rotate-45' : 'top-0'}`} style={{ background: 'var(--c-ink)' }} />
      <span className={`absolute left-0 top-2 h-0.5 w-5 transition-all duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'var(--c-ink)' }} />
      <span className={`absolute left-0 h-0.5 w-5 transition-all duration-200 ${open ? 'top-2 -rotate-45' : 'top-4'}`} style={{ background: 'var(--c-ink)' }} />
    </span>
  );
}

/* ── ICONS ── */
function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Icon({ name, size = 22 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    pulse: <><path d="M3 12h4l2.5-6 5 12 2.5-6h4" /><path d="M4 20h16" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15l3-4 3 2 5-7" /></>,
    doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5" /><path d="M10 13h6" /><path d="M10 17h4" /></>,
    shield: <><path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7L12 3z" /></>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/* ── HOME PAGE ── */
function HomePage({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <ServicesSection navigate={navigate} compact />
      <WhyCastor />
      <VisualShowcase />
      <FaqSection />
      <CtaBanner navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  return (
    <RevealSection
      className="relative isolate overflow-hidden text-white hero-full-height"
      style={{ background: 'var(--c-dark)', display: 'flex', alignItems: 'center' }}
    >
      {/* Background layers */}
      <div className="hero-grid absolute inset-0 opacity-100" aria-hidden="true" />
      <div className="hero-noise absolute inset-0" aria-hidden="true" />
      <div className="hero-glow-1" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--c-dark)]" aria-hidden="true" />

      <div className="section-motion relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid lg:grid-cols-[52%_1fr] lg:gap-14 lg:items-center gap-14">

          {/* Left: text */}
          <div>
            <h1
              className="hero-anim-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5.5vw, 4.75rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.03em'
              }}
            >
              Your team,{' '}
              <span className="text-gradient">AI-ready.</span>
              <br className="hidden sm:block" />
              Your operations,{' '}
              <br className="hidden sm:block" />
              running smarter.
            </h1>

            <p className="hero-anim-3 mt-7 text-lg leading-8" style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'var(--font-body)', maxWidth: '44ch' }}>
              Castor helps businesses in Hyderabad and across India upskill their employees with hands-on AI training — and builds custom software that eliminates the manual work eating into your day.
            </p>

            <div className="hero-anim-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button type="button" onClick={() => navigate('/contact')} className="btn-primary">
                Get in Touch
                <ArrowRight size={15} />
              </button>
              <button type="button" onClick={() => navigate('/services')} className="btn-outline-white">
                See How We Help
              </button>
            </div>
          </div>

          {/* Right: hero photo */}
          <div className="hero-anim-5 hidden lg:block">
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                padding: 2,
                background: 'linear-gradient(135deg, rgba(36,107,254,0.7) 0%, rgba(0,212,170,0.4) 50%, rgba(36,107,254,0.2) 100%)',
                boxShadow: '0 48px 120px rgba(0,0,0,0.5), 0 0 80px rgba(36,107,254,0.18)'
              }}
            >
              <div style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', height: 460 }}>
                <img
                  src="/images/hero-team.jpg"
                  alt="Business team collaborating on AI tools"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.35) 0%, transparent 45%)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(36,107,254,0.7), rgba(0,212,170,0.4), transparent)' }} />
    </RevealSection>
  );
}

function TickerStrip() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="border-y py-5" style={{ borderColor: 'var(--c-line)', background: 'var(--c-fog)' }}>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-ink)', opacity: 0.55 }}>
              {item}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--c-teal)', display: 'inline-block', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, index, light = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const numericPart = stat.value.replace(/\D/g, '');
  const prefix = stat.value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = stat.value.match(/[^0-9]*$/)?.[0] || '';
  const count = useCountUp(numericPart, 1600, visible);

  const borderColor = light ? 'var(--c-line)' : 'rgba(255,255,255,0.07)';
  const labelColor = light ? '#6a7280' : 'rgba(255,255,255,0.5)';

  return (
    <div
      ref={ref}
      className="text-center py-10 px-6"
      style={{
        borderRight: index < stats.length - 1 ? `1px solid ${borderColor}` : 'none',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <p className="stat-number" style={{ color: index % 2 === 0 ? 'var(--c-blue)' : 'var(--c-teal)' }}>
        {prefix}{numericPart ? count : ''}{suffix}
      </p>
      <p className="mt-3 text-sm font-medium" style={{ color: labelColor, fontFamily: 'var(--font-body)' }}>
        {stat.label}
      </p>
    </div>
  );
}

function StatsSection() {
  return (
    <RevealSection className="bg-white overflow-hidden py-16 sm:py-20">
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className="rounded-2xl grid grid-cols-1 sm:grid-cols-3 overflow-hidden"
          style={{ border: '1.5px solid var(--c-line)', background: 'var(--c-fog)' }}
        >
          {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} light />)}
        </div>
      </div>
    </RevealSection>
  );
}

function ProblemsSection() {
  return (
    <RevealSection className="section-dark relative isolate overflow-hidden py-24 text-white sm:py-32">
      <div className="section-motion relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-16">
          <Eyebrow light>Challenges we address</Eyebrow>
          <h2
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          >
            Where teams lose time
          </h2>
          <p className="mt-5 text-lg leading-8" style={{ color: 'rgba(255,255,255,0.52)' }}>
            We focus on the operational friction that AI training and custom software can actually remove.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((item, i) => (
            <article
              key={item.title}
              className="problem-card group overflow-hidden"
              style={{ padding: 0, transitionDelay: `${i * 80}ms` }}
            >
              {/* Photo header */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block', transition: 'transform 0.6s ease' }}
                  className="problem-card-img"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.75) 0%, rgba(6,9,15,0.2) 55%, transparent 100%)', pointerEvents: 'none' }} />
                <div
                  className={`icon-chip ${i === 1 ? 'icon-chip-teal' : 'icon-chip-blue'}`}
                  style={{ position: 'absolute', bottom: 14, left: 16, width: 40, height: 40, borderRadius: 10 }}
                >
                  <Icon name={item.icon} size={18} />
                </div>
              </div>

              {/* Text body */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em', marginBottom: '0.6rem' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-7" style={{ color: 'rgba(255,255,255,0.52)', marginBottom: '1rem' }}>
                  {item.pain}
                </p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-sm leading-7" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {item.response}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function ServiceCard({ service, navigate, showCta = true }) {
  const isBlue = service.accent === 'blue';
  return (
    <article className="service-card group flex flex-col h-full">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', background: '#1a1f2e' }}>
        <img src={service.image} alt={service.imageAlt} className="service-card-img" loading="lazy" decoding="async" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.65), transparent)' }} />
        <span
          className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-black"
          style={{
            background: isBlue ? 'var(--c-blue)' : 'var(--c-teal)',
            color: '#fff',
            letterSpacing: '0.12em',
            fontFamily: 'var(--font-display)'
          }}
        >
          {service.index}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-8">
        <div className={`icon-chip mb-5 ${isBlue ? 'icon-chip-blue' : 'icon-chip-teal'}`}>
          <Icon name={service.icon} size={22} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--c-ink)', lineHeight: 1.2 }}>
          {service.title}
        </h3>
        <p className="mt-4 text-base leading-7" style={{ color: '#5a6070', fontFamily: 'var(--font-body)' }}>
          {service.intro}
        </p>
        {service.bullets && (
          <ul className="mt-5 space-y-2.5 pt-5" style={{ borderTop: '1px solid var(--c-line)' }}>
            {service.bullets.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6" style={{ color: '#5a6070' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: isBlue ? 'var(--c-blue)' : 'var(--c-teal)', flexShrink: 0, marginTop: 8 }} />
                {item}
              </li>
            ))}
          </ul>
        )}
        {showCta && service.cta && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate(service.href)}
              className="btn-primary"
              style={!isBlue ? { background: 'var(--c-teal)', color: '#fff' } : {}}
            >
              {service.cta}
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function ServicesSection({ navigate, compact = false }) {
  return (
    <RevealSection className="py-24 sm:py-32" style={{ background: 'var(--c-fog)' }}>
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-14">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Our services
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7" style={{ color: '#5a6070' }}>
            Built specifically around how your team works — not adapted from a template.
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-2 lg:items-stretch">
          {services.map(service => <ServiceCard key={service.title} service={service} navigate={navigate} showCta={!compact} />)}
        </div>
        {compact && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => navigate('/services')} className="btn-outline-dark">
              View full service details
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </RevealSection>
  );
}

function HowWeWork() {
  return (
    <RevealSection className="bg-white py-24 sm:py-32">
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <Eyebrow>Process</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            How we work
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-base leading-7" style={{ color: '#5a6070' }}>
            Discovery-led engagements — we map your operations before recommending training, a software build, or both.
          </p>
        </div>

        <div className="relative grid gap-7 lg:grid-cols-3">
          {/* Connector line */}
          <svg className="absolute left-[16%] right-[16%] top-[24px] hidden h-0.5 lg:block" viewBox="0 0 800 2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="1" x2="800" y2="1" stroke="url(#procGrad)" strokeWidth="2" className="process-line" />
            <defs>
              <linearGradient id="procGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(36,107,254,0)" />
                <stop offset="40%" stopColor="rgba(36,107,254,0.6)" />
                <stop offset="60%" stopColor="rgba(0,212,170,0.5)" />
                <stop offset="100%" stopColor="rgba(0,212,170,0)" />
              </linearGradient>
            </defs>
          </svg>

          {workSteps.map((step, i) => (
            <article
              key={step.number}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: '#fff',
                border: '1px solid var(--c-line)',
                boxShadow: '0 8px 32px rgba(10,37,64,0.06)',
                transitionDelay: `${i * 80}ms`
              }}
            >
              {/* Step photo */}
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block', transition: 'transform 0.6s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)', pointerEvents: 'none' }} />
                {/* Step number badge on photo */}
                <span
                  className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-black"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: i === 1 ? 'linear-gradient(135deg, var(--c-blue), var(--c-teal))' : 'rgba(255,255,255,0.92)',
                    color: i === 1 ? '#fff' : 'var(--c-blue)',
                    border: i === 1 ? 'none' : '1.5px solid var(--c-line)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Text */}
              <div className="p-7">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-7 mb-5" style={{ color: '#5a6070' }}>{step.body}</p>
                <ul className="space-y-2 pt-4" style={{ borderTop: '1px solid var(--c-line)' }}>
                  {step.deliverables.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#5a6070' }}>
                      <span style={{ color: 'var(--c-teal)', marginTop: 1 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function WhyCastor() {
  return (
    <RevealSection className="py-24 sm:py-32" style={{ background: 'var(--c-fog)' }}>
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <Eyebrow>Why Castor</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            What makes us different
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {whyCastor.map((item, i) => (
            <div key={item.title} className="why-card">
              <div className={`icon-chip mb-6 ${i === 1 ? 'icon-chip-teal' : 'icon-chip-blue'}`}>
                <Icon name={item.icon} size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.01em', marginBottom: '0.6rem' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-7" style={{ color: '#5a6070' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function ShowcaseImage({ src, alt, style = {} }) {
  return (
    <div
      className="img-frame"
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, background: '#1a1f2e', ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </div>
  );
}

function VisualShowcase() {
  return (
    <RevealSection className="bg-white py-20 sm:py-24">
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Real work, real results</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
              Where we work
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7" style={{ color: '#5a6070' }}>
            From training rooms to production floors.
          </p>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-3 sm:hidden">
          <ShowcaseImage src={images.operations} alt="Operations environment" style={{ height: 220 }} />
          <ShowcaseImage src={images.workshop} alt="Workshop training session" style={{ height: 180 }} />
          <ShowcaseImage src={images.dashboard} alt="Software dashboard" style={{ height: 180 }} />
        </div>

        {/* Desktop: explicit bento grid — no Tailwind row/col classes that can conflict */}
        <div
          className="hidden sm:grid"
          style={{
            gridTemplateColumns: '58% 1fr',
            gridTemplateRows: '260px 260px',
            gap: 14
          }}
        >
          <ShowcaseImage
            src={images.operations}
            alt="Operations and manufacturing environment"
            style={{ gridColumn: '1', gridRow: '1 / 3', height: '100%' }}
          />
          <ShowcaseImage
            src={images.workshop}
            alt="Workshop training session"
            style={{ gridColumn: '2', gridRow: '1', height: '100%' }}
          />
          <ShowcaseImage
            src={images.dashboard}
            alt="Software dashboard"
            style={{ gridColumn: '2', gridRow: '2', height: '100%' }}
          />
        </div>
      </div>
    </RevealSection>
  );
}

function IndustriesSection() {
  const iconMap = {
    factory: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M3 7l6-4 6 4 6-4v14H3z" />
        <rect x="9" y="13" width="6" height="8" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
    truck: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11v12H5z" />
        <path d="M14 3h4l3 5v6h-7V3z" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    )
  };

  return (
    <RevealSection className="bg-white py-20 sm:py-24">
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Industries we serve</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
              Built for operations-<br className="hidden sm:block" />heavy businesses
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7" style={{ color: '#5a6070' }}>
            We focus on teams where manual processes have the highest cost.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, i) => (
            <div
              key={item.label}
              className="group rounded-xl p-6 transition-all duration-300"
              style={{
                border: '1.5px solid var(--c-line)',
                background: '#fff',
                cursor: 'default'
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = i % 2 === 0 ? 'rgba(36,107,254,0.4)' : 'rgba(0,212,170,0.4)'; e.currentTarget.style.background = i % 2 === 0 ? 'rgba(36,107,254,0.02)' : 'rgba(0,212,170,0.02)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--c-line)'; e.currentTarget.style.background = '#fff'; }}
            >
              <div
                className={`icon-chip mb-4 ${i % 2 === 0 ? 'icon-chip-blue' : 'icon-chip-teal'}`}
                style={{ width: 44, height: 44, borderRadius: 12 }}
              >
                {iconMap[item.icon] ?? <Icon name={item.icon} size={20} />}
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--c-ink)', marginBottom: 6 }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8375rem', lineHeight: 1.65, color: '#6a7280' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function OutcomesSection({ navigate }) {
  return (
    <RevealSection className="py-24 sm:py-32" style={{ background: 'var(--c-fog)' }}>
      <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>What changes</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}>
              Before Castor → After
            </h2>
          </div>
          <button type="button" onClick={() => navigate('/contact')} className="btn-primary shrink-0">
            Get in Touch
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {outcomes.map((item, i) => (
            <div
              key={item.tag}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1.5px solid var(--c-line)', background: '#fff', boxShadow: '0 4px 24px rgba(10,37,64,0.05)' }}
            >
              {/* Tag */}
              <div
                className="px-6 py-3 flex items-center gap-2"
                style={{ borderBottom: '1px solid var(--c-line)', background: i % 2 === 0 ? 'rgba(36,107,254,0.04)' : 'rgba(0,212,170,0.04)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: i % 2 === 0 ? 'var(--c-blue)' : 'var(--c-teal)'
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div className="p-6 space-y-5">
                {/* Before */}
                <div className="flex gap-3 items-start">
                  <span
                    className="mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                  >
                    ✕
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.65, color: '#6a7280' }}>
                    {item.before}
                  </p>
                </div>

                {/* Divider with arrow */}
                <div className="flex items-center gap-3">
                  <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }} />
                  <span style={{ fontSize: '1rem', color: i % 2 === 0 ? 'var(--c-blue)' : 'var(--c-teal)' }}>↓</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }} />
                </div>

                {/* After */}
                <div className="flex gap-3 items-start">
                  <span
                    className="mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: 'rgba(0,212,170,0.12)', color: 'var(--c-teal)' }}
                  >
                    ✓
                  </span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.55, color: 'var(--c-ink)' }}>
                    {item.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <RevealSection className="py-24 sm:py-32" style={{ background: 'var(--c-fog)' }}>
      <div className="section-motion mx-auto max-w-2xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
            Common questions
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--c-line)', background: '#fff', boxShadow: '0 8px 32px rgba(10,37,64,0.06)' }}>
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} style={{ borderBottom: i < faqItems.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                  style={{ background: isOpen ? 'rgba(36,107,254,0.02)' : 'transparent' }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--c-ink)' }}>
                    {item.q}
                  </span>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      border: `1.5px solid ${isOpen ? 'var(--c-blue)' : 'var(--c-line)'}`,
                      background: isOpen ? 'var(--c-blue)' : 'transparent',
                      color: isOpen ? '#fff' : 'var(--c-blue)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      fontSize: '1.2rem',
                      fontWeight: 300
                    }}
                  >
                    +
                  </span>
                </button>
                <div className={`faq-panel ${isOpen ? 'is-open' : ''}`}>
                  <div>
                    <p className="px-6 pb-5 text-sm leading-7" style={{ color: '#5a6070' }}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

function CtaBanner({ navigate }) {
  return (
    <RevealSection className="relative isolate overflow-hidden py-24 text-white lg:py-32" style={{ background: 'var(--c-dark)' }}>
      <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="hero-glow-1" aria-hidden="true" />
      <div className="section-motion relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
            <Eyebrow light>Start here</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Ready to see what's<br />possible for your team?
            </h2>
            <p className="mt-5 text-lg leading-8" style={{ color: 'rgba(255,255,255,0.58)' }}>
              Tell us what you need — AI training for your team or custom software for your operations. Fill in a short form and we will get back to you within 24 hours.
            </p>
        </div>
      </div>
    </RevealSection>
  );
}

/* ── SERVICES PAGE ── */
function ServicesPage({ navigate }) {
  return (
    <>
      <RevealSection className="relative isolate overflow-hidden text-white" style={{ background: 'var(--c-dark)' }}>
        <div className="hero-grid absolute inset-0 opacity-80" />
        <div className="hero-glow-1" />
        <div className="section-motion relative z-10 mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <Eyebrow light>Services</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Two ways we help<br />your business
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Practical solutions designed around your actual operations — workforce training and custom software built for how your team works.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(36,107,254,0.7), transparent)' }} />
      </RevealSection>

      <RevealSection className="py-24 sm:py-32" style={{ background: 'var(--c-fog)' }}>
        <div className="section-motion mx-auto max-w-7xl space-y-10 px-5 sm:px-8 lg:px-10">
          {services.map(service => <ServiceCard key={service.title} service={service} navigate={navigate} />)}
        </div>
      </RevealSection>

      <CtaBanner navigate={navigate} />
    </>
  );
}

/* ── ABOUT PAGE ── */
function AboutPage({ navigate }) {
  return (
    <>
      <RevealSection className="relative isolate overflow-hidden text-white" style={{ background: 'var(--c-dark)' }}>
        <div className="hero-grid absolute inset-0 opacity-80" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="section-motion relative z-10 mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <Eyebrow light>About Castor</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            We are a Hyderabad-based<br />AI consultancy
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.62)' }}>
            Most businesses know AI is important — but their teams don't know what to use, when, or how to do it safely. And their day-to-day operations are still full of manual processes that eat into time and focus.
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.62)' }}>
            Castor was built to fix both of those things. We run structured AI training for employees and build custom software that automates the repetitive work — designed around how your specific business operates, not around a generic product.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(36,107,254,0.7), transparent)' }} />
      </RevealSection>

      <RevealSection className="py-24 sm:py-28" style={{ background: 'var(--c-fog)' }}>
        <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.3fr_0.7fr] lg:items-start">
            <Eyebrow>Mission</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              We believe AI should be practical — something your team actually uses every day, not a pilot project that goes nowhere.
            </h2>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-white py-20">
        <div className="section-motion mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Photo */}
            <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', background: '#1a1f2e' }}>
              <img
                src="/images/planning-session.jpg"
                alt="Team planning session"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-xs font-semibold uppercase mb-4" style={{ letterSpacing: '0.18em', color: 'var(--c-blue)', fontFamily: 'var(--font-body)' }}>
                  Based in Hyderabad
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--c-ink)' }}>
                  Practical training. Software that actually fits.
                </h3>
                <p className="mt-5 text-base leading-7" style={{ color: '#5a6070' }}>
                  We understand what you need, agree on scope, and deliver — whether that is an on-site AI workshop, a remote training session, or a custom software build around your existing workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
}

/* ── CONTACT PAGE ── */
function ContactPage({ search = '' }) {
  const [interest, setInterest] = useState(() => interestFromSearch(search));
  const [status, setStatus] = useState('idle');

  useEffect(() => { setInterest(interestFromSearch(search)); }, [search]);

  const showTrainingFields = interest === 'AI Workforce Training';
  const showSoftwareFields = interest === 'Software & Automation';

  const messageLabel = interest === 'AI Workforce Training'
    ? 'What do you want your team to be able to do after training?'
    : interest === 'Software & Automation'
      ? 'Describe the process or workflow you want to automate'
      : 'Tell us about what you are looking to improve';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!FORMSPREE_ID) { setStatus('no-config'); return; }
    setStatus('loading');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (response.ok) { setStatus('success'); form.reset(); setInterest('Not Sure Yet'); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      {/* Dark page header */}
      <RevealSection className="relative isolate overflow-hidden text-white" style={{ background: 'var(--c-dark)' }}>
        <div className="hero-grid absolute inset-0 opacity-80" />
        <div className="hero-glow-1" />
        <div className="section-motion relative z-10 mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <Eyebrow light>Contact</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            Tell us about your business
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Fill in the form below and we will get back to you within 24 hours — no sales pitch, just a straight response about what would actually help your business.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(36,107,254,0.7), transparent)' }} />
      </RevealSection>

      {/* Form section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-10">

          {/* Left: info panel */}
          <div className="flex flex-col gap-6">

            {/* Response promise */}
            <div className="rounded-2xl p-7" style={{ background: 'var(--c-fog)', border: '1.5px solid var(--c-line)' }}>
              <p className="text-xs font-semibold uppercase mb-5" style={{ letterSpacing: '0.18em', color: 'var(--c-blue)', fontFamily: 'var(--font-body)' }}>
                What happens next
              </p>
              <ol className="space-y-4">
                {[
                  ['You fill in the form', 'Tell us what you need'],
                  ['We review and reply', 'Within 24 hours'],
                  ['We start when you are ready', 'On your timeline']
                ].map(([title, sub], idx) => (
                  <li key={title} className="flex items-start gap-3">
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--c-blue)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--c-ink)', fontFamily: 'var(--font-display)' }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6a7280' }}>{sub}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-sm px-1" style={{ color: '#9ca3af' }}>
              Based in Hyderabad · Serving teams across India
            </p>
          </div>

          {/* Right: form */}
          <form
            className="rounded-2xl p-7 sm:p-9"
            style={{ border: '1.5px solid var(--c-line)', background: '#fff', boxShadow: '0 16px 56px rgba(10,37,64,0.07)' }}
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="New Castor enquiry" />

            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--c-ink)' }}>
              About you
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Full name" name="name" autoComplete="name" />
              <FormField label="Company name" name="company" autoComplete="organization" />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField label="Work email" name="email" type="email" autoComplete="email" />
              <FormField label="Phone number (optional)" name="phone" type="tel" autoComplete="tel" required={false} />
            </div>

            <div className="mt-8 pt-7" style={{ borderTop: '1px solid var(--c-line)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--c-ink)' }}>
                What you need
              </p>
              <FormSelect
                label="What are you interested in?"
                id="interest"
                name="interest"
                value={interest}
                onChange={e => setInterest(e.target.value)}
                required
              >
                <option>AI Workforce Training</option>
                <option>Software & Automation</option>
                <option>Not Sure Yet</option>
              </FormSelect>
            </div>

            {/* Training-specific fields */}
            {showTrainingFields && (
              <div className="mt-5 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormSelect label="Type of training" id="training-type" name="training-type" required>
                    <option>Introductory AI Training</option>
                    <option>Role-Specific AI Training</option>
                    <option>AI Tools for Productivity</option>
                    <option>AI Safety and Responsible Use</option>
                    <option>Not Sure Yet</option>
                  </FormSelect>
                  <FormSelect label="Who is it for?" id="training-audience" name="training-audience" required>
                    <option>Leadership / Management</option>
                    <option>Operations Team</option>
                    <option>Sales / Marketing</option>
                    <option>Admin / Documentation Team</option>
                    <option>Mixed Team</option>
                  </FormSelect>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormSelect label="Current AI experience" id="experience-level" name="experience-level" required>
                    <option>New to AI</option>
                    <option>Some Employees Use AI Tools</option>
                    <option>Already Using AI Regularly</option>
                    <option>Not Sure</option>
                  </FormSelect>
                  <FormField label="Approx. number of participants" name="participants" autoComplete="off" />
                </div>
                <FormSelect label="Preferred format" id="training-format" name="training-format" required>
                  <option>On-site Workshop</option>
                  <option>Remote Webinar</option>
                  <option>Hybrid</option>
                  <option>Not Sure Yet</option>
                </FormSelect>
              </div>
            )}

            {/* Software-specific fields */}
            {showSoftwareFields && (
              <div className="mt-5 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormSelect label="What area to automate?" id="automation-area" name="automation-area" required>
                    <option>Document Processing</option>
                    <option>Reporting & Dashboards</option>
                    <option>Inventory Management</option>
                    <option>Data Entry & Forms</option>
                    <option>Other / Not Sure</option>
                  </FormSelect>
                  <FormSelect label="How many people are affected?" id="team-size" name="team-size" required>
                    <option>1–5 people</option>
                    <option>6–20 people</option>
                    <option>21–50 people</option>
                    <option>50+ people</option>
                  </FormSelect>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormSelect label="Do you have existing software?" id="existing-systems" name="existing-systems" required>
                    <option>Yes — and it needs to connect</option>
                    <option>Yes — but we can replace it</option>
                    <option>No — starting fresh</option>
                    <option>Not Sure</option>
                  </FormSelect>
                  <FormSelect label="What is your rough timeline?" id="timeline" name="timeline" required>
                    <option>As soon as possible</option>
                    <option>Within 1–3 months</option>
                    <option>3–6 months</option>
                    <option>Just exploring for now</option>
                  </FormSelect>
                </div>
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="problem" className="block text-sm font-semibold mb-3" style={{ color: 'var(--c-ink)' }}>
                {messageLabel}
              </label>
              <textarea id="problem" name="problem" rows={5} className="form-textarea" required />
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ height: 52, padding: '0 2rem' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                {status !== 'loading' && <ArrowRight size={15} />}
              </button>
              <p className="text-xs" style={{ color: '#9ca3af' }}>
                We respond within 24 hours. No spam, no hard sell.
              </p>
            </div>

            {status === 'success' && (
              <div className="mt-6 rounded-xl p-4" style={{ background: 'rgba(0,212,170,0.07)', border: '1px solid rgba(0,212,170,0.25)' }} role="status">
                <p className="text-sm font-semibold" style={{ color: 'var(--c-teal)' }}>Message received.</p>
                <p className="text-sm mt-1" style={{ color: '#5a6070' }}>We will review your details and reply within 24 hours to arrange a call.</p>
              </div>
            )}
            {status === 'error' && (
              <p className="mt-5 text-sm font-semibold text-red-600" role="alert">
                Something went wrong — please try again.
              </p>
            )}
            {status === 'no-config' && (
              <p className="mt-5 text-sm" style={{ color: '#666' }} role="status">
                Form not configured. Add <code className="rounded px-1 text-xs" style={{ background: 'var(--c-fog)' }}>VITE_FORMSPREE_FORM_ID</code> to your <code className="rounded px-1 text-xs" style={{ background: 'var(--c-fog)' }}>.env</code> file.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function FormField({ label, name, type = 'text', autoComplete, required = true }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold mb-3" style={{ color: 'var(--c-ink)' }}>
        {label}
      </label>
      <input
        id={name} name={name} type={type} autoComplete={autoComplete}
        className="form-input"
        required={required}
      />
    </div>
  );
}

function FormSelect({ label, id, children, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-3" style={{ color: 'var(--c-ink)' }}>
        {label}
      </label>
      <select
        id={id}
        className="form-input"
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

/* ── 404 PAGE ── */
function NotFoundPage({ navigate }) {
  return (
    <RevealSection
      className="relative isolate overflow-hidden text-white"
      style={{ background: 'var(--c-dark)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="section-motion relative z-10 mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8">
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(5rem, 18vw, 10rem)', lineHeight: 1, opacity: 0.08, letterSpacing: '-0.04em' }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginTop: '-1rem' }}>
          Page not found
        </h1>
        <p className="mt-4 text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
          This page doesn't exist. You may have mistyped the address.
        </p>
        <button type="button" onClick={() => navigate('/')} className="btn-primary mt-8">
          Back to Home
          <ArrowRight size={15} />
        </button>
      </div>
    </RevealSection>
  );
}

/* ── FOOTER ── */
function Footer({ navigate }) {
  return (
    <footer className="footer-bg text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <button type="button" onClick={() => navigate('/')} className="flex items-center gap-3 self-start">
            <LogoMark inverse />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              Castor
            </span>
          </button>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            {navItems.filter(i => i.href !== '/').map(item => (
              <button
                key={item.href}
                type="button"
                onClick={() => navigate(item.href)}
                className="text-left text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@castor.in"
              className="text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              hello@castor.in
            </a>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="text-sm font-semibold transition-colors self-start"
              style={{ color: 'var(--c-teal)', fontFamily: 'var(--font-body)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--c-teal)'}
            >
              Get in Touch →
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>
          <p>© {new Date().getFullYear()} Castor · Hyderabad, India</p>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
