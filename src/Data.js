import React, { useEffect, useState } from "react";
import axios from "axios"


const Data = () => {
    const [post,setPost] = useState([{}]);

    
   
    useEffect(() => {
      axios.get("http://localhost:9000/product")
      .then((response) => {setPost(response.data)})
      .catch(err => console.log(err))
    
  
      }, []);

      const [cards] = useState([
        {
          title : post.products2,
          text : post.products1
        }
      ])

    return(
        <>
        <h1>Responsive Cards</h1>
        <section>
          <div className="container" >
          <div className="cards">
          {
            cards.map((card,i) => (
               <div key={i} className="card">
               <h3>
                {card.title}
               </h3> 
               <p>
                {card.text}
               </p>
               </div>
            ))
          }
          </div>
          </div>
        </section>
        </>
        
    )
};


  export default Data;
