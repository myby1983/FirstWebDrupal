import { useState } from 'react';
import { Menu, X, Landmark, Compass, Key, LayoutGrid, Eye, UserCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  siteName: string;
  themeColor: string;
}

export default function Navigation({
  isAdmin,
  setIsAdmin,
  activeSection,
  setActiveSection,
  siteName,
  themeColor,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'news', label: 'Latest News' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    // Scroll smoothly to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="relative z-50 w-full" id="navigation_header">
      {/* Drupal Admin Top Toolbar - Sleek Dark Slate Flat Bar */}
      <div className="bg-slate-950 border-b border-slate-900 text-slate-400 text-[11px] px-6 py-2.5 font-mono flex items-center justify-between shadow-xs flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sky-400 font-extrabold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            DRUPAL 11 SYSTEM API
          </div>
          <span className="text-slate-800">|</span>
          <div className="flex items-center gap-2 text-slate-400">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Admin Control Panel (Active)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="admin_mode_toggle"
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded text-[10px] tracking-wider uppercase transition-all font-semibold cursor-pointer`}
            aria-label={isAdmin ? "Switch to Live Website view" : "Switch to Drupal Administration dashboard"}
          >
            {isAdmin ? (
              <>
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>FRONT-END VIEW</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
                <span>MANAGE WORKSPACE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Minimal Olivero Navigation Bar */}
      <div className="bg-white border-b border-slate-100/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="flex items-center gap-2.5 cursor-pointer focus:outline-none rounded group text-left"
              style={{ color: themeColor }}
              id="cms_brand_logo"
              aria-label={`${siteName} home page`}
            >
              <div 
                className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center text-white font-black text-sm shadow-xs transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: themeColor, borderRadius: '4px' }}
              >
                💧
              </div>
              <div>
                <span className="block font-sans font-bold text-base text-slate-900 tracking-tight leading-none group-hover:text-sky-600 transition-colors">
                  {siteName}
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 block">Olivero minimalist</span>
              </div>
            </button>
          </div>

          {/* Accessibility-Friendly Desktop Navigation Menu */}
          <nav className="hidden md:block" aria-label="Main navigation menu">
            <ul className="flex items-center gap-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      activeSection === item.id
                        ? 'text-slate-900 bg-slate-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsAdmin(true)}
                  className="ml-4 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-850 text-[10px] font-mono tracking-wider uppercase font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  aria-label="Access administration console"
                >
                  <Key className="w-3 h-3 text-slate-600" />
                  ADMIN PANEL
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Action Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded hover:bg-slate-50 text-slate-600 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile_navigation_dropdown"
              aria-label={mobileMenuOpen ? 'Close navigation directory' : 'Open navigation directory'}
              id="mobile_menu_trigger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Context Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile_navigation_dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-xl font-sans absolute top-full left-0 w-full overflow-hidden"
          >
            <nav className="p-4 flex flex-col gap-1" aria-label="Mobile navigation directory">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                    activeSection === item.id
                      ? 'bg-slate-50 text-slate-950 font-bold border-l-2'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  style={{ borderLeftColor: activeSection === item.id ? themeColor : 'transparent' }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-450" />
                </button>
              ))}
              <div className="border-t border-slate-100 my-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdmin(true);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-sky-600 hover:bg-sky-50/50 font-mono flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>Drupal admin panel</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
