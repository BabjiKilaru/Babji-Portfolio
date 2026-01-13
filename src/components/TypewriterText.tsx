import { useState, useEffect } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const roles = [
  'Full Stack Software Engineer',
  'Java/Spring Boot Developer',
  'React & Angular Engineer',
  'Cloud & Backend Developer',
  'API & Microservices Builder',
];

const TypewriterText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(roles[0]);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRole = roles[currentIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = isDeleting ? 100 : 2000;

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, prefersReducedMotion]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      {!prefersReducedMotion && <span className="ml-1 w-0.5 h-6 bg-foreground animate-pulse" />}
    </span>
  );
};

export default TypewriterText;
