import { useState, useEffect } from 'react';
import { servicesData } from '../data/servicesData';
import { MapPin, Phone, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing again
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
      setStatusMessage('Thank you! Your message has been sent. We\'ll get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.getElementById('main-scroller')?.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-pureblack text-white flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-12 md:pt-64 md:pb-16 flex flex-col items-center justify-center grunge-bg">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-8 drop-shadow-lg z-10 relative text-center px-4">
          Contact Us
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 z-10 relative text-center px-6 font-medium italic max-w-2xl">
          “Ready to transform your dog? Get in touch with us today.”
        </p>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-24 px-6 texture-bg flex-grow">
          {/* Main Grid container */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 w-full">
            
            {/* Get In Touch Header (Top on mobile, Right-top on desktop) */}
            <div className="order-1 lg:col-start-2 lg:col-end-3 lg:row-start-1">
              <h2 className="font-heading text-4xl md:text-5xl text-brand uppercase tracking-wider mb-6 drop-shadow-lg">
                Get In Touch
              </h2>
              {/* Short mobile text */}
              <p className="text-gray-300 text-lg leading-relaxed lg:hidden">
                Fill out the form below or reach out to us directly to start your dog's transformation.
              </p>
              {/* Full desktop text */}
              <p className="text-gray-300 text-lg leading-relaxed hidden lg:block">
                Whether you're looking for basic obedience, advanced protection work, or our immersive board and train program, we are here to help. Fill out the form or reach out using the information below to start your dog's transformation.
              </p>
            </div>

            {/* Contact Form (Middle on mobile, Left spanning both rows on desktop) */}
            <div className="bg-black/40 border border-white/10 p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm order-2 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-span-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-brand font-heading uppercase tracking-widest text-sm">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-pureblack border border-white/20 p-4 text-white focus:outline-none focus:border-brand transition-colors rounded-none placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-brand font-heading uppercase tracking-widest text-sm">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-pureblack border border-white/20 p-4 text-white focus:outline-none focus:border-brand transition-colors rounded-none placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-brand font-heading uppercase tracking-widest text-sm">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-pureblack border border-white/20 p-4 text-white focus:outline-none focus:border-brand transition-colors rounded-none placeholder-gray-600"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-brand font-heading uppercase tracking-widest text-sm">Interested Service</label>
                <div className="relative">
                  <select 
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-pureblack border border-white/20 p-4 text-white focus:outline-none focus:border-brand transition-colors rounded-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service...</option>
                    {servicesData.map((service, idx) => (
                      <option key={idx} value={service.title}>{service.title}</option>
                    ))}
                    <option value="Not Sure">Not Sure / Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-brand font-heading uppercase tracking-widest text-sm">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-pureblack border border-white/20 p-4 text-white focus:outline-none focus:border-brand transition-colors rounded-none placeholder-gray-600 resize-none"
                  placeholder="Tell us about your dog and your goals..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-brand text-pureblack font-bold uppercase py-5 px-8 text-lg tracking-widest hover:bg-white transition-colors shadow-lg shadow-brand/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`mt-4 p-4 rounded-md flex items-start gap-3 text-sm ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {submitStatus === 'success' 
                    ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> 
                    : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  }
                  <p className="m-0">{statusMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information (Bottom on mobile, Right-bottom on desktop) */}
          <div className="flex flex-col gap-8 order-3 lg:col-start-2 lg:col-end-3 lg:row-start-2">
            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-colors">
                <MapPin className="w-8 h-8 text-brand group-hover:text-pureblack transition-colors" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-2xl uppercase tracking-widest text-brand mb-1">Our Facility</h3>
                <p className="text-gray-300 text-lg">320 McKeever Rd<br/>Arcola, TX 77583</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-colors">
                <Phone className="w-8 h-8 text-brand group-hover:text-pureblack transition-colors" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-2xl uppercase tracking-widest text-brand mb-1">Call Us</h3>
                <p className="text-gray-300 text-lg">(713) 291-6543</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-colors">
                <Mail className="w-8 h-8 text-brand group-hover:text-pureblack transition-colors" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-2xl uppercase tracking-widest text-brand mb-1">Email Us</h3>
                <p className="text-gray-300 text-lg">tycal0308@gmail.com</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
