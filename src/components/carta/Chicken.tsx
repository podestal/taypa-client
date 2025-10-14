import personal from '../../assets/imgs/landing/chicken-three.png'
import ItemMain from './ItemMain';

const chickenTypes = [
    { 
      id: 'personal', 
      name: 'Personal', 
      price: '$9.99', 
      description: 'La hamburguesa tradicional con carne jugosa, lechuga, tomate, cebolla y nuestra salsa especial.', 
      image: personal 
    },
    { 
      id: 'mediano', 
      name: 'Mediano', 
      price: '$11.99', 
      description: 'Nuestra clásica hamburguesa, con tocino, queso y huevo frito perfecta para los amantes del breakfast.', 
      image: personal 
    },
    { 
      id: 'grande', 
      name: 'Grande', 
      price: '$13.99', 
      description: 'Deliciosa hamburguesa con carne de res, chorizo parrillero y nuestro chimichurri especial.', 
      image: personal 
    },
    { 
      id: 'familiar', 
      name: 'Familiar', 
      price: '$15.99', 
      description: 'Para los más hambrientos. Doble porción de carne, doble queso y todos los ingredientes.', 
      image: personal 
    }
  ];

const Chicken = () => {
  return (
    <ItemMain 
        items={chickenTypes} 
        defaultSelected="personal" 
    />
  )
}

export default Chicken