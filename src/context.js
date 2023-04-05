import React, { useContext, useEffect, useState } from "react";


const URL = "http://localhost:9000/product"; 

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [product,setProduct] = useState([])
    const [isError,setIsError] = useState({
        show: "false" , msg : ""
    }) 
    const [query,setQuery] = useState("Gentle Cleansing Shampoo,400ml")

    const getProducts = async(url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(res.code !== "ERR_NETWORK"){
                setIsLoading(false);
                setProduct(data)
            }else{
                setIsError({
                    show:true,
                    msg : data.Error
                })
            }

        } catch (error) {
            console.log(error);
        }
    }



   useEffect(() => {
    getProducts(URL);
   },[query])


   
   return <AppContext.Provider value = {{isLoading,isError,product,query,setQuery}}>
        {children}
    </AppContext.Provider>
};

const useGlobalContext = () => {
    return useContext(AppContext);
}
  
 export {AppContext,AppProvider,useGlobalContext}; 