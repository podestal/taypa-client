// import { Menu } from "lucide-react"

import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const links = [
  {
    name: "Las Burgers",
    to: "/burger"
  },
  {
    name: "Los Pollos",
    to: "/chicken"
  },
  {
    name: "Las Papas",
    to: "/papas"
  },
  {
    name: "Los Postres",
    to: "/dessert"
  },
  {
    name: "Las Bebidas",
    to: "/bebidas"
  },
  {
    name: "Las Ensaladas",
    to: "/ensaladas"
  },
  {
    name: "Los Combos",
    to: "/combos"
  },
  {
    name: "Las Promos",
    to: "/promos"
  }
]

const Header = () => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Debug: log values
    console.log('Scroll Debug:', { scrollLeft, scrollWidth, clientWidth, hasOverflow: scrollWidth > clientWidth });
    
    // Show left indicator if scrolled right
    setShowLeftIndicator(scrollLeft > 5);
    
    // Show right indicator if there's overflow and not at the end
    const hasOverflow = scrollWidth > clientWidth;
    setShowRightIndicator(hasOverflow && scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      checkScroll();
    }, 100);

    // Add scroll listener
    container.addEventListener('scroll', checkScroll);
    
    // Check on resize
    window.addEventListener('resize', checkScroll);

    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 150;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-opacity-10 backdrop-blur-sm z-50 h-10 w-full max-w-full overflow-hidden">
      <p className="text-2xl font-bold flex-shrink-0">LoGo</p>
      
      <div className="relative flex items-center flex-1 h-full min-w-0">
        <ul 
          ref={scrollContainerRef}
          className="flex gap-1 text-xs overflow-x-auto w-full h-full items-center scrollbar-hide scroll-smooth px-2"
        >
          {links.map((link) => (
            <li 
              className="whitespace-nowrap text-center font-semibold flex-shrink-0"
              key={link.name}
            >
              <NavLink 
                to={link.to}
                className={({ isActive }) => 
                  `px-2 py-1 rounded transition-all duration-400 ${
                    isActive 
                      ? 'bg-red-600 text-white' 
                      : 'hover:bg-red-100 hover:text-red-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Left gradient indicator */}
        {showLeftIndicator && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-30" />
        )}
        
        {/* Left scroll button */}
        {showLeftIndicator && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right gradient indicator */}
        {showRightIndicator && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-30" />
        )}

        {/* Right scroll button */}
        {showRightIndicator && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-all animate-pulse"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Header