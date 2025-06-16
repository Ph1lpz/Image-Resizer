import { FaImage } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import ResizeArea from "../resizeArea/ResizeArea";
function Home() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileTypeError, setFileTypeError] = useState({
    message: "",
    fileErr: false,
  });
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

  useEffect(() => {
  if (fileTypeError.fileErr) {
    const timer = setTimeout(() => {
      setFileTypeError(prev => ({
        ...prev,
        message: '',
        fileErr: false
      }));
    }, 8000);

    return () => clearTimeout(timer); 
  }
}, [fileTypeError.fileErr])

  return (
    <>
      {file ? (
        <ResizeArea image={previewUrl} imageFile={file} />
      ) : (
        <main className="h-[95vh] w-[80%] mx-auto relative">
          {fileTypeError.fileErr && (
            <div role="alert" className="alert alert-error alert-soft mt-4">
              <span>Error! {fileTypeError.message}</span>
            </div>
          )}
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
            onTypeError={(err) => {
              setFileTypeError({
                ...fileTypeError,
                message: err,
                fileErr: true,
              });
            }}
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

export default Home;
