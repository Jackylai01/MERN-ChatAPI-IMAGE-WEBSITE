import axios from "axios";
import { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-x1 uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPosts] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/post");
        if (res.statusText === "OK") {
          setAllPosts(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <>
      <section className="max-w-7x1 max-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            ChatAPI 圖片生成
          </h1>

          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]  ">
            透過MERN 來進行，ChatAPI 與 Pexels API
            打造一個圖片集網站的參考平台。 並透過Tailwind 打造RWD
            的版型，透過Vite進行打包。圖片儲存位置為Cloudinary，Mongodb存放圖片URL的位置
            <br />
            <br />
            <span>
              <b>ChatAPI</b>
              使用方式為在Create裡面，輸入您的姓名與圖片生成的描述句，如:請給我一張台北101的照片。
            </span>
            <br />
            <span>
              <b>Pexels</b> 每日隨機機選50張相片
            </span>
          </p>
        </div>

        <div className="mt-16">
          <FormField
            labeLName="Seach posts"
            type="text"
            name="text"
            placeholder="Search posts"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-x1 mb-3 ">
                  Showing resultes for
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
            </>
          )}

          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
            {searchText ? (
              <RenderCards
                data={searchedResults}
                title="No search resultes found"
              />
            ) : (
              <RenderCards data={allPost} title="No posts found" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
