import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Dish } from '../../services/api/dishService';

interface Props {
    dish: Dish
    dishes: Dish[]
    currentIndex: number
    onPrevious: () => void
    onNext: () => void
}

const DishCard = ({ dish, dishes, currentIndex, onPrevious, onNext }: Props) => {

    const optionsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      ref={optionsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <div className="flex flex-col items-center order-1 lg:order-1 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Title and Price */}
                <div className="mt-2 text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <motion.h3 
                    className="text-5xl sm:text-base md:text-lg font-bold mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {dish.name}
                  </motion.h3>
                  <motion.p 
                    className="text-md text-center sm:text-sm md:text-base leading-relaxed mt-2 font-bold"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    {dish.price}
                  </motion.p>
                </div>

                {/* Image */}
                <motion.div 
                  className="relative w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 100 }}
                >
                  <motion.img 
                    // ref={imageRef}
                    src={dish.image || ''} 
                    alt="hamburguesa" 
                    className="w-full drop-shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Glow effect */}
                  <div className="absolute "></div>
                  <motion.p 
                    className="text-xs h-20 text-center sm:text-sm md:text-base leading-relaxed w-[70%] mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {dish.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.div 
              className="flex justify-center items-center gap-12 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.button
                onClick={onPrevious}
                className="text-black p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous dish"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <div className="flex gap-2">
                {dishes.map((d, index) => (
                  <motion.div
                    key={d.id}
                    className={`h-2 rounded-full ${
                      index === currentIndex 
                        ? 'bg-red-600' 
                        : 'bg-gray-300'
                    }`}
                    animate={{
                      width: index === currentIndex ? '16px' : '8px'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={onNext}
                className="text-black p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next dish"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </motion.div>
        </div>
    </motion.div>
  )
}

export default DishCard