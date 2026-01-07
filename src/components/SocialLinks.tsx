import { Linkedin, Mail, Github } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://www.linkedin.com/in/babjikilaru"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="mailto:hello@babjikilaru.com"
        className="social-icon"
        aria-label="Email"
      >
        <Mail className="w-5 h-5" />
      </a>
      <a
        href="https://github.com/babjikilaru"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </a>
    </div>
  );
};

export default SocialLinks;
