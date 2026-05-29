import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const services = [
  {
    title: 'AI Workforce Training',
    icon: 'grid',
    body: 'We conduct structured AI training sessions for your employees — teaching them how to use modern AI tools to get more done in less time. Available as on-site workshops or remote webinars.',
    cta: 'Book AI Training',
    href: '/contact?interest=ai-training'
  },
  {
    title: 'Software & Automation Solutions',
    icon: 'pulse',
    body: 'We analyse your existing processes, identify where time and effort is being lost, and build reliable software to automate them. Every solution is built specifically around your workflow — not adapted from a generic template.\n\nWhat we build includes:\n• Inventory Management Systems\n• Production Tracking Dashboards\n• Automated Reporting\n• Document Processing & Digitization'
  }
];

const workSteps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We meet with your team to understand your operations in detail — mapping your current processes and identifying exactly where time, effort, and resources are being lost.'
  },
  {
    number: '02',
    title: 'Solution Design',
    body: 'We design a solution around your specific requirements — whether that is a structured training programme, a custom software build, or a combination of both.'
  },
  {
    number: '03',
    title: 'Delivery & Support',
    body: 'We deliver the solution, ensure your team is comfortable using it, and remain available for ongoing support and improvements.'
  }
];

function useRoute() {
  const getLocation = () => ({
    path: window.location.pathname,
    search: window.location.search
  });
  const [location, setLocation] = useState(getLocation);

  useEffect(() => {
    const syncLocation = () => setLocation(getLocation());
    window.addEventListener('popstate', syncLocation);
    return () => window.removeEventListener('popstate', syncLocation);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.path, location.search]);

  const navigate = (href) => {
    const nextUrl = new URL(href, window.location.origin);
    const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
    const currentPath = `${window.location.pathname}${window.location.search}`;

    if (nextPath === currentPath) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', nextPath);
    setLocation({ path: nextUrl.pathname, search: nextUrl.search });
  };

  return { path: location.path, search: location.search, navigate };
}

