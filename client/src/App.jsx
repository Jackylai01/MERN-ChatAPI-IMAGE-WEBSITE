import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import JACKY from "../src/assets/JACKY.png";
import { Home, CreatePost, Pexels } from "./pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header className="w-full flex justify-around items-center bg-white sm:px-8 px-4 py-4 border-b border-b[#e6ebf4]">
          <Link to="/">
            <img src={JACKY} alt="logo" className="w-28 object-contain " />
          </Link>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
          <Link
            to="/api/pexels"
            className="font-inter font-medium bg-[#ff7316] text-white px-4 py-2 rounded-md"
          >
            Pexels 圖集
          </Link>
        </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/api/pexels" element={<Pexels />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
