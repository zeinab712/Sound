import { React, useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./App.css";
const Products = () => {
  // use states
  const [cartCounter, setCartCounter] = useState(null);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  // Restore from localStorage OR set default values
  useEffect(() => {
    const storedCart = localStorage.getItem("cartCounter");
    const storedProducts = localStorage.getItem("products");

    if (storedCart !== null) {
      setCartCounter(Number(storedCart));
    } else {
      setCartCounter(0);
    }

    if (storedProducts) {
      // parse and ensure each product has selectedQty (fallback = 1)
      const parsed = JSON.parse(storedProducts).map((p) => ({
        ...p,
        selectedQuantity: p.selectedQuantity ?? 1,
      }));
      setProducts(parsed);
    } else {
      setProducts([
        {
          src: "image1.png",
          title: "Beats",
          price: "$20",
          count: 0,
          icon: ["fas fa-star", "fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "In Stock",
          reviews: "2K Reviews",
        },
        {
          src: "image2.png",
          title: "JBL Reflect Flow Pro+ Bluetooth ",
          price: "$30",
          count: 0,
          icon: ["fas fa-star"],
          selectedQuantity: 1,
          status: "In Stock",
          reviews: "500 Reviews",
        },
        {
          src: "image3.png",
          title: "Bose",
          price: "$40",
          count: 0,
          icon: ["fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "Not In Stock",
          reviews: "1K Reviews",
        },
        {
          src: "image4.png",
          title: "AKG",
          price: "$50",
          count: 0,
          icon: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "Not In Stock",
          reviews: "2K Reviews",
        },
        {
          src: "image5.png",
          title: "Sony - WH-1000XM5 Wireless",
          price: "$60",
          count: 0,
          icon: [
            "fas fa-star",
            "fas fa-star",
            "fas fa-star",
            "fas fa-star",
            "fas fa-star",
          ],
          selectedQuantity: 1,
          status: "In Stock",
          reviews: "5K Reviews",
        },
        {
          src: "image6.png",
          title: "Skullcandy",
          price: "$70",
          count: 0,
          icon: ["fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "In Stock",
          reviews: "3.5K Reviews",
        },
        {
          src: "image7.png",
          title: "Sony - WH-CH720N Wireless",
          price: "$70",
          count: 0,
          icon: ["fas fa-star", "fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "Not In Stock",
          reviews: "1.2K Reviews",
        },
        {
          src: "image8.png",
          title: "Beats",
          price: "$70",
          count: 0,
          icon: ["fas fa-star", "fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "In Stock",
          reviews: "2.1K Reviews",
        },
        {
          src: "image9.png",
          title: "Skullcandy - Crusher anc 2",
          price: "$70",
          count: 0,
          icon: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star"],
          selectedQuantity: 1,
          status: "Not In Stock",
          reviews: "4.5K Reviews",
        },
      ]);
    }
  }, []);

  // Store in localStorage
  useEffect(() => {
    if (products !== null && cartCounter !== null) {
      localStorage.setItem("cartCounter", cartCounter.toString());
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [cartCounter, products]);

  // functions
  const handleAddToCart = (quantity) => {
    setCartCounter((prev) => prev + quantity);
  };

  const handleAddToProduct = (index, quantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].count += quantity;
    setProducts(updatedProducts);
  };

  const handleDecreaseProduct = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].count > 0) {
      updatedProducts[index].count -= 1;
      setProducts(updatedProducts);
      setCartCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  if (products === null || cartCounter === null) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div class="w-12 text-purple-600">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.75s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </div>
        <div className="text-white text-center mt-10">Loading</div>
      </div>
    );
  }

  // returns & orders
  const handleAddToReturns = (index) => {
    const productToAdd = {
      id: products[index].title,
      src: products[index].src,
      title: products[index].title,
      price: products[index].price,
      selectedQuantity: products[index].count ?? 0,
      status: products[index].status,
      icon: products[index].icon,
      reviews: products[index].reviews,
    };

    localStorage.setItem("returnOrders", JSON.stringify([productToAdd]));
    navigate("/returns");
  };

  return (
    <>
      <Header cartCounter={cartCounter} />
      {/* Hero Section */}
      <div className="hero-section relative w-full min-h-[90vh] overflow-hidden flex items-center pt-30">
        <div className="absolute top-45 left-[-100px] w-[300px] h-[300px] bg-pink-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[120px] right-[90px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-3xl opacity-50"></div>
        {/* /* Hero content container */}
        <div className="relative z-20 w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-12 xl:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-white leading-tight">
              Unleash the Sound Within
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
              Feel every beat. Let the sound wrap around you. &nbsp; A new world
              in your ears.
            </p>
            <a href="#products">
              <button className="glow-button px-8 py-3 text-lg font-medium rounded-lg">
                Shop Now
              </button>
            </a>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            {/* image */}
            <img
              src="/hero-img.svg"
              alt="Premium headphones"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-[80%] mx-auto my-20">
        <div className="flex justify-between mt-40 " id="products">
          <h2 className="relative text-4xl font-bold pb-4 w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-purple-600 after:to-pink-500">
            Products
          </h2>
        </div>
        <div className="w-full">
          <div className="card-parent flex flex-wrap gap-8 mx-auto justify-center md:justify-center 2xl:justify-between">
            {products.map((product, index) => (
              <div
                className="card group mt-10 w-[370px] relative rounded-lg overflow-hidden hover:scale-105 transition duration-300 p-[2px] bg-gradient-to-r from-purple-600 to-pink-500"
                key={index}
              >
                <div className="bg-black h-full rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.src}
                      alt="product"
                      className="w-50 mx-auto"
                    />

                    <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToReturns(index);
                        }}
                        className="p-2 rounded-full text-pink-500 bg-white/10 backdrop-blur hover:bg-white/20 cursor-pointer"
                        title="Move to Return & Orders"
                      >
                        <svg
                          fill="#000000"
                          className="fill-pink-500"
                          width="30px"
                          height="30px"
                          viewBox="0 -16 544 544"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>show</title>
                          <path d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z" />
                        </svg>{" "}
                      </button>
                    </div>

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                    <button
                      onClick={() => {
                        handleAddToCart(product.selectedQuantity);
                        handleAddToProduct(index, product.selectedQuantity);
                      }}
                      className="absolute w-[85%] cursor-pointer left-1/2 -translate-x-1/2 -bottom-4 px-4 py-3 rounded-lg 
                                  bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 
                                  font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                                  transition-all duration-300 shadow-lg 
                                  active:translate-y-1 active:scale-95"
                    >
                      Add To Cart
                    </button>
                  </div>
                  {/* bottom of the card*/}
                  <div className="content p-7 flex flex-col gap-7 mt-3">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-purple-600">
                        {product.title}
                      </h2>
                      <select
                        value={product.selectedQuantity}
                        onChange={(e) => {
                          const updatedProducts = [...products];
                          updatedProducts[index].selectedQuantity = Number(
                            e.target.value
                          );
                          setProducts(updatedProducts);
                        }}
                        className="bg-black text-pink-500 text-xl font-bold rounded px-2 py-1 cursor-pointer"
                      >
                        {Array.from({ length: 8 }, (_, i) => i + 1).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="flex justify-between items-center my-[-15px]">
                      <p className="font-bold text-lg text-purple-600 ">
                        Total Quantity : {product.count}
                      </p>
                      <button
                        onClick={() => handleDecreaseProduct(index)}
                        className="bg-pink-500  px-4 pb-1 rounded text-white text-xl cursor-pointer hover:bg-pink-600"
                      >
                        -
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-purple-600">
                        {product.icon.map((icon, idx) => (
                          <i key={idx} className={icon}></i>
                        ))}
                      </div>
                      <span className="text-pink-500 font-bold text-xl">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
