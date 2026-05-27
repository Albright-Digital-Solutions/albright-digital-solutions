import { useState } from 'react';
import { MessageSquare, X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      setSubmitStatus('success');
      setStatusMessage('Message sent! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-pureblack border border-brand text-brand flex items-center justify-center hover:scale-110 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open contact form"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </button>

      {/* Floating Panel */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-3rem)] sm:w-[400px] max-h-[calc(100vh-6rem)] overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand to-brand/80 p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 text-pureblack">
            <MessageSquare className="w-5 h-5 fill-current" />
            <h3 className="font-heading uppercase tracking-widest text-lg m-0 leading-none">Message Us</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-pureblack/70 hover:text-pureblack transition-colors rounded-full p-1 hover:bg-black/10"
            aria-label="Close contact form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="float-name" className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Name</label>
              <input 
                type="text" 
                id="float-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand focus:bg-white/10 transition-all rounded-md"
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="float-email" className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Email</label>
                <input 
                  type="email" 
                  id="float-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand focus:bg-white/10 transition-all rounded-md"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="float-phone" className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Phone</label>
                <input 
                  type="tel" 
                  id="float-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand focus:bg-white/10 transition-all rounded-md"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="float-service" className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Interested In</label>
              <div className="relative">
                <select 
                  id="float-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand focus:bg-white/10 transition-all rounded-md appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service...</option>
                  {servicesData.map((service, idx) => (
                    <option key={idx} value={service.title}>{service.title}</option>
                  ))}
                  <option value="Not Sure">Not Sure / Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="float-message" className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">Message</label>
              <textarea 
                id="float-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-brand focus:bg-white/10 transition-all rounded-md resize-none"
                placeholder="Tell us about your dog..."
              ></textarea>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-brand text-pureblack font-bold uppercase py-3.5 text-sm tracking-widest hover:bg-white transition-colors rounded-md shadow-[0_0_15px_rgba(242,181,54,0.2)] hover:shadow-[0_0_20px_rgba(242,181,54,0.4)] flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`mt-3 p-3 rounded-md flex items-start gap-2 text-xs ${
                submitStatus === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {submitStatus === 'success' 
                  ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> 
                  : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                }
                <p className="m-0">{statusMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Backdrop for mobile to close form if clicked outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
