import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Chicken = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

    // Content slides up from bottom
    tl.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Add floating animation to menu items
    tl.to(".menu-item", {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    }, "-=0.5");

  }, []);

  const handleBackClick = () => {
    const tl = gsap.timeline();
    
    // Animate out
    tl.to([titleRef.current, contentRef.current], {
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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={handleBackClick}
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold"
        >
          ← Back to Carta
        </button>
        
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-8xl md:text-9xl font-black text-white mb-4 font-limelight drop-shadow-2xl">
            CHICKEN
          </h1>
          <p className="text-2xl text-white/90 font-light">Delicious chicken dishes made with love</p>
        </div>
        
        <div ref={contentRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Grilled Chicken */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🍗</div>
            <h3 className="text-2xl font-bold text-white mb-4">Grilled Chicken</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Tender grilled chicken breast with herbs and spices, served with seasonal vegetables.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$12.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>

          {/* Fried Chicken */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🍖</div>
            <h3 className="text-2xl font-bold text-white mb-4">Crispy Fried Chicken</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Golden crispy fried chicken with our secret batter, served with fries and coleslaw.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$14.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>

          {/* Chicken Wings */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🍗</div>
            <h3 className="text-2xl font-bold text-white mb-4">Chicken Wings</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Spicy buffalo wings with your choice of sauce: BBQ, Buffalo, or Honey Mustard.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$10.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>

          {/* Chicken Sandwich */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🥪</div>
            <h3 className="text-2xl font-bold text-white mb-4">Chicken Sandwich</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Grilled chicken breast on artisan bread with lettuce, tomato, and our special sauce.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$9.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>

          {/* Chicken Salad */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🥗</div>
            <h3 className="text-2xl font-bold text-white mb-4">Chicken Caesar Salad</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Fresh romaine lettuce with grilled chicken, parmesan cheese, and caesar dressing.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$11.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>

          {/* Chicken Combo */}
          <div className="menu-item bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Chicken Combo</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Half chicken with two sides of your choice: fries, rice, or vegetables.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-white">$16.99</span>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chicken;