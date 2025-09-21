import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import threePieces from '../../../assets/imgs/landing/chicken-three.png'

const Chicken = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizeOptions = [
    { id: 'personal', name: 'Personal', price: '$8.99', description: 'Perfect for one person. Tender chicken pieces with your choice of side.' },
    { id: 'mediano', name: 'Mediano', price: '$12.99', description: 'Ideal for sharing between two people. Generous portions with two sides.' },
    { id: 'grande', name: 'Grande', price: '$16.99', description: 'Great for families of 3-4 people. Includes multiple sides and sauces.' },
    { id: 'familiar', name: 'Familiar', price: '$24.99', description: 'Our largest portion for big families. Feeds 5-6 people with all the sides.' }
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

    // Image slides in from left with rotation
    tl.fromTo(imageRef.current,
      {
        opacity: 0,
        x: -200,
        rotation: -15,
        scale: 0.8
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      },
      "-=0.8"
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
      "-=0.6"
    );

    // Add floating animation to image
    tl.to(imageRef.current, {
      y: -15,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    }, "-=0.5");

  }, []);

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    
    // Animate description appearing
    const tl = gsap.timeline();
    
    // Hide current description if exists
    if (descriptionRef.current) {
      tl.to(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in"
      });
    }
    
    // Show new description
    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
    
    // Add pulse effect to image
    tl.to(imageRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    }, "-=0.2");
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
      navigate('/carta');
    });
  };

  const selectedOption = sizeOptions.find(option => option.id === selectedSize);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
        <button 
          onClick={handleBackClick}
          className="absolute z-50 top-4 left-4 sm:top-8 sm:left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          ←
        </button>
        
        <div className="text-center mb-8 sm:mb-12">
          <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-2 sm:mb-4 font-limelight drop-shadow-2xl">
            POLLOS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light">Delicious chicken dishes made with love</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Image Section */}
          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <img 
                ref={imageRef}
                src={threePieces} 
                alt="chicken-pieces" 
                className="w-full drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-xl -z-10"></div>
            </div>
            
            {/* Description below image */}
            {selectedSize && (
              <div ref={descriptionRef} className="mt-6 sm:mt-8 text-center max-w-sm sm:max-w-md">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedOption?.name}</h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">{selectedOption?.description}</p>
              </div>
            )}
          </div>

          {/* Options Section */}
          <div ref={optionsRef} className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Elige tu tamaño</h2>
            
            {sizeOptions.map((option, index) => (
              <div
                key={option.id}
                className={`size-option bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 cursor-pointer border-2 ${
                  selectedSize === option.id 
                    ? 'border-white bg-white/30 scale-105' 
                    : 'border-transparent hover:border-white/50'
                }`}
                onClick={() => handleSizeSelect(option.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{option.name}</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Perfect portion size</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{option.price}</span>
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

export default Chicken;