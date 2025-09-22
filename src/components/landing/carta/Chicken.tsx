import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import threePieces from '../../../assets/imgs/landing/chicken-three.png'
import { useNavigation } from '../../ScrollRouter';

const Chicken = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>('personal');
  const { navigateToRoute } = useNavigation();

  const sizeOptions = [
    { id: 'personal', name: 'Personal', price: '$8.99', description: 'Perfecto para una persona. Tiernos trozos de pollo con tu elección de acompañamiento.', image: threePieces },
    { id: 'mediano', name: 'Mediano', price: '$12.99', description: 'Ideal para compartir entre dos personas. Porciones generosas con dos acompañamientos.', image: threePieces },
    { id: 'grande', name: 'Grande', price: '$16.99', description: 'Excelente para familias de 3-4 personas. Incluye múltiples acompañamientos y salsas.', image: threePieces },
    { id: 'familiar', name: 'Familiar', price: '$24.99', description: 'Nuestra porción más grande para familias numerosas. Alimenta a 5-6 personas con todos los acompañamientos.', image: threePieces }
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

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    
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
    const selectedOption = sizeOptions.find(option => option.id === sizeId);
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

  const selectedOption = sizeOptions.find(option => option.id === selectedSize);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <button 
          onClick={handleBackClick}
          className="absolute z-50 top-4 left-4 sm:top-8 sm:left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          ←
        </button>
        
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-2 sm:mb-4 font-limelight drop-shadow-2xl">
            LOS POLLOS
          </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Image Section - Top on mobile, Left on desktop */}
          <div className="flex flex-col items-center order-1 lg:order-1">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <img 
                ref={imageRef}
                src={selectedOption?.image || threePieces} 
                alt="chicken-pieces" 
                className="w-full drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-xl -z-10"></div>
            </div>
            
            {/* Description below image */}
            {selectedSize && (
              <div ref={descriptionRef} className="mt-4 sm:mt-6 md:mt-8 text-center max-w-xs sm:max-w-sm md:max-w-md">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{selectedOption?.name}</h3>
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">{selectedOption?.description}</p>
              </div>
            )}
          </div>

          {/* Options Section - Bottom on mobile, Right on desktop */}
          <div ref={optionsRef} className="space-y-2 sm:space-y-3 md:space-y-4 order-2 lg:order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center">Elige tu tamaño</h2>
            
            {sizeOptions.map((option, index) => (
              <div
                key={option.id}
                className={`size-option bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 hover:bg-white/30 transition-all duration-300 cursor-pointer border-2 ${
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
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">{option.name}</h3>
                  </div>
                  <div className="text-right ml-3 sm:ml-4">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">{option.price}</span>
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
