import { useState, useMemo } from 'react';
import { Search, Hash, Star, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { Article } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NewsFeedProps {
  key?: string;
  articles: Article[];
}

export default function NewsFeed({ articles }: NewsFeedProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter categories gathered from actual articles
  const categories = useMemo(() => {
    const cats = new Set(articles.filter(a => a.status === 'published').map(a => a.category));
    return ['All', ...Array.from(cats)];
  }, [articles]);

  // Dynamic filter lists
  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        // Only show published in the outer feed
        if (article.status !== 'published') return false;

        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.body.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory =
          selectedCategory === 'All' || article.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      // Sort sticky posts first, then by date descending
      .sort((a, b) => {
        if (a.sticky && !b.sticky) return -1;
        if (!a.sticky && b.sticky) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <section id="news" className="py-16 bg-stone-50 border-b border-neutral-100" aria-label="Latest news feed">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="text-left space-y-2">
            <span className="text-xs font-mono text-sky-600 uppercase tracking-widest font-bold">DRUPAL TAXONOMY: NEWS</span>
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Latest News Feed</h2>
            <p className="text-sm text-neutral-600 max-w-xl">
              Stay updated with system updates, announcements, architectural reviews, and community developments.
            </p>
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <label htmlFor="news_search" className="sr-only">Search articles</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="news_search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-sm text-neutral-800 placeholder-neutral-400 pl-9 pr-4 py-2.5 rounded-md border border-neutral-200 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-sans"
              placeholder="Search news records..."
            />
          </div>
        </div>

        {/* Categories / Taxonomy Filtering */}
        <div className="flex flex-wrap items-center gap-2 mb-8" aria-label="Filter news by categories">
          <span className="text-xs font-mono font-bold text-neutral-400 mr-2 uppercase">Tags:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
              aria-pressed={selectedCategory === cat}
            >
              #{cat}
            </button>
          ))}
        </div>

        {/* Articles layout grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8" id="articles_container">
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={article.id}
                  className={`bg-white rounded-lg border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                    article.sticky 
                      ? 'border-sky-500 ring-2 ring-sky-500/10' 
                      : 'border-neutral-200/80'
                  }`}
                  aria-labelledby={`article-title-${article.id}`}
                >
                  <div className="relative">
                    {/* Visual Card Image */}
                    <div className="h-56 bg-neutral-100 overflow-hidden relative">
                      <img
                        src={article.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/40 via-transparent to-transparent"></div>
                      
                      {/* Tag badges */}
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900/90 backdrop-blur-xs text-[10px] font-mono tracking-widest text-white">
                        <Hash className="w-3 h-3 text-sky-400" />
                        {article.category.toUpperCase()}
                      </span>

                      {article.sticky && (
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-600 text-white text-[10px] uppercase font-mono font-extrabold shadow-sm animate-pulse">
                          <Star className="w-3 h-3 fill-current" />
                          <span>STICKY FEATURE</span>
                        </span>
                      )}
                    </div>

                    <div className="p-6 md:p-8 space-y-3">
                      {/* Meta info block */}
                      <time className="block text-xs font-mono text-neutral-400" dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>

                      {/* Heading */}
                      <h3
                        id={`article-title-${article.id}`}
                        className="text-xl md:text-2xl font-black text-neutral-900 leading-snug group-hover:text-sky-700 transition-colors"
                      >
                        {article.title}
                      </h3>

                      {/* Content Body snippet */}
                      <p className="text-sm text-neutral-600 line-clamp-4 leading-relaxed font-sans font-light">
                        {article.body}
                      </p>
                    </div>
                  </div>

                  {/* Drupal Read More Node Actions */}
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <button 
                      className="text-xs font-mono font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-1 hover:underline cursor-pointer focus:ring-2 focus:ring-sky-500 rounded p-1"
                      aria-label={`Read full article: ${article.title}`}
                    >
                      <span>Read Node Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] text-neutral-400 font-mono">ID: {article.id}</span>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-white p-12 rounded-lg border border-neutral-200/80 text-center flex flex-col items-center gap-4 shadow-3xs"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-neutral-800">No Articles Found</h4>
                  <p className="text-sm text-neutral-500 mt-1 max-w-md">
                    No nodes match your search & category filters. Create or publish news articles from the Drupal administrative dashboard!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
