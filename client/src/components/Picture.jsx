import React from "react";
import downArrow from "../assets/down-arrow.png";
import { downloadImage } from "../utils/index";

const Picture = ({ data }) => {
  return (
    <>
      {data &&
        data?.photos.map((post) => (
          <div
            className="rounded-x1 group relative shadow-card last:hover:shadow-cardhover card"
            key={post.id}
          >
            <img src={post.src.original} />
            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
              <p className="text-white text-sm overflow-y-auto prompt">
                {post.photographer}
              </p>
              <div className="mt-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm">{post.alt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadImage(post.id, post.src.original)}
                  className="outline-none bg-transparent border-none"
                >
                  <img
                    src={downArrow}
                    alt="下載"
                    className="w-6 h-6 object-contain invert"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Picture;
