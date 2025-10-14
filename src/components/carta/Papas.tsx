import threePieces from '../../assets/imgs/landing/chicken-three.png'
import ItemMain from './ItemMain';

const salchipapasTypes = [
    { 
      id: 'clasica', 
      name: 'Clásica', 
      price: '$7.99', 
      description: 'Papas fritas crujientes con salchichas, salsas y queso derretido. La combinación perfecta.', 
      image: threePieces 
    },
    { 
      id: 'mixta', 
      name: 'Mixta', 
      price: '$9.99', 
      description: 'Papas con salchichas, chorizo, huevo frito y todos nuestros ingredientes especiales.', 
      image: threePieces 
    },
    { 
      id: 'especial', 
      name: 'Especial', 
      price: '$11.99', 
      description: 'Nuestra versión premium con papas, salchichas, chorizo, huevo, queso y chimichurri.', 
      image: threePieces 
    },
    { 
      id: 'familiar', 
      name: 'Familiar', 
      price: '$15.99', 
      description: 'Porción gigante para compartir en familia. Incluye todo lo que amas en una porción extra grande.', 
      image: threePieces 
    }
  ];

const Papas = () => {
  return (
    <ItemMain 
        items={salchipapasTypes} 
        defaultSelected="clasica" 
    />
  )
}

export default Papas