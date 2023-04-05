import React from 'react'
import { BrowserRouter,Routes, Route} from "react-router-dom";
import SingleProduct from "./SingleProduct.js";
import Error from './Error.js';
import Home from './Home.js';
import Products from './Products.js';
import "./App.css"

const App = () => {
  return (
    <>  
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>} />
            <Route path='/product/:id' element={<SingleProduct/>} />
            <Route path='/product' element={<Products/>} />
            <Route path='*' element={<Error/>} />  
        </Routes>
       </BrowserRouter>
       
      

    </>
  )
}

export default App;
