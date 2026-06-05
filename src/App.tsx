import { useState, useEffect } from 'react';
import { Article, Block, SocialLink, SiteSettings, ContactSubmission } from './types';
import { 
  INITIAL_ARTICLES, INITIAL_BLOCKS, INITIAL_SOCIAL_LINKS, INITIAL_SETTINGS 
} from './data';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import NewsFeed from './components/NewsFeed';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Sliders, HelpCircle, Eye, ArrowUp, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation Tracking State
  const [activeSection, setActiveSection] = useState('hero');

  // Core CMS Persistence States
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('drupal_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [blocks, setBlocks] = useState<Block[]>(() => {
    const saved = localStorage.getItem('drupal_blocks');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('drupal_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('drupal_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Write changes to cache
  useEffect(() => {
    localStorage.setItem('drupal_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('drupal_blocks', JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem('drupal_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('drupal_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Back-To-Top float action switcher
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Section Spy logic
      const sections = ['hero', 'news', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dispatch custom contact submissions
  const handleAddSubmission = (newSubmission: ContactSubmission) => {
    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Determine sorted order & visibility of homepage blocks
  const activeFrontBlocks = [...blocks]
    .filter((b) => b.enabled && b.id !== 'block-social') // block-social serves as visibility toggle inside Footer
    .sort((a, b) => a.weight - b.weight);

  const showSocialLinks = blocks.find((b) => b.id === 'block-social')?.enabled ?? true;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Navigation Overlay */}
      <Navigation
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        siteName={siteSettings.siteName}
        themeColor={siteSettings.primaryColor}
      />

      <AnimatePresence mode="wait">
        {isAdmin ? (
          <motion.div
            key="admin-panel-portal"
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.2 }}
            className="flex-1 w-full"
          >
            <AdminPanel
              articles={articles}
              setArticles={setArticles}
              blocks={blocks}
              setBlocks={setBlocks}
              siteSettings={siteSettings}
              setSiteSettings={setSiteSettings}
              submissions={submissions}
              setSubmissions={setSubmissions}
              onClose={() => setIsAdmin(false)}
            />
          </motion.div>
        ) : (
          <motion.main
            key="front-end-website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col w-full"
          >
            {/* Informational Global System Status Notice Box */}
            <div className="bg-slate-50 border-b border-slate-100/80 py-3.5 px-6 text-center text-xs font-sans text-slate-600 flex items-center justify-center gap-2 flex-wrap shadow-xs">
              <span className="font-semibold flex items-center gap-1 text-slate-700">
                <Compass className="w-3.5 h-3.5 text-slate-505" />
                <span>EXPERIENCE DRUPAL WORKSPACE:</span>
              </span>
              <span>Reorder content, toggle blocks, manage articles, and view contact submissions via the</span>
              <button 
                onClick={() => setIsAdmin(true)} 
                className="font-mono bg-slate-200/60 hover:bg-slate-200 text-slate-850 font-bold px-2 py-0.5 rounded cursor-pointer transition-colors"
                aria-label="Launch administrator control panel"
              >
                Drupal Admin Panel
              </button>
            </div>

            {/* WEIGHT SORTED STATIC AND DYNAMIC BLOCK RENDERING ZONE */}
            <div className="flex-1 flex flex-col">
              {activeFrontBlocks.map((block) => {
                switch (block.id) {
                  case 'block-hero':
                    return (
                      <Hero
                        key={block.id}
                        siteName={siteSettings.siteName}
                        siteSlogan={siteSettings.siteSlogan}
                        primaryColor={siteSettings.primaryColor}
                        accentColor={siteSettings.accentColor}
                        onCtaClick={() => handleScrollToSection('news')}
                      />
                    );
                  
                  case 'block-news':
                    return (
                      <NewsFeed
                        key={block.id}
                        articles={articles}
                      />
                    );

                  case 'block-contact':
                    return (
                      <ContactForm
                        key={block.id}
                        onAddSubmission={handleAddSubmission}
                        themeColor={siteSettings.primaryColor}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </div>

            {/* Accessible Footer with dynamic social handles */}
            <Footer
              socialLinks={showSocialLinks ? INITIAL_SOCIAL_LINKS : []} // show empty social if disabled in block layout
              siteName={siteSettings.siteName}
              siteSlogan={siteSettings.siteSlogan}
              themeColor={siteSettings.primaryColor}
            />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Accessible Floating Quick Utilities */}
      <AnimatePresence>
        {showBackToTop && !isAdmin && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5"
          >
            {/* Quick Switch Admin Floating button */}
            <button
              onClick={() => setIsAdmin(true)}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-sky-400 rounded-full shadow-lg block cursor-pointer select-none transition-transform focus:outline-2 focus:ring-sky-500"
              title="Launch administration panel"
              aria-label="Launch administration console panel"
            >
              <Sliders className="w-5 h-5 text-sky-400" />
            </button>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-white hover:bg-neutral-50 text-neutral-800 rounded-full border shadow-lg cursor-pointer select-none transition-transform focus:outline-2 focus:ring-sky-500"
              title="Back to Top"
              aria-label="Scroll back to top of the page"
            >
              <ArrowUp className="w-5 h-5 text-neutral-800" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
