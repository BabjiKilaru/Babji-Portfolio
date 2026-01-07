import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type AboutItem = {
  id: string;
  label: string;
  helper?: string;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string>('about');
  const [highlightStyle, setHighlightStyle] = useState<{ height: number; top: number; opacity: number }>({
    height: 0,
    top: 0,
    opacity: 0,
  });
  const [activeTarget, setActiveTarget] = useState<string>('main-content');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);
  const aboutButtonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const currentHash = window.location.hash.replace('#', '');
      setActiveTarget(currentHash || 'main-content');
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const aboutItems: AboutItem[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
  ];

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    } else {
      window.location.hash = targetId;
    }
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setActiveTarget(targetId);
    scrollToSection(targetId);
  };

  const updateHighlight = (id: string) => {
    const menu = aboutMenuRef.current;
    const item = itemRefs.current[id];

    if (!menu || !item) return;

    const menuRect = menu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setHighlightStyle({
      height: itemRect.height,
      top: itemRect.top - menuRect.top + menu.scrollTop,
      opacity: 1,
    });
  };

  useEffect(() => {
    if (!aboutOpen) {
      setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const active = hoveredItem || aboutItems[0].id;
    requestAnimationFrame(() => updateHighlight(active));
  }, [aboutOpen, hoveredItem]);

  useEffect(() => {
    const handleResize = () => {
      if (aboutOpen) {
        updateHighlight(hoveredItem || aboutItems[0].id);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [aboutOpen, hoveredItem]);

  const handleSelect = (id: string) => {
    setActiveTarget(id);
    scrollToSection(id);
    setAboutOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const focusItemAt = (index: number) => {
    const safeIndex = (index + aboutItems.length) % aboutItems.length;
    const target = aboutItems[safeIndex];
    const node = itemRefs.current[target.id];

    if (node) {
      node.focus();
      setHoveredItem(target.id);
      updateHighlight(target.id);
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number, id: string) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItemAt(index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItemAt(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItemAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItemAt(aboutItems.length - 1);
    } else if (event.key === 'Escape') {
      setAboutOpen(false);
      aboutButtonRef.current?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(id);
    }
  };

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-5 md:px-6"
    >
      <div className={`header-elevated ${isScrolled ? 'header-elevated-scrolled' : ''} w-full max-w-5xl rounded-2xl`}>
        <div className="flex items-center justify-between h-[76px] px-4 sm:px-5 lg:px-6">
          {/* Logo */}
          <a
            href="#main-content"
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm hover:scale-105 transition-transform duration-200"
            aria-label="Skip to main content"
            onClick={(event) => handleNavClick(event, 'main-content')}
          >
            BK
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Primary">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
              onFocus={() => setAboutOpen(true)}
              onTouchStart={() => setAboutOpen((prev) => !prev)}
              onBlur={(event) => {
                const nextFocus = event.relatedTarget as Node | null;
                if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
                  setAboutOpen(false);
                }
              }}
            >
              <button
                ref={aboutButtonRef}
                className={`nav-link flex items-center gap-1 focus-visible:outline-none focus-visible:text-foreground ${
                  aboutItems.some((item) => item.id === activeTarget) ? 'nav-link-active' : ''
                }`}
                aria-haspopup="menu"
                aria-expanded={aboutOpen}
                aria-controls="about-menu"
                aria-current={aboutItems.some((item) => item.id === activeTarget) ? 'page' : undefined}
                onClick={() => {
                  setAboutOpen((prev) => !prev);
                  requestAnimationFrame(() => updateHighlight(hoveredItem || aboutItems[0].id));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setAboutOpen(true);
                    requestAnimationFrame(() => {
                      const first = aboutItems[0]?.id;
                      if (first) {
                        itemRefs.current[first]?.focus();
                        setHoveredItem(first);
                        updateHighlight(first);
                      }
                    });
                  }
                }}
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutOpen && (
                <div className="absolute top-full left-0 pt-3">
                  <div
                    ref={aboutMenuRef}
                    id="about-menu"
                    className={`interactive-dropdown ${prefersReducedMotion ? '' : 'animate-slide-down'}`}
                    role="menu"
                    aria-label="About sections"
                  >
                    <div
                      className="interactive-highlight"
                      style={{
                        height: highlightStyle.height,
                        transform: `translateY(${highlightStyle.top}px)`,
                        opacity: highlightStyle.opacity,
                      }}
                      aria-hidden
                    />

                    {aboutItems.map((item, index) => (
                      <button
                        key={item.id}
                        ref={(node) => {
                          itemRefs.current[item.id] = node;
                        }}
                        type="button"
                        role="menuitem"
                        tabIndex={-1}
                        className={`interactive-item ${hoveredItem === item.id ? 'text-foreground' : 'text-muted-foreground'}`}
                        aria-current={activeTarget === item.id ? 'page' : undefined}
                        onMouseEnter={() => {
                          setHoveredItem(item.id);
                          updateHighlight(item.id);
                        }}
                        onFocus={() => {
                          setHoveredItem(item.id);
                          updateHighlight(item.id);
                        }}
                        onClick={() => handleSelect(item.id)}
                        onKeyDown={(event) => handleItemKeyDown(event, index, item.id)}
                      >
                        <span className="flex items-center gap-3 w-full">
                          <span className="flex-1">{item.label}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#projects"
              className={`nav-link ${activeTarget === 'projects' ? 'nav-link-active' : ''}`}
              aria-current={activeTarget === 'projects' ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, 'projects')}
            >
              Projects
            </a>
            <a
              href="#resume"
              className={`nav-link ${activeTarget === 'resume' ? 'nav-link-active' : ''}`}
              aria-current={activeTarget === 'resume' ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, 'resume')}
            >
              Resume
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeTarget === 'contact' ? 'nav-link-active' : ''}`}
              aria-current={activeTarget === 'contact' ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, 'contact')}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden w-full max-w-5xl rounded-2xl bg-card border border-border mt-2 ${prefersReducedMotion ? '' : 'animate-slide-down'}`}
          id="mobile-menu"
        >
          <nav className="px-6 py-6 flex flex-col gap-4" role="navigation" aria-label="Mobile">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">About</p>
              {aboutItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full text-left pl-4 py-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:text-foreground"
                  aria-current={activeTarget === item.id ? 'page' : undefined}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <a
              href="#projects"
              className="py-2 text-foreground font-medium"
              aria-current={activeTarget === 'projects' ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleSelect('projects');
              }}
            >
              Projects
            </a>
            <a
              href="#resume"
              className="py-2 text-foreground font-medium"
              aria-current={activeTarget === 'resume' ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleSelect('resume');
              }}
            >
              Resume
            </a>
            <a
              href="#contact"
              className="py-2 text-foreground font-medium"
              aria-current={activeTarget === 'contact' ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleSelect('contact');
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
