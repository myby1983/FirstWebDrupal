import { Twitter, Facebook, Github, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { SocialLink } from '../types';

interface FooterProps {
  socialLinks: SocialLink[];
  siteName: string;
  siteSlogan: string;
  themeColor: string;
}

export default function Footer({ socialLinks, siteName, siteSlogan, themeColor }: FooterProps) {
  
  // Icon picker helper
  const renderSocialIcon = (platform: string) => {
    const pClass = "w-5 h-5";
    switch (platform) {
      case 'Twitter':
        return <Twitter className={pClass} />;
      case 'Facebook':
        return <Facebook className={pClass} />;
      case 'LinkedIn':
        return <Linkedin className={pClass} />;
      case 'GitHub':
        return <Github className={pClass} />;
      case 'YouTube':
        return <Youtube className={pClass} />;
      default:
        return <ExternalLink className={pClass} />;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Main Info */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">💧</span>
              <span className="font-bold text-lg tracking-tight text-white font-sans">{siteName}</span>
            </div>
            <p className="text-sm font-sans font-light text-slate-400 max-w-sm leading-relaxed">
              {siteSlogan}
            </p>
            <div className="text-xs font-mono text-slate-500">
              Powered by <a href="https://drupal.org" target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-400">Drupal Core Open Web Engine</a>
            </div>
          </div>

          {/* Social Links Block */}
          <div className="md:col-span-4 text-left space-y-4" id="block-social">
            <h3 className="text-[10px] font-mono font-bold uppercase text-slate-450 tracking-wider">Social Media Handles</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group w-fit"
                  aria-label={`${social.platform} link for ${social.handle}`}
                >
                  <span className="p-1.5 rounded bg-slate-900 text-slate-400 group-hover:bg-slate-800 transition-colors">
                    {renderSocialIcon(social.platform)}
                  </span>
                  <div>
                    <span className="font-sans font-medium text-xs block text-slate-300">{social.platform}</span>
                    <span className="font-mono text-[10px] text-slate-500">{social.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Core Resources Link Grid */}
          <div className="md:col-span-3 text-left space-y-4">
            <h3 className="text-[10px] font-mono font-bold uppercase text-slate-450 tracking-wider">Useful Resources</h3>
            <ul className="text-xs font-sans text-slate-400 space-y-2.5" aria-label="Reference resources links">
              <li>
                <a href="https://www.drupal.org/association" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline flex items-center gap-1">
                  <span>Drupal Association</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.drupal.org/community" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline flex items-center gap-1">
                  <span>Developer Community</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://git.drupalcode.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline flex items-center gap-1">
                  <span>Drupal GitLab Repos</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.drupal.org/security" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline flex items-center gap-1">
                  <span>Security Advisories</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-550">
          <p>© 2026 {siteName}. All Drupal core nodes preserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Accessibility Statement</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
