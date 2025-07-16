import React, { useEffect, useState } from "react";

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const [timeLeft, setTimeLeft] = useState(
    product.dealEndsAt ? Math.floor((product.dealEndsAt - Date.now()) / 1000) : 0
  );

  useEffect(() => {
    if (!product.discount) return;

    const interval = setInterval(() => {
      const remaining = Math.floor((product.dealEndsAt - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  const getDiscountedPrice = () => {
    if (!product.discount || timeLeft <= 0) return product.price;
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title.slice(0, 50)}</h3>
      <p>{product.category}</p>

      {product.discount && timeLeft > 0 ? (
        <>
          <p>
            <span className="old-price">${product.price}</span>{" "}
            <span className="new-price">${getDiscountedPrice()}</span>
          </p>
          <p className="deal-tag">{product.discount}% OFF</p>
          <p className="timer">Deal ends in: {formatTime(timeLeft)}</p>
        </>
      ) : (
        <p className="original-price">${product.price}</p>
      )}

<div className="btn-group">
  <button
    className="btn add-btn"
    onClick={() => alert(`Added "${product.title.slice(0, 25)}" to cart`)}
  >
    Add to Cart
  </button>
  <button
    className="btn buy-btn"
    onClick={() => alert(`Buying "${product.title.slice(0, 25)}"`)}
  >
    Buy Now
  </button>
</div>

    </div>
  );
};

export default ProductCard;
