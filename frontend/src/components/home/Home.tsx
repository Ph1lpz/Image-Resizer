import { FaImage } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoImages } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import api from "../../api/axios";
function Home() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFile(file);
      console.log(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      {file ? (
        <ResizeArea image={previewUrl} imageFile={file} />
      ) : (
        <main className="h-[95vh] w-[80%] mx-auto relative">
          <div className="mt-30">
            <h1 className="text-4xl font-semibold">Pixel Flow</h1>
            <p className="text-xl">a simple image resizer</p>
            <p className="text-lg [&>span]:text-purple-500">
              Supported formats are
              <span className="ml-1">JPG</span>,<span>PNG</span>,
              <span>GIF</span>,<span>JPEG</span>, only
            </p>
          </div>

          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <div className="w-[900px] h-[300px] bg-primary mx-auto mt-20 rounded-lg border border-gray-200 shadow-lg max-lg:w-auto">
              <FaImage className="text-7xl mx-auto mt-16 inputImage" />
              <fieldset className="fieldset flex flex-col items-center mt-5">
                <button className="bg-gray-800 text-gray-300 cursor-pointer p-3 px-9 rounded-md shadow-md inputImage">
                  Select Image
                </button>
                <label className="label inputImage">
                  or, drag and drop images here
                </label>
              </fieldset>
            </div>
          </FileUploader>
        </main>
      )}
    </>
  );
}
//@ts-expect-error unknown err
function ResizeArea({ image, imageFile }) {
  const [dimensions, setDimensions] = useState<{
    width: null | number;
    height: null | number;
  }>({ width: null, height: null });
  const [name, setName] = useState<string>("");
  const [submitted, setSubmmited] = useState<boolean>(false);
  const [response, setResponse] = useState<{
    resizedImage: string;
    message: string;
  }>({
    resizedImage: "",
    message: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("width", (dimensions.width ?? 0).toString());
    formData.append("height", (dimensions.height ?? 0).toString());
    formData.append("name", name);
    try {
      const response = await api.post("/resize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmmited(true);
      setResponse(response.data);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadFile = (url: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        //@ts-expect-error accept
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <>
      {image && !submitted && (
        <main className="flex justify-around  max-lg:block">
          <div>
            <h2 className="text-3xl font-semibold my-5">Uploaded Image</h2>
            <img
              src={image}
              alt="Preview"
              className="shadow-md rounded-md"
              style={{
                width:
                  dimensions.width !== null && dimensions.width >= 10
                    ? `${dimensions.width}px`
                    : undefined,
                height:
                  dimensions.height !== null && dimensions.height >= 10
                    ? `${dimensions.height}px`
                    : undefined,
              }}
            />
          </div>
          <div className="mt-20 bg-gray-100 w-[520px] h-[220px] flex items-center justify-around shadow-md relative max-md:w-auto max-md:mt-5 resizebg ">
            <div>
              <h2 className="fieldset-legend">Width (px)</h2>
              <input
                type="tel"
                className="bg-white w-[150px] h-[50px] border border-gray-300 outline-0 p-2 rounded-sm font-semibold placeholder:font-semibold "
                disabled={submitted}
                placeholder="Not set"
                maxLength={4} //@ts-expect-error accept null
                value={dimensions.width}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    e.target.value = "";
                  }
                  setDimensions({
                    ...dimensions,
                    width: Number(e.target.value),
                  });
                }}
              />
            </div>

            <div>
              <h2 className="fieldset-legend">Height (px)</h2>
              <input
                type="tel"
                className="bg-white w-[150px] h-[50px] border border-gray-300 outline-0 p-2 rounded-sm font-semibold placeholder:font-semibold"
                placeholder="Not set"
                disabled={submitted}
                maxLength={4} //@ts-expect-error accept null
                value={dimensions.height}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    e.target.value = "";
                  }
                  setDimensions({
                    ...dimensions,
                    height: Number(e.target.value),
                  });
                }}
              />
            </div>

            <div>
              <h2 className="fieldset-legend ">Name</h2>
              <input
                type="text"
                className="bg-white w-[150px] h-[50px] border border-gray-300 outline-0 p-2 rounded-sm font-semibold placeholder:font-semibold"
                placeholder="in gallery name"
                disabled={submitted}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="absolute bottom-0 right-0  bg-success text-white cursor-pointer p-1 px-4 m-3 rounded-md shadow-md inputImage disabled:bg-red-300 disabled:cursor-default"
              disabled={//@ts-expect-error accept null
                dimensions.width <= 10 ||
                //@ts-expect-error accept null
                dimensions.height <= 10 ||
                name === "" ||
                submitted
              }
            >
              Submit
            </button>
          </div>
        </main>
      )}
      {submitted && (
        <main className="flex items-center flex-col justify-center w-[100%] h-[80vh]">
          <h1 className="text-4xl font-semibold">{response.message}</h1>
          <img
            src={`http://localhost:8000/static${response.resizedImage}`}
            className="my-10"
          />
          <div className="[&>button]:mx-4">
            <button
              onClick={() => {
                downloadFile(
                  `http://localhost:8000/static${response.resizedImage}`
                );
              }}
              className="bg-green-500 text-black cursor-pointer p-3 px-8 rounded-md shadow-md inputImage"
            >
              <FaDownload className="inline-block mr-2" />
              Download
            </button>
            <button onClick={() => {
              window.location.reload()
            }} className="bg-indigo-500 text-gray-300 cursor-pointer p-3 px-5 rounded-md shadow-md inputImage">
              <IoIosArrowRoundBack className="inline-block text-2xl mr-2" />
              Back
            </button>
            <button className="bg-gray-800 text-gray-300 cursor-pointer p-3 px-8 rounded-md shadow-md inputImage">
              <Link to={"/gallery"}>
                <IoImages className="inline-block mr-2" />
                Gallery
              </Link>
            </button>
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
