import { useState, FormEvent } from 'react';
import { 
  FileText, Layout, Settings, MessageSquare, Plus, Trash2, Edit2, CheckCircle2, 
  HelpCircle, Shuffle, Eye, ExternalLink, Save, RefreshCw, Layers, Sliders, ChevronDown, Sparkles
} from 'lucide-react';
import { Article, Block, SocialLink, SiteSettings, ContactSubmission } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  submissions: ContactSubmission[];
  setSubmissions: (submissions: ContactSubmission[]) => void;
  onClose: () => void;
}

export default function AdminPanel({
  articles,
  setArticles,
  blocks,
  setBlocks,
  siteSettings,
  setSiteSettings,
  submissions,
  setSubmissions,
  onClose,
}: AdminPanelProps) {
  // Sidebar tab management
  const [activeTab, setActiveTab] = useState<'content' | 'blocks' | 'settings' | 'submissions'>('content');

  // Form states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '',
    body: '',
    category: 'Announcement',
    image: '',
    status: 'published' as 'published' | 'draft',
    sticky: false,
  });

  // Settings State
  const [siteForm, setSiteForm] = useState({ ...siteSettings });

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Predefined gorgeous imagery options for form
  const sampleImages = [
    { name: 'Abstract Space Code', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
    { name: 'Computer & Design', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80' },
    { name: 'Developer Keyboard', url: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80' },
    { name: 'Office Learning Meetup', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  ];

  // Article Management handlers
  const handleSaveArticle = (e: FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.body.trim()) {
      alert('Node Title and Body must be populated.');
      return;
    }

    const imageUrl = articleForm.image || sampleImages[0].url;

    if (editingArticle) {
      // Editing
      const updated = articles.map(art => {
        if (art.id === editingArticle.id) {
          return {
            ...art,
            title: articleForm.title.trim(),
            body: articleForm.body.trim(),
            category: articleForm.category,
            image: imageUrl,
            status: articleForm.status,
            sticky: articleForm.sticky,
          };
        }
        return art;
      });
      setArticles(updated);
      showToast('Article node successfully updated into system queue.');
    } else {
      // Adding new article
      const newArt: Article = {
        id: `node-${Date.now()}`,
        title: articleForm.title.trim(),
        body: articleForm.body.trim(),
        category: articleForm.category,
        image: imageUrl,
        date: new Date().toISOString().split('T')[0],
        status: articleForm.status,
        sticky: articleForm.sticky,
      };
      setArticles([newArt, ...articles]);
      showToast('New Article Node published into Core Database.');
    }

    setEditingArticle(null);
    setIsAddingArticle(false);
    resetArticleForm();
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      body: article.body,
      category: article.category,
      image: article.image,
      status: article.status,
      sticky: article.sticky,
    });
    setIsAddingArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this Drupal node permanently?')) {
      setArticles(articles.filter(a => a.id !== id));
      showToast('Node removed successfully.');
    }
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      body: '',
      category: 'Announcement',
      image: '',
      status: 'published',
      sticky: false,
    });
  };

  // Block management weight reordering
  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    // Swap weights and index position
    const current = newBlocks[index];
    const target = newBlocks[targetIndex];

    const currentWeight = current.weight;
    current.weight = target.weight;
    target.weight = currentWeight;

    newBlocks[index] = target;
    newBlocks[targetIndex] = current;

    setBlocks(newBlocks);
    showToast(`Updated blocks layout weights in system stack.`);
  };

  const toggleBlockEnabled = (id: string) => {
    const updated = blocks.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b);
    setBlocks(updated);
    showToast('Block state toggled.');
  };

  // Submissions management
  const handleDeleteSubmission = (id: string) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    showToast('Inquiry Node deleted successfully.');
  };

  // General settings update
  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    setSiteSettings(siteForm);
    showToast('Global settings updated and cached.');
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen text-slate-800 font-sans flex flex-col md:flex-row relative">
      
      {/* Gin Admin Dark Left Menu Area */}
      <aside className="w-full md:w-64 bg-[#111115] text-slate-300 md:min-h-screen flex flex-col shrink-0">
        
        {/* Core Admin Brand Banner */}
        <div className="p-6 border-b border-neutral-800 bg-[#0d0d10] flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center font-black text-white text-md">
            💧
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-slate-100 tracking-tight leading-none">Administration</h2>
            <span className="text-[10px] font-mono text-slate-500">Gin UI • Core Engine v11</span>
          </div>
        </div>

        {/* Sidebar Tabs List */}
        <nav className="p-4 flex-1 flex flex-col gap-1.5" aria-label="Administrative modules">
          <button
            onClick={() => { setActiveTab('content'); setEditingArticle(null); setIsAddingArticle(false); }}
            className={`w-full text-left px-4 py-3 rounded text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'content'
                ? 'bg-sky-600/10 text-sky-400 border-l-4 border-sky-400'
                : 'hover:bg-neutral-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Content Nodes</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('blocks'); setEditingArticle(null); setIsAddingArticle(false); }}
            className={`w-full text-left px-4 py-3 rounded text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'blocks'
                ? 'bg-sky-600/10 text-sky-400 border-l-4 border-sky-400'
                : 'hover:bg-neutral-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Block Layout</span>
          </button>

          <button
            onClick={() => { setActiveTab('submissions'); setEditingArticle(null); setIsAddingArticle(false); }}
            className={`w-full text-left px-4 py-3 rounded text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors relative ${
              activeTab === 'submissions'
                ? 'bg-sky-600/10 text-sky-400 border-l-4 border-sky-400'
                : 'hover:bg-neutral-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiry Queue</span>
            {submissions.length > 0 && (
              <span className="absolute right-4 top-3 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setEditingArticle(null); setIsAddingArticle(false); }}
            className={`w-full text-left px-4 py-3 rounded text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors ${
              activeTab === 'settings'
                ? 'bg-sky-600/10 text-sky-400 border-l-4 border-sky-400'
                : 'hover:bg-neutral-800/50 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuration</span>
          </button>
        </nav>

        {/* Action Exit Bar */}
        <div className="p-4 border-t border-neutral-800 bg-[#0d0d10] space-y-2">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 rounded text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Front-End</span>
          </button>
          <div className="text-[10px] text-center text-slate-600 font-mono">
            SQLite Database Session Active
          </div>
        </div>

      </aside>

      {/* Main Panel Side */}
      <main className="flex-1 p-6 md:p-10 text-left overflow-y-auto max-h-screen">
        
        {/* Core Administrative Bar */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              {activeTab === 'content' && 'Content Node Directory'}
              {activeTab === 'blocks' && 'Block Layout Structure'}
              {activeTab === 'submissions' && 'Contact Form Inquiry Logs'}
              {activeTab === 'settings' && 'Global App Configuration'}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wide">
              {activeTab === 'content' && 'Manage core content, publish draft configurations, or insert taxonomy records.'}
              {activeTab === 'blocks' && 'Order blocks on homepage. Control visibility constraints dynamically.'}
              {activeTab === 'submissions' && 'Access submissions sent on Front-End Contact Node form.'}
              {activeTab === 'settings' && 'Change dynamic branding variables, site titles, slogans, and accent parameters.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded shadow-3xs">
              <RefreshCw className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
              <span>Auto-Caching Enabled</span>
            </span>
          </div>
        </header>

        {/* Global Action Notifications */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-emerald-900 text-emerald-100 text-xs px-4 py-3 rounded border border-emerald-800 flex items-center gap-2 font-mono shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT TAB VIEW */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            
            {/* Adding or Editing Mode Form Panel */}
            {isAddingArticle || editingArticle ? (
              <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 max-w-4xl shadow-xs">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h3 className="font-bold text-lg text-slate-900">
                    {editingArticle ? `Edit Custom Node: ${editingArticle.id}` : 'Create Article Node Document'}
                  </h3>
                  <button
                    onClick={() => { setIsAddingArticle(false); setEditingArticle(null); resetArticleForm(); }}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-bold"
                  >
                    Cancel Action
                  </button>
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-6">
                  <div className="grid md:grid-cols-12 gap-6">
                    
                    {/* Node Title */}
                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="w-full bg-slate-50 border p-2.5 rounded text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all font-sans"
                        placeholder="Enter attractive headlines..."
                      />
                    </div>

                    {/* Taxonomy Category */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Taxonomy Category</label>
                      <select
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="w-full bg-slate-50 border p-2.5 rounded text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all"
                      >
                        <option value="Announcement">Announcement</option>
                        <option value="Design">Design</option>
                        <option value="Community">Community</option>
                        <option value="Development">Development</option>
                      </select>
                    </div>

                    {/* Node Body */}
                    <div className="md:col-span-12 space-y-1">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Node Body Document *</label>
                      <textarea
                        required
                        rows={6}
                        value={articleForm.body}
                        onChange={(e) => setArticleForm({ ...articleForm, body: e.target.value })}
                        className="w-full bg-slate-50 border p-2.5 rounded text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all resize-y leading-relaxed font-sans"
                        placeholder="Enter beautiful comprehensive informative paragraphs..."
                      ></textarea>
                    </div>

                    {/* Core Visual Selector */}
                    <div className="md:col-span-12 space-y-2">
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Select Visual Cover Asset</label>
                      <div className="grid sm:grid-cols-4 gap-3">
                        {sampleImages.map((img) => (
                          <button
                            type="button"
                            key={img.url}
                            onClick={() => setArticleForm({ ...articleForm, image: img.url })}
                            className={`p-2 rounded text-left border relative overflow-hidden flex flex-col gap-2 group cursor-pointer transition-all ${
                              articleForm.image === img.url || (!articleForm.image && img === sampleImages[0])
                                ? 'border-sky-500 ring-2 ring-sky-100 bg-sky-50/50'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            <img src={img.url} alt="" className="w-full h-16 object-cover rounded" />
                            <span className="text-[10px] font-mono font-bold leading-tight line-clamp-1">{img.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Checkbox */}
                    <div className="md:col-span-6 flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="node_sticky_toggle"
                        checked={articleForm.sticky}
                        onChange={(e) => setArticleForm({ ...articleForm, sticky: e.target.checked })}
                        className="w-4 h-4 text-sky-600 rounded border-slate-300 cursor-pointer"
                      />
                      <label htmlFor="node_sticky_toggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Mark as <span className="text-sky-600 font-mono">Sticky Feature</span> (Promoted to top grid first)
                      </label>
                    </div>

                    {/* Publishing state */}
                    <div className="md:col-span-6 flex items-center gap-3 pt-2">
                      <label htmlFor="node_status_select" className="text-xs font-bold text-slate-700">Publishing Status:</label>
                      <select
                        id="node_status_select"
                        value={articleForm.status}
                        onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as 'published' | 'draft' })}
                        className="bg-slate-50 border p-1 md:p-1.5 text-xs rounded text-slate-800 outline-none"
                      >
                        <option value="published">Published (Visible on site)</option>
                        <option value="draft">Draft (Private admin preview)</option>
                      </select>
                    </div>

                  </div>

                  {/* Submit Actions */}
                  <div className="pt-4 border-t flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold tracking-wider uppercase rounded shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingArticle ? 'Update Article Node' : 'Publish Article Node'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIsAddingArticle(false); setEditingArticle(null); resetArticleForm(); }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded transition-colors cursor-pointer"
                    >
                      Dismiss Form
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              // Main Directory Node Explorer Table
              <div className="space-y-4">
                <div className="flex md:items-center justify-between flex-wrap gap-4">
                  <h3 className="font-bold text-slate-800 text-md">Registered Core Nodes ({articles.length})</h3>
                  <button
                    onClick={() => { resetArticleForm(); setIsAddingArticle(true); }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded text-xs font-bold text-white shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Article Node</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-mono text-slate-400 uppercase tracking-wider">
                          <th className="p-4 font-semibold">Title Record</th>
                          <th className="p-4 font-semibold">Taxonomy Category Key</th>
                          <th className="p-4 font-semibold">Indexed Date</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Promoted</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {articles.map((art) => (
                          <tr key={art.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-900 line-clamp-1">{art.title}</div>
                              <span className="text-[10px] text-slate-400 font-mono block">Node ID: {art.id}</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600 font-bold">
                                {art.category}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-slate-500">{art.date}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide ${
                                art.status === 'published' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {art.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              {art.sticky ? (
                                <span className="inline-flex items-center gap-0.5 font-bold text-sky-600 font-mono text-[10px] uppercase">
                                  ★ Yes
                                </span>
                              ) : (
                                <span className="text-slate-400 font-mono text-[10px]">No</span>
                              )}
                            </td>
                            <td className="p-4 text-right flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleEditClick(art)}
                                className="p-1 px-2 rounded bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors cursor-pointer text-[11px] font-semibold flex items-center gap-1"
                                title="Edit this node content details"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="p-1 px-2 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer text-[11px] font-semibold flex items-center gap-1"
                                title="Remove node permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* BLOCKS TAB VIEW */}
        {activeTab === 'blocks' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 mb-4 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 font-sans text-sm">Understanding Drupal Blocks Layout</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mt-1">
                  Drupals layout is broken into modular zones (Hero, Content, Footer regions). You can order and re-weight blocks below using weight controllers. The visual presentation order of your Live Front-End updates instantly based on this stack priority.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-mono text-slate-500 text-xs font-semibold">
                ACTIVE THEME LAYER STRUCTS
              </div>
              
              <ul className="divide-y divide-slate-100 text-xs">
                {blocks.map((block, index) => (
                  <li key={block.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-slate-100 rounded text-slate-500">
                        <Layout className="w-4 h-4" />
                      </div>
                      <div className="text-left space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{block.title}</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-bold">
                            region: {block.region}
                          </span>
                        </div>
                        <p className="text-slate-500 max-w-xl text-[11px] leading-relaxed">
                          {block.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      {/* Weights reordering controllers */}
                      <div className="flex items-center bg-slate-100 rounded border">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveBlock(index, 'up')}
                          className="px-2 py-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all cursor-pointer font-bold border-r"
                          title="Increase Priority weight (Move Up)"
                        >
                          ▲
                        </button>
                        <span className="px-3 py-1 bg-white font-mono text-xs text-slate-600 font-bold">
                          wt: {block.weight}
                        </span>
                        <button
                          disabled={index === blocks.length - 1}
                          onClick={() => handleMoveBlock(index, 'down')}
                          className="px-2 py-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-all cursor-pointer font-bold border-l"
                          title="Decrease Priority weight (Move Down)"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Enabled block checkbox switcher */}
                      <button
                        onClick={() => toggleBlockEnabled(block.id)}
                        className={`px-3 py-1.5 rounded font-sans font-semibold transition-all cursor-pointer ${
                          block.enabled
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-150 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {block.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SUBMISSIONS TAB VIEW */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {submissions.length > 0 ? (
              <div className="grid gap-6">
                {submissions.map((sub) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={sub.id}
                    className="bg-white rounded-lg border border-slate-200 shadow-3xs p-6 md:p-8 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Submission Header info */}
                      <div className="flex items-start justify-between flex-wrap gap-2 border-b pb-3 border-slate-100">
                        <div className="text-left">
                          <span className="font-mono text-[10px] text-slate-400 block uppercase">SUBMITTER CARD</span>
                          <span className="font-bold text-slate-900 text-sm leading-tight">{sub.name}</span>
                          <span className="text-slate-500 font-mono text-[11px] block">{sub.email}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[10px] font-bold text-slate-400 block">SUBMITTED ON</span>
                          <time className="font-mono font-bold text-slate-600 text-xs">{sub.date}</time>
                        </div>
                      </div>

                      {/* Submission Details */}
                      <div className="space-y-1 flex-1">
                        <div className="text-xs font-bold text-slate-400 font-mono uppercase">Subject:</div>
                        <h4 className="text-slate-800 font-bold text-sm leading-snug">{sub.subject}</h4>
                        <div className="pt-2">
                          <div className="text-xs font-bold text-slate-400 font-mono uppercase pb-0.5">Inquiry body message:</div>
                          <p className="font-light text-slate-600 rounded bg-slate-50 p-4 border border-slate-100 text-xs leading-relaxed font-sans whitespace-pre-wrap">
                            {sub.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Delete inquiry */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-neutral-400">Node ID: {sub.id}</span>
                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="px-3.5 py-1.5 rounded hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition-colors font-sans text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Submission Node</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg border border-slate-200/80 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">No Submission Nodes Preserved</h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm font-sans">
                    Any contact dispatches routed from the Front-End interactive form will instantly queue up on this screen. Go to the front-end to trigger the dispatcher.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB VIEW */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-xs text-left">
              <h3 className="font-bold text-slate-900 border-b pb-3 mb-6 font-sans text-lg">App Core Appearance Settings</h3>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* Site Name and Slogan */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Site Brand Name</label>
                    <input
                      type="text"
                      required
                      value={siteForm.siteName}
                      onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                      className="w-full bg-slate-50 border p-2.5 rounded text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all font-sans font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Site Theme Slogan</label>
                    <input
                      type="text"
                      required
                      value={siteForm.siteSlogan}
                      onChange={(e) => setSiteForm({ ...siteForm, siteSlogan: e.target.value })}
                      className="w-full bg-slate-50 border p-2.5 rounded text-sm text-slate-800 outline-none focus:border-sky-500 focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Theme Colors */}
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Primary Drupal Blue Color Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Primary Color Preset</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Drupal Royal', hex: '#0066cc' },
                        { name: 'Emerging Teal', hex: '#008080' },
                        { name: 'Warm Amber', hex: '#d97706' },
                        { name: 'Drupal Charcoal', hex: '#334155' },
                        { name: 'Forest Green', hex: '#16a34a' }
                      ].map((col) => (
                        <button
                          type="button"
                          key={col.hex}
                          onClick={() => setSiteForm({ ...siteForm, primaryColor: col.hex })}
                          className={`px-3 py-1.5 rounded text-[11px] font-mono cursor-pointer transition-all border flex items-center gap-1.5 font-bold ${
                            siteForm.primaryColor === col.hex
                              ? 'bg-neutral-900 border-neutral-950 text-white'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: col.hex }} />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase">Accent UI Color</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Sky Light', hex: '#1dcdfe' },
                        { name: 'Emerald Light', hex: '#10b981' },
                        { name: 'Rose Petal', hex: '#f43f5e' },
                        { name: 'Solar Glow', hex: '#f59e0b' }
                      ].map((col) => (
                        <button
                          type="button"
                          key={col.hex}
                          onClick={() => setSiteForm({ ...siteForm, accentColor: col.hex })}
                          className={`px-3 py-1.5 rounded text-[11px] font-mono cursor-pointer transition-all border flex items-center gap-1.5 font-bold ${
                            siteForm.accentColor === col.hex
                              ? 'bg-neutral-900 border-neutral-950 text-white'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: col.hex }} />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Preset Information */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded text-[11px] leading-relaxed text-slate-500 font-sans flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pro tip:</strong> Changes made under configuration modify general state parameters instantly. When you switch back to the Front-End, the theme color branding, titles, and layout configurations render with pixel completeness.
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t flex gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Drupal Config</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSiteForm({ ...siteSettings })}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded transition-colors cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
