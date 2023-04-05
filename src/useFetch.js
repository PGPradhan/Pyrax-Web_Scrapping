import React, { useState, useEffect } from "react";


export const API_URL = "http://localhost:9000/product";


const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [product, setProduct] = useState(null);

  const getProduct = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      if (res.code !== "ERR_NETWORK") {
        setIsLoading(false);
        setProduct(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getProduct("http://localhost:9000/product");
    }, 1000);
    console.log("set");
    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, product };
};

export default useFetch;