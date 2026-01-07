import { useEffect, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 300);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative" aria-live="polite">
        <div className={`w-12 h-12 rounded-full border-2 border-border ${prefersReducedMotion ? '' : 'animate-pulse'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-foreground rounded-full" />
      </div>
    </div>
  );
};

export default LoadingScreen;
