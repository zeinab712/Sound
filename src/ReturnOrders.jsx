import React, { useEffect, useState } from "react";
import Header from "./Header";

const ReturnOrders = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const storedReturns =
      JSON.parse(localStorage.getItem("returnOrders")) || [];
    const uniqueReturns = storedReturns.filter(
      (item, index, self) =>
        index === self.findIndex((element) => element.id === item.id)
    );
    setReturns(uniqueReturns);
  }, []);

  const storedCart = Number(localStorage.getItem("cartCounter")) || 0;

  return (
    <>
      <Header cartCounter={storedCart} />
      <div className="w-[90%] mx-auto my-25">
        <h1 className="text-3xl font-bold text-white mb-8">Order Details</h1>

        {returns.length === 0 ? (
          <div className="text-center text-white mt-20 text-xl">
            There are no orders to show yet.
          </div>
        ) : (
          returns.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-[2px] mb-6"
            >
              <div className="w-full h-full bg-black p-6 rounded-xl">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-60 mx-auto mb-6"
                />

                <h2 className="text-2xl font-bold text-purple-600">
                  {item.title}
                </h2>
                <p className="text-purple-600 font-bold text-lg">
                  {item.price}
                </p>
                <p className="text-purple-600 font-bold">
                  Quantity: {item.selectedQuantity}
                </p>

                <div className="h-[1px] my-6 bg-gradient-to-r from-purple-600 to-pink-500"></div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="font-bold text-purple-600">Color:</span>
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-400 cursor-pointer hover:bg-gray-300 transition-all duration-300"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border border-gray-700 cursor-pointer hover:bg-gray-600 transition-all duration-300"></div>
                    <div className="w-6 h-6 rounded-full bg-cyan-800 border border-cyan-950 cursor-pointer hover:bg-cyan-900 transition-all duration-300"></div>
                  </p>
                </div>
              </div>

              <div className="w-full h-full bg-black p-6 rounded-xl space-y-4">
                <h3 className="text-2xl font-bold text-purple-600 lg:text-pink-500 mb-8 mt-4">
                  Product Info
                </h3>

                <div className="flex items-center gap-7">
                  <svg
                    fill="#ffffff"
                    width="30px"
                    height="30px"
                    className="fill-purple-900 lg:fill-pink-900"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z M6.278 7.697L5.045 6.464a.296.296 0 0 0-.42-.002l-.613.614a.298.298 0 0 0 .002.42l1.91 1.909a.5.5 0 0 0 .703.005l.265-.265L9.997 6.04a.291.291 0 0 0-.009-.408l-.614-.614a.29.29 0 0 0-.408-.009L6.278 7.697z"
                      fill-rule="evenodd"
                    />
                  </svg>

                  <p className="text-purple-600 lg:text-pink-500 font-bold">
                    Status:{" "}
                    <span
                      className={
                        item.status === "In Stock"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {item.status}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-7">
                  <svg
                    fill="#ffffff"
                    width="30px"
                    height="30px"
                    className="fill-purple-900 lg:fill-pink-900"
                    viewBox="0 0 14 14"
                    role="img"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m 12.999823,7.11841 c 0,-0.002 -1.13e-4,-0.004 -1.42e-4,-0.007 -0.0033,-0.15038 -0.124056,-0.2702 -0.276257,-0.2702 l -0.07254,0 L 11.530659,4.6754 C 11.483399,4.5839 11.389137,4.527 11.285075,4.52697 l -1.9125301,-4e-4 0.072962,-0.57836 C 9.4663249,3.71708 9.3948679,3.49885 9.2442567,3.33367 9.0939297,3.16883 8.8840455,3.07803 8.6532297,3.07803 l -5.9358309,0 c -0.1492478,0 -0.2760303,0.11548 -0.2902593,0.26436 l -0.0595,0.47651 3.3819468,0 c 0.2195973,0 0.3929577,0.17802 0.3872206,0.39762 -0.00577,0.2196 -0.1884413,0.39761 -0.4080386,0.39761 l -1.1280635,0 c 1.988e-4,5.7e-4 3.976e-4,10e-4 5.964e-4,0.002 l -3.312648,0 C 1.1333559,4.61613 1.0041593,4.742 1.000098,4.8973 0.996037,5.0526 1.1186158,5.17847 1.273913,5.17847 l 4.385585,0 C 5.8630771,5.20987 6.015165,5.38588 6.00957,5.59903 6.00344,5.83312 5.8096546,6.02292 5.5759703,6.02488 l -3.0235248,0 c -0.1568593,0 -0.287334,0.12715 -0.2914521,0.28401 -0.00412,0.15686 0.1197106,0.28401 0.2765699,0.28401 l 2.9879099,0 c 0.2065612,0.0288 0.361688,0.20625 0.3560646,0.42148 -0.00616,0.23527 -0.2019034,0.42601 -0.4371782,0.42601 l -3.4278145,0 0,3.1e-4 -0.2880156,0 c -0.1568593,0 -0.287334,0.12716 -0.2914522,0.28402 -0.00412,0.15685 0.1196823,0.28401 0.27657,0.28401 l 0.2485665,0 -0.097217,1.01727 c -0.020846,0.2311 0.050611,0.44933 0.2012502,0.61451 0.1502986,0.16487 0.3602112,0.25564 0.591027,0.25564 l 0.2144283,0 c 0.1021872,0.58432 0.6077269,1.02582 1.2261041,1.02582 0.6183773,0 1.1470354,-0.4415 1.2797538,-1.02579 l 2.6759237,0 c 0.2163596,0 0.4211884,-0.0827 0.581825,-0.21818 0.1468905,0.14098 0.3416085,0.21818 0.5542192,0.21818 l 0.044022,0 c 0.1021588,0.58429 0.6076984,1.02579 1.2261039,1.02579 0.618377,0 1.147035,-0.4415 1.279754,-1.02579 l 0.176626,0 c 0.460126,0 0.868193,-0.37407 0.909659,-0.83386 l 0.173076,-1.91724 c 2.28e-4,-0.003 1.14e-4,-0.005 2.84e-4,-0.008 2.84e-4,-0.004 8.24e-4,-0.008 9.38e-4,-0.0118 5.6e-5,-0.002 -1.71e-4,-0.005 -1.71e-4,-0.007 z m -8.8871313,3.23548 c -0.3915092,0 -0.7017061,-0.31849 -0.6914533,-0.71 0.010253,-0.39154 0.3371211,-0.71006 0.7286303,-0.71006 0.3915093,0 0.7016777,0.31852 0.6914249,0.71006 -0.010253,0.39151 -0.3370927,0.71 -0.7286019,0.71 z m 6.3618473,0 c -0.391509,0 -0.7016775,-0.31849 -0.6914531,-0.71 0.010253,-0.39154 0.3371211,-0.71006 0.7286301,-0.71006 0.39151,0 0.701706,0.31852 0.691425,0.71006 -0.01025,0.39151 -0.337093,0.71 -0.728602,0.71 z M 12.259832,9.02594 C 12.245062,9.18973 12.094453,9.3281 11.930948,9.3281 l -0.191055,0 C 11.613395,8.77561 11.12234,8.36581 10.52657,8.36581 c -0.59577,0 -1.1082679,0.4098 -1.2636788,0.96229 l -0.058478,0 C 9.1322172,9.3281 9.0678039,9.301 9.0229585,9.2518 8.9778295,9.2023 8.9565855,9.13499 8.9631455,9.06219 l 0.3581095,-3.96737 0.822468,1.7e-4 -0.130361,1.44425 c -0.020876,0.2311 0.05055,0.44933 0.201165,0.61451 0.150298,0.1649 0.360268,0.25573 0.591112,0.25573 l 1.600061,0 -0.145869,1.61642 z" />
                  </svg>
                  <p className="text-purple-300 lg:text-pink-500">
                    <span className="text-purple-600 lg:text-pink-500">
                      Shipping:
                    </span>{" "}
                    Free Shipping
                  </p>
                </div>
                <div className="flex items-center gap-7">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <clipPath id="y5tTz11">
                        <rect width="96" height="96" />
                      </clipPath>
                    </defs>
                    <g id="time" clip-path="url(#y5tTz11)">
                      <g id="pills" transform="translate(-348 -232)">
                        <g id="Group_148" data-name="Group 148">
                          <circle
                            id="Ellipse_332"
                            data-name="Ellipse 332"
                            cx="44"
                            cy="44"
                            r="44"
                            transform="translate(352 236)"
                            fill="none"
                            className="stroke-purple-900 lg:stroke-pink-900"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                          />
                          <line
                            id="Line_1"
                            data-name="Line 1"
                            y2="32"
                            transform="translate(396 248)"
                            fill="none"
                            className="stroke-purple-900 lg:stroke-pink-900"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                          />
                          <line
                            id="Line_2"
                            data-name="Line 2"
                            x1="20"
                            transform="translate(396 280)"
                            fill="none"
                            className="stroke-purple-900 lg:stroke-pink-900"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p className="text-purple-300 lg:text-pink-500">
                    <span className="text-purple-600 lg:text-pink-500">
                      Delivery:
                    </span>{" "}
                    Expected in 3–5 Business Days
                  </p>
                </div>
                <div className="flex items-center gap-7">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4608 1.50732C11.2607 0.539132 12.7446 0.539132 13.5445 1.50732L14.7445 2.95979C15.1677 3.472 15.8176 3.74061 16.4789 3.67664L18.3571 3.49495C19.6102 3.37372 20.6624 4.42666 20.5402 5.67974L20.3597 7.53129C20.2949 8.1958 20.566 8.84883 21.0823 9.2721L22.5232 10.4533C23.4993 11.2534 23.4993 12.7466 22.5232 13.5467L21.0823 14.7279C20.566 15.1512 20.2949 15.8042 20.3597 16.4687L20.5402 18.3203C20.6624 19.5733 19.6102 20.6263 18.3571 20.505L16.4789 20.3234C15.8176 20.2594 15.1677 20.528 14.7445 21.0402L13.5445 22.4927C12.7446 23.4609 11.2607 23.4609 10.4608 22.4927L9.26079 21.0402C8.83761 20.528 8.18769 20.2594 7.52637 20.3234L5.64824 20.505C4.39507 20.6263 3.34293 19.5733 3.4651 18.3203L3.64562 16.4687C3.71041 15.8042 3.43933 15.1512 2.92298 14.7279L1.48208 13.5467C0.505968 12.7466 0.505968 11.2534 1.48208 10.4533L2.92298 9.2721C3.43933 8.84883 3.71041 8.1958 3.64562 7.53129L3.4651 5.67974C3.34293 4.42666 4.39507 3.37372 5.64824 3.49495L7.52637 3.67664C8.18769 3.74061 8.83761 3.472 9.26079 2.95979L10.4608 1.50732Z"
                      stroke="#ffffff"
                      className="stroke-purple-900 lg:stroke-pink-900"
                      stroke-width="1.5"
                    />
                    <path
                      d="M8.12549 12.7725L10.4136 15.0516C10.8437 15.48 11.5531 15.4296 11.9182 14.9446L15.8801 9.68274"
                      stroke="#ffffff"
                      className="stroke-purple-900 lg:stroke-pink-900"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>{" "}
                  <p className="text-purple-300 lg:text-pink-500">
                    <span className="text-purple-600 lg:text-pink-500">
                      Warranty:
                    </span>{" "}
                    1 Year Manufacturer Warranty
                  </p>
                </div>
                <div className="flex items-center gap-7">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke-width="3"
                    stroke="#ffffff"
                    className="stroke-purple-900 lg:stroke-pink-900"
                    fill="none"
                  >
                    <path
                      d="M54.89,26.73A23.52,23.52,0,0,1,15.6,49"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9,37.17a23.75,23.75,0,0,1-.53-5A23.51,23.51,0,0,1,48.3,15.2"
                      stroke-linecap="round"
                    />
                    <polyline
                      points="37.73 16.24 48.62 15.44 47.77 5.24"
                      stroke-linecap="round"
                    />
                    <polyline
                      points="25.91 47.76 15.03 48.56 15.88 58.76"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-purple-300 lg:text-pink-500">
                    <span className="text-purple-600 lg:text-pink-500">
                      Return Policy:
                    </span>{" "}
                    Eligible for return within 14 days
                  </p>
                </div>

                <div className="flex items-center gap-7">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    id="meteor-icon-kit__solid-discount"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.03363 23.363C8.55231 23.5941 7.97435 23.4063 7.72078 22.9364L6.15806 20.0406L2.92109 19.4492C2.39586 19.3533 2.03866 18.8616 2.1097 18.3325L2.54754 15.0712L0.276386 12.6901C-0.0921287 12.3037 -0.0921287 11.696 0.276386 11.3097L2.54754 8.9286L2.1097 5.66731C2.03866 5.13814 2.39586 4.64649 2.92109 4.55054L6.15806 3.95915L7.72078 1.06336C7.97435 0.593489 8.55231 0.405698 9.03363 0.636787L12 2.06098L14.9664 0.636787C15.4477 0.405698 16.0257 0.593489 16.2792 1.06336L17.8419 3.95915L21.0789 4.55054C21.6041 4.64649 21.9613 5.13814 21.8903 5.66731L21.4525 8.9286L23.7236 11.3097C24.0921 11.696 24.0921 12.3037 23.7236 12.6901L21.4525 15.0712L21.8903 18.3325C21.9613 18.8616 21.6041 19.3533 21.0789 19.4492L17.8419 20.0406L16.2792 22.9364C16.0257 23.4063 15.4477 23.5941 14.9664 23.363L12 21.9388L9.03363 23.363ZM10.2071 15.207C9.81658 15.5975 9.18342 15.5975 8.79289 15.207C8.40237 14.8165 8.40237 14.1833 8.79289 13.7928L13.7929 8.79278C14.1834 8.40226 14.8166 8.40226 15.2071 8.79278C15.5976 9.18331 15.5976 9.81647 15.2071 10.207L10.2071 15.207ZM9.5 10.9999C8.67157 10.9999 8 10.3283 8 9.49989C8 8.67146 8.67157 7.99989 9.5 7.99989C10.3284 7.99989 11 8.67146 11 9.49989C11 10.3283 10.3284 10.9999 9.5 10.9999ZM14.5 15.9999C13.6716 15.9999 13 15.3283 13 14.4999C13 13.6715 13.6716 12.9999 14.5 12.9999C15.3284 12.9999 16 13.6715 16 14.4999C16 15.3283 15.3284 15.9999 14.5 15.9999Z"
                      fill="#758CA3"
                      className="fill-purple-900 lg:fill-pink-900"
                    />
                  </svg>
                  <p className="text-purple-600 lg:text-pink-500">
                    15% OFF – Use code SAVE15
                  </p>
                </div>

                <div className="flex items-center mt-8 gap-5">
                  <div className="text-purple-300 lg:text-pink-500">
                    {item.icon.map((icon, idx) => (
                      <i key={idx} className={icon}></i>
                    ))}
                  </div>
                  <p className="text-purple-300 lg:text-pink-500">
                    {" "}
                    {`${item.reviews} Reviews`}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ReturnOrders;
