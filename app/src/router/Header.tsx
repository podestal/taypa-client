// import { Menu } from "lucide-react"

import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Handbag, UserRound } from "lucide-react"
import logo from '../assets/taypa-logo-web.ico'
import CategoryMain from "../components/category/CategoryMain"

interface Props {
  selectedCategory: number;
  setSelectedCategory: (category: number) => void;
}

// const links = [
//   {
//     name: "Las Burgers",
//     to: "/burger"
//   },
//   {
//     name: "Los Pollos",
//     to: "/chicken"
//   },
//   {
//     name: "Las Papas",
//     to: "/papas"
//   },
//   {
//     name: "Los Postres",
//     to: "/dessert"
//   },
//   {
//     name: "Las Bebidas",
//     to: "/bebidas"
//   },
//   {
//     name: "Las Ensaladas",
//     to: "/ensaladas"
//   },
//   {
//     name: "Los Combos",
//     to: "/combos"
//   },
//   {
//     name: "Las Promos",
//     to: "/promos"
//   }
// ]

const Header = ({ selectedCategory, setSelectedCategory }: Props) => {
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
    <div className="flex flex-col justify-center items-center gap-2 px-4 py-1 bg-opacity-10 backdrop-blur-sm z-50 h-30 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-6 gap-2 w-full">
        <p className="text-2xl font-bold text-left flex-shrink-0 col-span-4"><img src={logo} alt="Logo" className="w-20 h-18" /></p>
        <div className="flex items-center justify-between gap-2 col-span-2">
          <UserRound />
          <Handbag />
        </div>
      </div>
      
      <div className="relative flex items-center w-full h-8 min-w-0">
        <CategoryMain selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  )
}

export default Header