import { Beef, Drumstick, Sandwich } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
    icon: React.ElementType;
    className: string;
    delay: number;
    color?: string;
    hoverColor?: string;
    size?: number;
}

const FloatingElement = ({ 
  icon: Icon, 
  className, 
  delay = 0, 
  color = "text-gray-400", 
  hoverColor = "hover:text-orange-500",
  size = 80 
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      scale: 0.3,
      rotation: Math.random() * 360,
      y: 50
    });

    // Animate in
    gsap.to(element, {
      opacity: 0.2,
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 1.2,
      delay: delay + 0.5,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Start floating animation after entrance
        gsap.to(element, {
          y: -20,
          rotation: 5,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    });
  }, [delay]);

  return (
    <div 
      ref={elementRef}
      className={`absolute transition-all duration-500 ${className}`}
    >
      <Icon 
        size={size} 
        className={`${color} ${hoverColor} cursor-pointer transition-colors duration-300`} 
      />
    </div>
  );
};

const ModernFoodHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero container entrance
    tl.fromTo(heroRef.current, 
      { 
        opacity: 0,
        scale: 0.95
      },
      { 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Title animation
    tl.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3"
    );

    // Background gradient animation
    tl.fromTo(".bg-gradient",
      {
        opacity: 0,
        scale: 1.1
      },
      {
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      },
      "-=1"
    );

  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Floating Food Elements with different colors */}
      <FloatingElement 
        icon={Sandwich} 
        className="top-20 left-16" 
        delay={0}
        color="text-yellow-500"
        hoverColor="hover:text-yellow-600"
        size={90}
      />
      <FloatingElement 
        icon={Drumstick} 
        className="top-32 right-20" 
        delay={1.5}
        color="text-red-500"
        hoverColor="hover:text-red-600"
        size={75}
      />
      <FloatingElement 
        icon={Beef} 
        className="bottom-60 left-24" 
        delay={3}
        color="text-orange-600"
        hoverColor="hover:text-orange-700"
        size={85}
      />
      
      {/* Additional smaller floating elements */}
      <FloatingElement 
        icon={Drumstick} 
        className="bottom-22 right-1/4" 
        delay={3.5}
        color="text-pink-400"
        hoverColor="hover:text-pink-500"
        size={60}
      />

      {/* Hero Content */}
      <div className="text-center z-10 px-8 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-6 leading-none font-limelight"
        >
          NUESTRA
          <span className="block text-orange-500">CARTA</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 font-light mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Te lo mereces
        </p>
      </div>

      {/* Subtle background decoration */}
      <div className="bg-gradient absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50 -z-10"></div>
    </div>
  );
};

const CartaMain = () => {
  return (
    <div>
        <ModernFoodHero />
    </div>
  )
}

export default CartaMain