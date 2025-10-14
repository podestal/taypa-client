import clasic from '../../assets/imgs/landing/burger-clasic.png'
import royal from '../../assets/imgs/landing/burger-royal.png'
import ItemMain from './ItemMain';

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

  return (
    <ItemMain items={burgerTypes} />
  )
}

export default Burger