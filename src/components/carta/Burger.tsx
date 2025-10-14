import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clasic from '../../assets/imgs/landing/burger-clasic.png'
import royal from '../../assets/imgs/landing/burger-royal.png'

const burgerTypes = [
    { 
      id: 'clasica', 
      name: 'La Clásica', 
      price: 'S/.9.99', 
      description: 'La hamburguesa tradicional con carne jugosa, lechuga, tomate, cebolla y nuestra salsa especial.', 
      image: clasic 
    },
    { 
      id: 'queso', 
      name: 'La Royal', 
      price: 'S/.11.99', 
      description: 'Nuestra clásica hamburguesa, con tocino, queso y huevo frito perfecta para los amantes del breakfast.', 
      image: royal 
    },
    { 
      id: 'bacon', 
      name: 'La Parrillera', 
      price: 'S/.13.99', 
      description: 'Deliciosa hamburguesa con carne de res, chorizo parrillero y nuestro chimichurri especial.', 
      image: clasic 
    },
    { 
      id: 'doble', 
      name: 'La Doble', 
      price: 'S/.15.99', 
      description: 'Para los más hambrientos. Doble porción de carne, doble queso y todos los ingredientes.', 
      image: clasic 
    }
  ];

const Burger = () => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedType, setSelectedType] = useState<string>('clasica');
  const selectedOption = burgerTypes.find(option => option.id === selectedType);

  const handlePrevious = () => {
    const currentIndex = burgerTypes.findIndex(b => b.id === selectedType);
    const previousIndex = currentIndex === 0 ? burgerTypes.length - 1 : currentIndex - 1;
    setSelectedType(burgerTypes[previousIndex].id);
  };

  const handleNext = () => {
    const currentIndex = burgerTypes.findIndex(b => b.id === selectedType);
    const nextIndex = currentIndex === burgerTypes.length - 1 ? 0 : currentIndex + 1;
    setSelectedType(burgerTypes[nextIndex].id);
  };
  return (
    <motion.div 
      ref={optionsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <div className="flex flex-col items-center order-1 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Title and Price */}
                <div className="mt-2 sm:mt-4 md:mt-6 text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <motion.h3 
                    className="text-5xl sm:text-base md:text-lg font-bold mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {selectedOption?.name}
                  </motion.h3>
                  <motion.p 
                    className="text-md text-center sm:text-sm md:text-base leading-relaxed my-4 font-bold"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    {selectedOption?.price}
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
                    ref={imageRef}
                    src={selectedOption?.image || clasic} 
                    alt="hamburguesa" 
                    className="w-full drop-shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Glow effect */}
                  <div className="absolute "></div>
                  <motion.p 
                    className="text-xs h-20 text-center sm:text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {selectedOption?.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.div 
              className="flex justify-center items-center gap-12 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.button
                onClick={handlePrevious}
                className="text-black p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Previous burger"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <div className="flex gap-2">
                {burgerTypes.map((burger) => (
                  <motion.div
                    key={burger.id}
                    className={`h-2 rounded-full ${
                      burger.id === selectedType 
                        ? 'bg-red-600' 
                        : 'bg-gray-300'
                    }`}
                    animate={{
                      width: burger.id === selectedType ? '16px' : '8px'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="text-black p-3 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Next burger"
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

export default Burger