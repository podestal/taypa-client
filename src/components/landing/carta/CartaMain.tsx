import { Beef, Drumstick, Sandwich } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

interface Props {
    icon: React.ElementType;
    className: string;
    delay: number;
    color?: string;
    hoverColor?: string;
    size?: number;
    onClick?: () => void;
    isSelected?: boolean;
}

const FloatingElement = ({ 
  icon: Icon, 
  className, 
  delay = 0, 
  color = "text-gray-400", 
  hoverColor = "hover:text-orange-500",
  size = 80,
  onClick,
  isSelected = false
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isSelected) {
      // Selected state - move to top left
      gsap.to(element, {
        x: -window.innerWidth / 2 + 100,
        y: -window.innerHeight / 2 + 100,
        scale: 1.5,
        rotation: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Start pulsing animation
          gsap.to(element, {
            scale: 1.3,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });
    } else {
      // Set initial state
      gsap.set(element, {
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() * 360,
        y: 50
      });

      // Animate in - much faster now
      gsap.to(element, {
        opacity: 0.3,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.6, // Reduced from 1.2
        delay: delay + 1.5, // Start after text animations complete
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
    }
  }, [delay, isSelected]);

  return (
    <div 
      ref={elementRef}
      className={`absolute transition-all duration-500 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon 
        size={size} 
        className={`${color} ${hoverColor} transition-colors duration-300 drop-shadow-lg`} 
      />
    </div>
  );
};

const ModernFoodHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const handleElementClick = (elementType: string) => {
    // Animate everything disappearing with different directions
    const tl = gsap.timeline();
    
    // Title goes to top
    tl.to(titleRef.current, {
      y: -window.innerHeight,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });
    
    // Subtitle goes to bottom
    tl.to(subtitleRef.current, {
      y: window.innerHeight,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.8");
    
    // Floating elements disappear with scale and rotation
    tl.to(".floating-element", {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.8,
      ease: "back.in(1.7)",
      stagger: 0.1
    }, "-=0.6");
    
    // Background fades out
    tl.to(".bg-gradient", {
      opacity: 0,
      scale: 1.2,
      duration: 0.8,
      ease: "power2.in"
    }, "-=0.4");
    
    // Navigate after animations complete
    tl.call(() => {
      if (elementType === 'drumstick') {
        navigate('/chicken');
      }
      // Add more navigation cases for other elements
    });
  };

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
      {/* Floating Food Elements with vibrant colors */}
      <FloatingElement 
        icon={Sandwich} 
        className="floating-element top-20 left-16" 
        delay={0}
        color="text-yellow-400"
        hoverColor="hover:text-yellow-300"
        size={90}
        onClick={() => handleElementClick('sandwich')}
      />
      <FloatingElement 
        icon={Drumstick} 
        className="floating-element top-32 right-20" 
        delay={0.2}
        color="text-red-500"
        hoverColor="hover:text-red-400"
        size={75}
        onClick={() => handleElementClick('drumstick')}
      />
      <FloatingElement 
        icon={Beef} 
        className="floating-element bottom-60 left-24" 
        delay={0.4}
        color="text-orange-500"
        hoverColor="hover:text-orange-400"
        size={85}
        onClick={() => handleElementClick('beef')}
      />
      
      {/* Additional smaller floating elements */}
      <FloatingElement 
        icon={Drumstick} 
        className="floating-element bottom-22 right-1/4" 
        delay={0.6}
        color="text-pink-400"
        hoverColor="hover:text-pink-300"
        size={60}
        onClick={() => handleElementClick('drumstick')}
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