import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import "./index.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const assignDiscounts = (products) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const dealProducts = shuffled.slice(0, 10).map((product, index) => {
      let discount = 0;
      if (index < 4) discount = 20;
      else if (index < 7) discount = 30;
      else if (index < 9) discount = 10;
      else discount = 50;

      const duration = Math.floor(Math.random() * 300 + 60);
      const expiresAt = Date.now() + duration * 1000;

      return {
        ...product,
        discount,
        dealEndsAt: expiresAt,
      };
    });

    const rest = products.filter((p) => !dealProducts.find((dp) => dp.id === p.id));
    return [...dealProducts, ...rest];
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const withDeals = assignDiscounts(data);
      setProducts(withDeals);
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Limited Time Product Deals</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
