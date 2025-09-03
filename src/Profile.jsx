import React from "react";
import Header from "./Header";

const Profile = () => {
  const storedCart = Number(localStorage.getItem("cartCounter")) || 0;

  return (
    <>
      <Header cartCounter={storedCart} />
      <div className="w-[80%] mx-auto mt-30 mb-15 lg:mt-40 flex items-center justify-center">
        <div className=" gap-[2px] text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-[2px]">
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-black  rounded-xl">
            <img
              src="profile.png"
              alt="profile"
              className="mx-auto h-full object-cover rounded-t-xl lg:rounded-none lg:rounded-l-xl"
            />

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className=" font-bold text-4xl text-purple-500 lg:text-pink-500">
                  Zeinab Hassan
                </h2>

                <p className="text-purple-300 lg:text-pink-300">Frontend Developer</p>
              </div>
              <p className="my-4 text-purple-400 lg:text-pink-400">
                Front-End Developer with skills in React.js, TypeScript, and
                Tailwind CSS. Experienced in building responsive, user-friendly
                web applications with clean code and good performance. Focused
                on modern design, smooth user experience, and continuous
                improvement in development skills.
              </p>

              <div className="flex gap-4">
                <div className="my-4">
                  <a
                    href="https://www.linkedin.com/in/zeinab-hassan-aab306344"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-purple-500 hover:stroke-purple-900 lg:stroke-pink-500 lg:hover:stroke-pink-900 transition-colors duration-300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>

                <div className="my-4">
                  {" "}
                  <a
                    href="https://github.com/zeinab712"
                    target="_blank"
                    rel="noopener noreferrer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ec4899"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="stroke-purple-500 hover:stroke-purple-900 lg:stroke-pink-500 lg:hover:stroke-pink-900 transition-colors duration-300"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
