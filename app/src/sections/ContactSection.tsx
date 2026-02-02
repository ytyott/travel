import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    trek: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form panel reveal
      gsap.fromTo(
        formRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer reveal
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', trek: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen ${className}`}
    >
      {/* Background Image */}
      <img
        src="/contact_mountains.jpg"
        alt="Moody mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 px-[6vw] md:px-[10vw] py-[16vh] md:py-[20vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-[1400px] mx-auto">
            {/* Left Column - Copy */}
            <div ref={headlineRef}>
              <h2 className="headline-lg text-white mb-6">
                READY TO<br />TREK?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-body mb-10 max-w-md">
                Tell us your dates, group size, and the trek you're dreaming about. We'll reply within 24 hours.
              </p>

              {/* Contact Details */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-lavender" />
                  </div>
                  <div>
                    <span className="micro-label text-white/50 block">Email</span>
                    <span className="text-white font-body">hello@trailtrust.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-lavender" />
                  </div>
                  <div>
                    <span className="micro-label text-white/50 block">Phone</span>
                    <span className="text-white font-body">+977 1 4XXX XXX</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-lavender" />
                  </div>
                  <div>
                    <span className="micro-label text-white/50 block">Office</span>
                    <span className="text-white font-body">Thamel, Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div ref={formRef}>
              <div className="glass-panel p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-lavender" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Inquiry Sent!
                    </h3>
                    <p className="text-white/70 font-body">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="micro-label text-white/50 block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="micro-label text-white/50 block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="micro-label text-white/50 block mb-2">
                        Preferred Trek
                      </label>
                      <select
                        name="trek"
                        value={formData.trek}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent"
                      >
                        <option value="" className="bg-navy">Select a trek</option>
                        <option value="everest" className="bg-navy">Everest Base Camp</option>
                        <option value="annapurna" className="bg-navy">Annapurna Base Camp</option>
                        <option value="langtang" className="bg-navy">Langtang Valley</option>
                        <option value="manaslu" className="bg-navy">Manaslu Circuit</option>
                        <option value="poonhill" className="bg-navy">Ghorepani Poon Hill</option>
                        <option value="mardi" className="bg-navy">Mardi Himal</option>
                        <option value="gokyo" className="bg-navy">Gokyo Lakes</option>
                      </select>
                    </div>

                    <div>
                      <label className="micro-label text-white/50 block mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your preferred dates, group size, and any questions..."
                        className="w-full resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="px-[6vw] md:px-[10vw] py-8 border-t border-white/10"
        >
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/50 hover:text-lavender transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="micro-label text-white/50 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="micro-label text-white/50 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
            <span className="micro-label text-white/40">
              © TrailTrust Travel
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
