import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9 },
        0
      );

      // Title lines entrance
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      if (titleLines) {
        tl.fromTo(
          titleLines,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          0.1
        );
      }

      // Rule grow
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7 },
        0.4
      );

      // Panel entrance
      tl.fromTo(
        panelRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([titleRef.current, panelRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // Phase 1 (0-30%): Hold - elements stay in place
      // Phase 2 (30-70%): Settle - static
      // Phase 3 (70-100%): Exit

      // Title exit
      scrollTl.fromTo(
        titleRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Panel exit
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Background exit
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-3vh', ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTreks = () => {
    const element = document.getElementById('everest-base-camp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/hero_prayer_flags.jpg"
        alt="Himalayan mountain vista with prayer flags"
        className="bg-image"
      />

      {/* Dark Overlay */}
      <div className="dark-overlay" />

      {/* Content Layer */}
      <div className="content-layer">
        {/* Title Block - Left */}
        <div
          ref={titleRef}
          className="absolute left-[6vw] top-[18vh] w-[62vw] max-w-[900px]"
        >
          <span className="micro-label text-white/70 block mb-4 title-line">
            NEPAL TREKKING
          </span>
          <h1 className="headline-xl text-white mb-2 title-line">
            TREKKING
          </h1>
          <h1 className="headline-xl text-white title-line">
            REIMAGINED
          </h1>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-md title-line font-body">
            Small groups. Expert guides. Unforgettable routes.
          </p>
        </div>

        {/* Hairline Rule */}
        <div
          ref={ruleRef}
          className="hairline absolute left-[6vw] top-[54vh] w-[44vw]"
        />

        {/* CTA Button - Left */}
        <button
          ref={ctaRef}
          onClick={scrollToTreks}
          className="btn-primary absolute left-[6vw] top-[62vh] flex items-center gap-2 group"
        >
          <span>Explore treks</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Right Info Panel */}
        <div
          ref={panelRef}
          className="glass-panel absolute right-[6vw] top-[18vh] w-[28vw] min-w-[280px] max-w-[420px] p-6 md:p-8"
        >
          <div className="space-y-5">
            <div>
              <span className="micro-label text-white/50 block mb-1">Season</span>
              <span className="text-white font-body">Autumn & Spring</span>
            </div>
            <div>
              <span className="micro-label text-white/50 block mb-1">Group size</span>
              <span className="text-white font-body">4–10</span>
            </div>
            <div>
              <span className="micro-label text-white/50 block mb-1">Style</span>
              <span className="text-white font-body">Lodges + Teahouses</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/70 text-sm leading-relaxed font-body">
                Curated itineraries, local expertise, and a lighter footprint—so you can focus on the trail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
