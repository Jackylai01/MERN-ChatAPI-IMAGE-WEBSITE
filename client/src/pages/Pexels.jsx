import { useState, useEffect } from "react";
import { Loader, Picture } from "../components";
import axios from "axios";

const Pexels = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  //獲得全部的相片1-10張
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/api/pexels");
        setData(res.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mt-10">
        <h1 className="flex items-center justify-center font-extrabold text-[18px]">
          每日精選50張照片
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
        <Picture data={data} title="No search resultes found" />
      </div>
    </>
  );
};

export default Pexels;
