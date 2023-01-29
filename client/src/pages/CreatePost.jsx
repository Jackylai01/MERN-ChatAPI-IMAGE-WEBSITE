import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";
import preview from "../assets/preview.png";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const res = await axios.post("https://mern-jacky-chatapi.onrender.com/api/v1/dalle", {
          prompt: form.prompt,
        });
        console.log(res);
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${res.data.photo}`,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("請輸入關鍵字");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const res = await axios.post("https://mern-jacky-chatapi.onrender.com/post", {
          name: form.name,
          prompt: form.prompt,
          photo: form.photo,
        });
        console.log(res);
        navigate("/");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("請輸入關鍵字描述來建立圖片");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="max-w-7x1 mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px] ">
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community
          </p>
        </div>

        <form className="mt-16 max-w-3x1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labeLName="Your name"
              type="text"
              name="name"
              placeholder="Jacky Lai"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labeLName="Prompt"
              type="text"
              name="prompt"
              placeholder="Jacky Lai"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div
              className="relative bg-gray-50 border border-gray-300
               text-gray-900 text-sm  rounded-lg focus:ring-blue-500 
                focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center
               "
            >
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-3/12 h-2/5 object-contain opacity-40"
                />
              )}
              {generatingImg && (
                <div className="absolute inser-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5) rounded-lg]">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-black rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center font-medium "
            >
              {generateImage ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have created the image you want,you can share it with
              others in the community
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {loading ? "Sharing..." : "Share "}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
