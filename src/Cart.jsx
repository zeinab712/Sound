import React, { useEffect, useState } from "react";
import Header from "./Header";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = storedProducts.filter((p) => p.count > 0);
    setCartProducts(filtered);

    const storedCart = Number(localStorage.getItem("cartCounter")) || 0;
    setCartCounter(storedCart);
  }, []);

  const handleIncrease = (index) => {
    const updated = [...cartProducts];
    updated[index].count += 1;
    setCartProducts(updated);
    updateStorage(updated);
    setCartCounter((prev) => prev + 1);
  };

  const handleDecrease = (index) => {
    const updated = [...cartProducts];
    if (updated[index].count > 1) {
      updated[index].count -= 1;
      setCartProducts(updated);
      updateStorage(updated);
      setCartCounter((prev) => prev - 1);
    }
  };

  const handleRemove = (index) => {
    const removedProduct = cartProducts[index];
    const filteredCart = cartProducts.filter((_, i) => i !== index);
    setCartProducts(filteredCart);
    setCartCounter(filteredCart.reduce((sum, p) => sum + p.count, 0));

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedAll = allProducts.map((p) =>
      p.title === removedProduct.title ? { ...p, count: 0 } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedAll));
    localStorage.setItem(
      "cartCounter",
      filteredCart.reduce((sum, p) => sum + p.count, 0)
    );
  };

  const updateStorage = (updated) => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedAll = allProducts.map((p) => {
      const found = updated.find((u) => u.title === p.title);
      return found || { ...p, count: 0 };
    });
    localStorage.setItem("products", JSON.stringify(updatedAll));
    localStorage.setItem(
      "cartCounter",
      updated.reduce((sum, p) => sum + p.count, 0)
    );
  };

  const totalPrice = cartProducts.reduce((sum, p) => {
    const priceNum = Number(p.price.replace("$", ""));
    return sum + priceNum * p.count;
  }, 0);
  const totalItems = cartProducts.length;
  const shippingCost = totalPrice > 200 ? 30 : 0;
  const tax = (10 / 100) * totalPrice;
  const orderTotal = totalPrice + tax + shippingCost;

  return (
    <>
      <Header cartCounter={cartCounter} />
      <div className="flex flex-col lg:flex-row w-full px-4 md:px-6 xl:w-[80%] mx-auto items-start  justify-between mt-25 gap-4 md:gap-6">
        {/* Cart Items */}
        <div className="mx-auto w-[90%] lg:w-[68%] my-4 md:my-6 lg:my-8 text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-[2px]">
          <div className="w-full h-full bg-black p-4 md:p-5 rounded-xl">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Your Cart</h1>
            {cartProducts.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              <>
                {cartProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative pb-4 w-full after:content-[''] after:absolute after:left-0 after:top-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-purple-600 after:to-pink-500 py-4"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-3 sm:mb-0">
                      <img 
                        src={product.src} 
                        alt={product.title} 
                        className="w-16 sm:w-20 md:w-24 lg:w-28" 
                      />
                      <div>
                        <h2 className="text-base md:text-lg lg:text-xl font-bold text-purple-600 break-words">{product.title}</h2>
                        <p className="text-sm md:text-base lg:text-lg font-semibold text-purple-600">{product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => handleDecrease(index)}
                          className= "bg-purple-600 hover:bg-purple-600 sm:bg-pink-500 sm:hover:bg-pink-600 text-lg font-bold py-1 px-3 rounded cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-purple-600 sm:text-pink-500  text-base font-bold mx-1 md:mx-2">{product.count}</span>
                        <button
                          onClick={() => handleIncrease(index)}
                          className="bg-purple-600 hover:bg-purple-600 sm:bg-pink-500 sm:hover:bg-pink-600 text-lg font-bold py-1 px-3 rounded  cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(index)}
                        className="bg-pink-500 text-sm py-2 px-2 md:px-3 rounded sm:ml-3 hover:bg-pink-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mx-auto w-[90%] lg:w-[30%] self-start my-4 md:my-6 lg:my-8 text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-[2px]">
          <div className="flex flex-col gap-3 md:gap-4 w-full h-full bg-black p-4 md:p-5 rounded-xl text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Order Summary</h1>
            <div className="flex justify-between">
              <span className="text-sm md:text-base font-semibold text-purple-600">Items ({totalItems})</span>
              <span className="text-sm md:text-base font-semibold text-pink-500">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm md:text-base font-semibold text-purple-600">Shipping</span>
              <span className="text-sm md:text-base font-semibold text-pink-500">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm md:text-base font-semibold text-purple-600">Before tax</span>
              <span className="text-sm md:text-base font-semibold text-pink-500">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm md:text-base font-semibold text-purple-600">Tax (10%)</span>
              <span className="text-sm md:text-base font-semibold text-pink-500">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between relative text-lg md:text-xl lg:text-2xl font-bold pb-4 w-full after:content-[''] after:absolute after:left-0 after:top-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-purple-600 after:to-pink-500 py-4">
              <span className="text-sm md:text-base font-semibold text-purple-600">Order total</span>
              <span className="text-sm md:text-base font-semibold text-pink-500">${orderTotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition duration-300 font-bold text-sm md:text-base"
              disabled={cartProducts.length === 0}
              onClick={() =>  alert("Proceeding to checkout...") }
            >
              {cartProducts.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;