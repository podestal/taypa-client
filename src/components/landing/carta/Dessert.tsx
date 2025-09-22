import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import threePieces from '../../../assets/imgs/landing/chicken-three.png'
import { useNavigation } from '../../ScrollRouter';

const Dessert = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<string | null>('helado');
  const { navigateToRoute } = useNavigation();

  const dessertTypes = [
    { 
      id: 'helado', 
      name: 'Helado', 
      price: '$4.99', 
      description: 'Delicioso helado de vainilla, chocolate o fresa. Perfecto para endulzar tu día.', 
      image: threePieces 
    },
    { 
      id: 'tres_leches', 
      name: 'Tres Leches', 
      price: '$6.99', 
      description: 'Nuestro clásico pastel de tres leches, suave y cremoso como te gusta.', 
      image: threePieces 
    },
    { 
      id: 'flan', 
      name: 'Flan', 
      price: '$5.99', 
      description: 'Flan casero con caramelo líquido. Un postre tradicional que nunca falla.', 
      image: threePieces 
    },
    { 
      id: 'brownie', 
      name: 'Brownie', 
      price: '$7.99', 
      description: 'Brownie de chocolate con helado de vainilla y salsa de chocolate caliente.', 
      image: threePieces 
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Container entrance
    tl.fromTo(containerRef.current, 
      { 
        opacity: 0,
        scale: 0.8
      },
      { 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Title animation with bounce
    tl.fromTo(titleRef.current,
      {
        opacity: 0,
        y: -100,
        scale: 0.5,
        rotation: -10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(2)"
      },
      "-=0.5"
    );

    // Image slides in from left with rotation - NO DELAY
    tl.fromTo(imageRef.current,
      {
        opacity: 0,
        x: -100,
        rotation: -15,
        scale: 0.8
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)"
      },
      "-=0.5" // Same timing as title - shows up together
    );

    // Options slide in from right
    tl.fromTo(optionsRef.current,
      {
        opacity: 0,
        x: 200
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5" // Same timing as title and image - shows up together
    );

  }, []);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    
    // Animate image transition
    const tl = gsap.timeline();
    
    // Hide current image
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
      duration: 0.4,
      ease: "power2.in"
    });
    
    // Update image source
    const selectedOption = dessertTypes.find(option => option.id === typeId);
    if (selectedOption && imageRef.current) {
      imageRef.current.src = selectedOption.image;
    }
    
    // Show new image
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
    
    // Animate description appearing
    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");
  };

  const handleBackClick = () => {
    const tl = gsap.timeline();
    
    // Animate out
    tl.to([titleRef.current, imageRef.current, optionsRef.current, descriptionRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.in"
    });
    
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.3");
    
    // Navigate back after animation
    tl.call(() => {
      navigateToRoute(0); // Go back to CartaMain (index 0)
    });
  };

  const selectedOption = dessertTypes.find(option => option.id === selectedType);

  return (
    <div ref={containerRef} className="h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <button 
          onClick={handleBackClick}
          className="absolute z-50 top-2 left-2 sm:top-4 sm:left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold text-xs sm:text-sm"
        >
          ←
        </button>
        
        <div className="text-center mb-2 sm:mb-4 md:mb-6">
          <h1 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-black text-white mb-1 sm:mb-2 font-limelight drop-shadow-2xl">
            POSTRES
          </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-start">
          {/* Image Section - Top on mobile, Left on desktop */}
          <div className="flex flex-col items-center order-1 lg:order-1">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <img 
                ref={imageRef}
                src={selectedOption?.image || threePieces} 
                alt="postres" 
                className="w-full drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl -z-10"></div>
            </div>
            
            {/* Description below image */}
            {selectedType && (
              <div ref={descriptionRef} className="mt-2 sm:mt-4 md:mt-6 text-center max-w-xs sm:max-w-sm md:max-w-md">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">{selectedOption?.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">{selectedOption?.description}</p>
              </div>
            )}
          </div>

          {/* Options Section - Bottom on mobile, Right on desktop */}
          <div ref={optionsRef} className="space-y-0.5 order-2 lg:order-2">
            <h2 className="text-xs sm:text-sm font-bold text-white mb-1 text-center">Elige tu postre</h2>
            
            {dessertTypes.map((option, index) => (
              <div
                key={option.id}
                className={`dessert-option bg-white/20 backdrop-blur-sm rounded-sm p-1 hover:bg-white/30 transition-all duration-300 cursor-pointer border-2 ${
                  selectedType === option.id 
                    ? 'border-white bg-white/30' 
                    : 'border-transparent hover:border-white/50'
                }`}
                onClick={() => handleTypeSelect(option.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-white">{option.name}</h3>
                  </div>
                  <div className="text-right ml-1">
                    <span className="text-xs font-bold text-white">{option.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dessert;