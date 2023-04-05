import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context';

const Products = () => {
  const {product} = useGlobalContext();
  return (
  <>
  <section className='movie-page'>
    <div className='grid grid-4-col'>

    {product.map((curproduct) => {
      const {id,products1,products2,products3,products4,products5} = curproduct;
      return  <NavLink to= {`product/${id}`} key={id} >
        <div className='card'>
          <div className='card-info'>
              <h1> {products2} </h1>
              <img src={products1} alt="Mamaearth Onion Hair Oil" />
              <h4>Price : {products3.slice(0,4)}</h4> 
              <h4>Amazon : {products4}</h4>
              <h4>FlipCART : {products5}</h4>
          </div>
        </div>
        </NavLink>
      
    })}
    
    </div>
  </section>
 
   </>
    
  )
}

export default Products;
