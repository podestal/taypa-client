import { useEffect, useState, useRef, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import CartaMain from './landing/carta/CartaMain';
import Burger from './landing/carta/Burger';
import Chicken from './landing/carta/Chicken';
import Salchipapas from './landing/carta/Salchipapas';
import Dessert from './landing/carta/Dessert';

// Create context for navigation
const NavigationContext = createContext<{
  navigateToRoute: (index: number) => void;
  currentIndex: number;
}>({
  navigateToRoute: () => {},
  currentIndex: 0
});

export const useNavigation = () => useContext(NavigationContext);

const ScrollRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  console.log(currentRoute);

  const routes = [
    { path: '/carta', component: CartaMain },
    { path: '/burger', component: Burger },
    { path: '/chicken', component: Chicken },
    { path: '/salchipapas', component: Salchipapas },
    { path: '/dessert', component: Dessert },
  ];

  const currentPath = location.pathname;
  const currentIndex = routes.findIndex(route => route.path === currentPath);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default for scroll navigation, not for internal scrolling
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime.current < 300 || isTransitioning) return;
      
      lastScrollTime.current = now;
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scrolling down
          handleScrollDown();
        } else {
          // Scrolling up
          handleScrollUp();
        }
      }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleScrollDown();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleScrollUp();
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY.current = e.changedTouches[0].clientY;
      handleTouchMove();
    };

    const handleTouchMove = () => {
      if (isTransitioning) return;
      
      const touchDiff = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 50; // Minimum distance for swipe
      
      if (Math.abs(touchDiff) > minSwipeDistance) {
        const now = Date.now();
        if (now - lastScrollTime.current < 500) return;
        
        lastScrollTime.current = now;
        
        if (touchDiff > 0) {
          // Swipe up - scroll down
          handleScrollDown();
        } else {
          // Swipe down - scroll up
          handleScrollUp();
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isTransitioning, currentIndex]);

  const handleScrollDown = () => {
    if (currentIndex < routes.length - 1 && !isTransitioning) {
      const nextIndex = currentIndex + 1;
      navigateToRoute(nextIndex);
    }
  };

  const handleScrollUp = () => {
    if (currentIndex > 0 && !isTransitioning) {
      const prevIndex = currentIndex - 1;
      navigateToRoute(prevIndex);
    }
  };

  const navigateToRoute = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const targetRoute = routes[index];
    
    // Animate out current component
    const tl = gsap.timeline();
    
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.in"
    });
    
    // Navigate after animation
    tl.call(() => {
      navigate(targetRoute.path);
      setCurrentRoute(index);
    });
    
    // Animate in new component
    tl.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Reset transition state
    tl.call(() => {
      setIsTransitioning(false);
    });
  };

  const CurrentComponent = routes[currentIndex]?.component || CartaMain;

  return (
    <NavigationContext.Provider value={{ navigateToRoute, currentIndex }}>
      <div 
        ref={containerRef}
        className="w-full h-screen"
        style={{ 
          position: 'relative',
          height: '100vh',
          width: '100vw',
          touchAction: 'pan-y' // Allow vertical scrolling
        }}
      >
        <CurrentComponent />
        
        {/* Scroll indicators */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-2 pointer-events-none">
          {routes.map((route, index) => (
            <div
              key={route.path}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        {/* Mobile swipe hint */}
        <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
            Swipe ↑↓
          </div>
        </div>
        
        {/* Scroll hint - only show on desktop */}
        {currentIndex < routes.length - 1 && (
          <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Scroll down ↓
            </div>
          </div>
        )}
        
        {currentIndex > 0 && (
          <div className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Scroll up ↑
            </div>
          </div>
        )}
      </div>
    </NavigationContext.Provider>
  );
};

export default ScrollRouter; 