import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Trek } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

interface TrekSectionProps {
  trek: Trek;
  className?: string;
}

const TrekSection = ({ trek, className = '' }: TrekSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

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
        },
      });

      // Phase 1 (0-30%): Entrance
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.10, y: '6vh', opacity: 0.7 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        titleRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Phase 2 (30-70%): Settle - hold positions

      // Phase 3 (70-100%): Exit
      scrollTl.fromTo(
        titleRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0.5, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-3vh', ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={trek.id}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src={trek.image}
        alt={`${trek.name} ${trek.nameLine2}`}
        className="bg-image"
      />

      {/* Dark Overlay */}
      <div className="dark-overlay" />

      {/* Content Layer */}
      <div className="content-layer">
        {/* Title Block - Left */}
        <div
          ref={titleRef}
          className="absolute left-[6vw] top-[18vh] w-[56vw] max-w-[800px]"
        >
          <span className="micro-label text-white/70 block mb-4">
            {trek.eyebrow}
          </span>
          <h2 className="headline-xl text-white mb-1">
            {trek.name}
          </h2>
          <h2 className="headline-xl text-white">
            {trek.nameLine2}
          </h2>
        </div>

        {/* Hairline Rule */}
        <div
          ref={ruleRef}
          className="hairline absolute left-[6vw] top-[52vh] w-[46vw]"
        />

        {/* Right Info Panel */}
        <div
          ref={panelRef}
          className="glass-panel absolute right-[6vw] top-[18vh] w-[28vw] min-w-[280px] max-w-[420px] p-6 md:p-8"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="micro-label text-white/50">Duration</span>
              <span className="text-white font-body text-right">{trek.duration}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="micro-label text-white/50">Difficulty</span>
              <span className="text-white font-body text-right">{trek.difficulty}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="micro-label text-white/50">Max Altitude</span>
              <span className="text-white font-body text-right">{trek.maxAltitude}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="micro-label text-white/50">Best months</span>
              <span className="text-white font-body text-right text-sm">{trek.bestMonths}</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/70 text-sm leading-relaxed font-body mb-4">
                {trek.description}
              </p>
              <button className="flex items-center gap-2 text-lavender hover:text-white transition-colors group micro-label">
                <span>View itinerary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrekSection;