function App() {
  const { path, search, navigate } = useRoute();
  const page = useMemo(() => {
    if (path === '/about') return <AboutPage navigate={navigate} />;
    if (path === '/contact') return <ContactPage search={search} />;
    return <HomePage navigate={navigate} />;
  }, [path, search, navigate]);

  return (
    <div className="min-h-screen bg-white text-castor-ink">
      <Navbar path={path} navigate={navigate} />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function LinkButton({ href, navigate, children, variant = 'primary', className = '', onNavigate }) {
  const styles =
    variant === 'dark'
      ? 'bg-castor-ink text-white hover:bg-castor-navy'
      : 'bg-castor-blue text-white hover:bg-[#1754D8]';

  return (
    <button
      type="button"
      onClick={() => {
        onNavigate?.();
        navigate(href);
      }}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-castor-blue/20 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function NavAnchor({ item, path, navigate, onClick }) {
  const active = path === item.href || (path !== '/about' && path !== '/contact' && item.href === '/');

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        navigate(item.href);
      }}
      className={`text-sm font-medium transition hover:text-castor-blue ${
        active ? 'text-castor-ink' : 'text-neutral-500'
      }`}
    >
      {item.label}
    </button>
  );
}

function Navbar({ path, navigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-castor-line/80 bg-white/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-left"
          aria-label="Castor home"
        >
          <LogoMark />
          <span className="text-xl font800 tracking-tight">Castor</span>
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <NavAnchor key={item.href} item={item} path={path} navigate={navigate} />
          ))}
        </div>

        <div className="hidden md:block">
          <LinkButton href="/contact" navigate={navigate} className="min-h-11 px-5">
            Get In Touch
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-castor-line bg-white shadow-sm md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-castor-ink transition ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 bg-castor-ink transition ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-castor-ink transition ${
                open ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-castor-line bg-white px-5 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            {navItems.map((item) => (
              <NavAnchor
                key={item.href}
                item={item}
                path={path}
                navigate={navigate}
                onClick={() => setOpen(false)}
              />
            ))}
            <LinkButton href="/contact" navigate={navigate} className="w-full" onNavigate={() => setOpen(false)}>
              Get In Touch
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark({ className = '', inverse = false }) {
  const shell = inverse
    ? 'bg-white ring-1 ring-white/20'
    : 'bg-white ring-1 ring-castor-line';

  return (
    <span
      className={`grid h-10 w-10 place-items-center rounded-full ${shell} shadow-[0_10px_24px_rgba(10,37,64,0.14)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="white" />
        <path
          d="M12 20h4.4M20 12v4.4M20 23.6V28"
          stroke="#246BFE"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="27" cy="20" r="3.1" fill="#246BFE" />
      </svg>
    </span>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <ServicesSection navigate={navigate} />
      <HowWeWork />
      <CtaBanner navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  return (
    <section className="relative isolate overflow-hidden bg-castor-ink text-white">
      <div className="absolute inset-0 opacity-90">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute right-[-9rem] top-[-12rem] h-[32rem] w-[32rem] rounded-full border border-white/10" />
        <div className="absolute bottom-[-16rem] right-[10%] h-[34rem] w-[34rem] rounded-full bg-castor-blue/10 blur-3xl" />
        <div className="absolute left-[56%] top-32 hidden h-72 w-72 rotate-45 border border-white/15 lg:block" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
        <div className="relative z-10 w-full min-w-0 max-w-4xl">
          <p className="mb-7 text-sm font-semibold uppercase tracking-[0.24em] text-white/62">
            AI CONSULTANCY & TECHNOLOGY SERVICES
          </p>
          <h1 className="max-w-full text-4xl font-black leading-[0.96] tracking-tight text-white sm:max-w-5xl sm:text-6xl lg:text-7xl">
            AI Training and Custom Software for businesses
          </h1>
          <p className="mt-8 max-w-full text-lg leading-8 text-white/72 sm:max-w-2xl sm:text-xl">
            We train your workforce to use modern AI tools effectively, and build custom software that automates the manual processes slowing your operations down.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="/contact" navigate={navigate}>
              Let's Talk
            </LinkButton>
          </div>
        </div>

        <div className="relative z-10 hidden min-h-[34rem] lg:block" aria-hidden="true">
          <div className="absolute right-0 top-8 h-[30rem] w-[30rem] rounded-full border border-white/12" />
          <div className="absolute right-20 top-24 h-72 w-72 rounded-[2rem] border border-white/15 bg-white/[0.03] shadow-2xl backdrop-blur" />
          <div className="absolute right-8 top-48 h-64 w-64 rounded-full border border-castor-blue/45" />
          <div className="absolute right-52 top-72 h-32 w-56 -rotate-6 rounded-2xl border border-white/18 bg-white/[0.045]" />
          <div className="absolute right-32 top-36 h-3 w-36 rounded-full bg-castor-blue" />
          <div className="absolute right-48 top-60 h-3 w-52 rounded-full bg-white/22" />
          <div className="absolute right-10 top-80 h-3 w-44 rounded-full bg-white/16" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ navigate }) {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-castor-blue">
              WHAT WE OFFER
            </p>
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-castor-ink sm:text-5xl lg:text-6xl">
              Two Ways We Help Your Business
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-neutral-600">
            Practical solutions designed around your actual operations.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group min-h-72 rounded-lg border border-castor-line bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-castor-blue/40 hover:shadow-soft"
            >
              <Icon name={service.icon} />
              <h3 className="mt-9 text-2xl font800 leading-tight tracking-tight text-castor-ink">
                {service.title}
              </h3>
              <p className="mt-5 whitespace-pre-line text-base leading-7 text-neutral-600">{service.body}</p>
              {service.cta && (
                <button
                  type="button"
                  onClick={() => navigate(service.href)}
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-castor-ink px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-castor-navy focus:outline-none focus:ring-4 focus:ring-castor-blue/20"
                >
                  {service.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ name }) {
  const common = 'h-8 w-8 stroke-current';
  const icons = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    pulse: (
      <>
        <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />
        <path d="M4 20h16" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15l3-4 3 2 5-7" />
      </>
    ),
    doc: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6" />
        <path d="M10 17h4" />
      </>
    ),
    message: (
      <>
        <path d="M5 5h14v10H9l-4 4z" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
      </>
    ),
    flow: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M9 7h6" />
        <path d="M8 9l3 6" />
        <path d="M16 9l-3 6" />
      </>
    )
  };

  return (
    <div className="grid h-14 w-14 place-items-center rounded-lg bg-castor-navy text-white transition group-hover:bg-castor-blue">
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icons[name]}
      </svg>
    </div>
  );
}

function HowWeWork() {
  return (
    <section className="bg-castor-fog py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-castor-blue">
            Process
          </p>
          <h2 className="text-4xl font-black tracking-tight text-castor-ink sm:text-5xl lg:text-6xl">
            How We Work
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {workSteps.map((step) => (
            <article key={step.number} className="rounded-lg bg-white p-8 shadow-[0_1px_0_rgba(10,37,64,0.08)]">
              <span className="text-sm font-black tracking-[0.24em] text-castor-blue">{step.number}</span>
              <h3 className="mt-10 text-3xl font-black tracking-tight text-castor-ink">{step.title}</h3>
              <p className="mt-5 text-base leading-7 text-neutral-600">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ navigate }) {
  return (
    <section className="bg-castor-ink px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Have a problem worth solving?
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-white/70">
          Tell us what is slowing your operations down and we will get back to you within 24 hours.
        </p>
        <LinkButton href="/contact" navigate={navigate} className="shrink-0">
          Get In Touch
        </LinkButton>
      </div>
    </section>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-32">
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-castor-blue">
              About Castor
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[1] tracking-tight text-castor-ink sm:text-6xl lg:text-7xl">
              Helping teams make practical use of AI
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">
              Castor is an AI consultancy that helps organisations make practical use of modern AI. We offer structured AI training sessions for employees - teaching your team the tools and techniques that make their daily work faster and more effective.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">
              Beyond training, we build custom software that replaces the manual work in your business - designed around your specific processes and built to actually fit the way your team works.
            </p>
          </div>
          <div className="relative min-h-80" aria-hidden="true">
            <div className="absolute inset-8 rounded-full border border-castor-line" />
            <div className="absolute left-8 top-8 h-44 w-44 rounded-lg bg-castor-navy" />
            <div className="absolute bottom-10 right-8 h-48 w-48 rounded-full border-[18px] border-castor-blue/90" />
            <div className="absolute left-28 top-44 h-28 w-72 -rotate-6 rounded-lg border border-castor-line bg-white shadow-soft" />
          </div>
        </div>
      </section>

      <section className="bg-castor-fog py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-castor-blue">Mission</p>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-castor-ink sm:text-5xl lg:text-6xl">
              Our mission is to make modern AI and automation accessible to every organization that needs it.
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <p className="max-w-2xl text-xl font-semibold leading-8 text-castor-ink">
            We help teams adopt AI with practical training, then build software only where it removes real manual work.
          </p>
          <LinkButton href="/contact" navigate={navigate} variant="dark">
            Start a Conversation
          </LinkButton>
        </div>
      </section>
    </>
  );
}

function ContactPage({ search = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState(() => {
    const requestedInterest = new URLSearchParams(search).get('interest');
    return requestedInterest === 'ai-training' ? 'AI Training' : 'General Inquiry';
  });

  useEffect(() => {
    const requestedInterest = new URLSearchParams(search).get('interest');
    if (requestedInterest === 'ai-training') {
      setInterest('AI Training');
    }
  }, [search]);

  const showTrainingFields = interest === 'AI Training' || interest === 'Both';
  const messageLabel =
    interest === 'AI Training'
      ? 'What should your team be able to do after the training?'
      : interest === 'Both'
        ? 'Tell Us About Your Training and Automation Needs'
        : 'Tell Us About Your Inquiry';

  return (
    <section className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-castor-blue">
            Contact
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[1] tracking-tight text-castor-ink sm:text-6xl lg:text-7xl">
            Let's talk about your goals
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl">
            Tell us what you are looking to improve, automate, or train your team on. We will review your message and respond within 24 hours.
          </p>
          <div className="mt-12 border-l-2 border-castor-blue pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Email</p>
            <a
              href="mailto:hello@castor.example"
              className="mt-3 inline-block text-xl font-bold text-castor-ink transition hover:text-castor-blue"
            >
              hello@castor.example
            </a>
          </div>
        </div>

        <form
          className="rounded-lg border border-castor-line bg-white p-6 shadow-soft sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full Name" name="name" autoComplete="name" />
            <Field label="Company Name" name="company" autoComplete="organization" />
          </div>
          <div className="mt-6">
            <Field label="Email Address" name="email" type="email" autoComplete="email" />
          </div>
          <div className="mt-6">
            <label htmlFor="interest" className="text-sm font-semibold text-castor-ink">
              What are you interested in?
            </label>
            <select
              id="interest"
              name="interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
              required
            >
              <option>AI Training</option>
              <option>Software & Automation</option>
              <option>Both</option>
              <option>General Inquiry</option>
            </select>
          </div>
          {showTrainingFields && (
            <>
              <div className="mt-6">
                <label htmlFor="training-type" className="text-sm font-semibold text-castor-ink">
                  What type of training are you looking for?
                </label>
                <select
                  id="training-type"
                  name="training-type"
                  className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
                  required
                >
                  <option>Introductory AI Training</option>
                  <option>Role-Specific AI Training</option>
                  <option>AI Tools for Productivity</option>
                  <option>AI Safety and Responsible Use</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <div className="mt-6">
                <label htmlFor="training-audience" className="text-sm font-semibold text-castor-ink">
                  Who is the training for?
                </label>
                <select
                  id="training-audience"
                  name="training-audience"
                  className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
                  required
                >
                  <option>Leadership / Management</option>
                  <option>Operations Team</option>
                  <option>Sales / Marketing</option>
                  <option>Admin / Documentation Team</option>
                  <option>Mixed Team</option>
                </select>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="experience-level" className="text-sm font-semibold text-castor-ink">
                    Current AI Experience Level
                  </label>
                  <select
                    id="experience-level"
                    name="experience-level"
                    className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
                    required
                  >
                    <option>New to AI</option>
                    <option>Some Employees Use AI Tools</option>
                    <option>Already Using AI Regularly</option>
                    <option>Not Sure</option>
                  </select>
                </div>
                <Field label="Approx. Number of Participants" name="participants" autoComplete="off" />
              </div>
              <div className="mt-6">
                <label htmlFor="training-format" className="text-sm font-semibold text-castor-ink">
                  Preferred Training Format
                </label>
                <select
                  id="training-format"
                  name="training-format"
                  className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
                  required
                >
                  <option>On-site Workshop</option>
                  <option>Remote Webinar</option>
                  <option>Hybrid</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
            </>
          )}
          <div className="mt-6">
            <label htmlFor="problem" className="text-sm font-semibold text-castor-ink">
              {messageLabel}
            </label>
            <textarea
              id="problem"
              name="problem"
              rows="7"
              className="mt-3 w-full resize-y rounded-lg border border-castor-line bg-white px-4 py-3 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-castor-blue px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1754D8] focus:outline-none focus:ring-4 focus:ring-castor-blue/20 sm:w-auto"
          >
            Send Message
          </button>
          {submitted && (
            <p className="mt-5 text-sm font-semibold text-castor-navy">
              Thanks. We will review your {interest.toLowerCase()} request and respond within 24 hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', autoComplete }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-castor-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-3 h-12 w-full rounded-lg border border-castor-line bg-white px-4 text-base outline-none transition focus:border-castor-blue focus:ring-4 focus:ring-castor-blue/10"
        required
      />
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="bg-castor-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-2xl font-black tracking-tight"
            >
              <LogoMark className="h-9 w-9" inverse />
              <span>Castor</span>
            </button>
            <p className="mt-4 max-w-md text-base leading-7 text-white/62">
              Built for businesses that mean it.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => navigate(item.href)}
                className="text-left text-sm font-medium text-white/70 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/12 pt-6 text-sm text-white/50 sm:flex-row">
          <a href="mailto:hello@castor.example" className="transition hover:text-white">
            hello@castor.example
          </a>
          <p>Castor. AI Training and Custom Software for Businesses.</p>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
