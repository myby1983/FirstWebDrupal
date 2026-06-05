import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactSubmission } from '../types';

interface ContactFormProps {
  key?: string;
  onAddSubmission: (submission: ContactSubmission) => void;
  themeColor: string;
}

export default function ContactForm({ onAddSubmission, themeColor }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side simple validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg('Please populate all required form fields before sending.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMsg('Please input a valid email address format.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database node saving delay
    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        id: `submission-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        date: new Date().toISOString().split('T')[0],
      };

      onAddSubmission(newSubmission);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 bg-white" aria-labelledby="contact_title">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-100">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">DRUPAL SUPPORT QUEUE</span>
              <h2 id="contact_title" className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
                Get in Touch
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans font-light">
                Have inquiries regarding Drupal core modules, need site-builder training, or looking to sponsor DrupalCon Asia? Send a direct dispatch to our global support queue.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs animate-none"
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Headquarters</h3>
                  <p className="text-sm font-sans font-semibold text-slate-800">Drupal Association HQ</p>
                  <p className="text-xs font-sans text-neutral-500">Portland, Oregon, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs animate-none"
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Direct Email</h3>
                  <a href="mailto:support@association.drupal.org" className="text-sm font-sans font-semibold text-slate-800 hover:underline">
                    association@drupal.org
                  </a>
                  <p className="text-xs font-sans text-neutral-500">Response time within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs animate-none"
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Public hotline</h3>
                  <p className="text-sm font-sans font-semibold text-slate-800">+1 (503) 123-4567</p>
                  <p className="text-xs font-sans text-neutral-500">Weekdays 09:00 - 17:00 PST</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 leading-tight text-xs text-neutral-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>We never share contacts. Encrypted transmission.</span>
            </div>
          </div>

          {/* Right Column Actual Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xl border border-slate-100 shadow-xl">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-neutral-900 font-sans">Submission Received Successfully!</h3>
                  <p className="text-sm text-neutral-600 max-w-sm">
                    Thank you, your support ticket has been compiled as a <strong>Contact Node</strong> inside Drupals submission log.
                  </p>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 p-4 rounded-lg text-xs font-mono text-neutral-500 uppercase">
                  TICKET STATUS: QUEUED FOR ADMIN AUDIT
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-sans font-bold hover:bg-neutral-100 rounded text-neutral-700 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-md flex items-start gap-2.5 font-sans" role="alert">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form_name" className="block text-xs font-mono font-bold text-neutral-600 uppercase">
                      Full Name <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="form_name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full bg-white text-sm text-neutral-800 placeholder-neutral-400 px-4 py-2.5 rounded border border-neutral-200 outline-hidden focus:ring-2 focus:ring-sky-100 placeholder:text-xs transition-all font-sans"
                      style={{ focusBorderColor: themeColor } as any}
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form_email" className="block text-xs font-mono font-bold text-neutral-600 uppercase">
                      Email address <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="form_email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full bg-white text-sm text-neutral-800 placeholder-neutral-400 px-4 py-2.5 rounded border border-neutral-200 outline-hidden focus:ring-2 focus:ring-sky-100 placeholder:text-xs transition-all font-sans"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form_subject" className="block text-xs font-mono font-bold text-neutral-600 uppercase">
                    Subject <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="form_subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full bg-white text-sm text-neutral-800 placeholder-neutral-400 px-4 py-2.5 rounded border border-neutral-200 outline-hidden focus:ring-2 focus:ring-sky-100 placeholder:text-xs transition-all font-sans"
                    placeholder="Inquiry for community partnership"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form_message" className="block text-xs font-mono font-bold text-neutral-600 uppercase">
                    Message body <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="form_message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full bg-white text-sm text-neutral-800 placeholder-neutral-400 px-4 py-2.5 rounded border border-neutral-200 outline-hidden focus:ring-2 focus:ring-sky-100 placeholder:text-xs transition-all font-sans resize-y"
                    placeholder="Write detailed request parameters here..."
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-3 font-sans font-bold text-sm text-white tracking-wide rounded cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm uppercase active:scale-98 disabled:opacity-50"
                  style={{ backgroundColor: themeColor }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                      <span>Dispatching Node...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Contact Node</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
