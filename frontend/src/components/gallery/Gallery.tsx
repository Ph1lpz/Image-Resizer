import { IoImages } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import ResizeArea from "../resizeArea/ResizeArea";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export interface IMAGE {
  id: number;
  name: string;
  path: string;
  originalPath: string | null;
  created_at: Date;
}
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
function Gallery() {
  const [images, setImages] = useState([]);
  const [imageId, setImageId] = useState({});
  const [previewImg , setPreviewImg] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/images");
        setImages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-4xl font-semibold">Loading...</div>;
  if (error)
    return (
      <div className="text-4xl font-semibold text-red-500">Error: {error}</div>
    );
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/images/${id}`);
      setImages((prevImages) =>
        prevImages.filter((image: IMAGE) => image.id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditName = async (id: number) => {
    try {
      await api.put(`/images/${id}`, { name: newName });
      //@ts-expect-error ...
      setImages((prevImages) =>
        prevImages.map((image: IMAGE) =>
          image.id === id ? { ...image, name: newName } : image
        )
      );

      setNewName("");
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  const handleResizing = async (id: number) => {
    try {
      const response = await api.get(`/images/${id}`);
      setImageId(id);
      const previewImgPath = response.data.originalPath.split("\\").pop()
      setPreviewImg(previewImgPath)
      setIsResizing(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {isResizing && imageId ? (
        <ResizeArea
          image={`http://localhost:8000/static/images/${previewImg}`}
          id={imageId}
        />
      ) : (
        <main>
          <h1 className="text-5xl font-bold my-15 mx-20 p-2 rounded-md shadow-sm bg-base-300">
            Gallery <IoImages className="inline-block" />
          </h1>
          <div className="grid grid-cols-3 grid-rows-1 gap-4  place-items-center max-lg:grid-cols-2 max-md:grid-cols- max-sm:grid-cols-1">
            {images.length === 0 ? (
              <div>No images found.</div>
            ) : (
              images.map((image: IMAGE) => {
                const isNew =
                  Date.now() - new Date(image.created_at).getTime() <
                  ONE_DAY_MS;
                return (
                  <div
                    className="card bg-base-100 w-96 shadow-sm max-lg:w-[90%] max-md:card-sm"
                    key={image.id}
                  >
                    <figure>
                      <img
                        src={`http://localhost:8000/static${image.path}`}
                        alt={image.name}
                        className="aspect-16/9 object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {image.name}
                        {isNew && (
                          <div className="badge badge-secondary">NEW</div>
                        )}
                      </h2>
                      <div className="flex justify-between mx-4 my-4">
                        <ModalButton
                          buttonName={"Edit name"}
                          button2Name={"Edit"}
                          className={"bg-teal-400 text-teal-800"}
                          modalTitle={`Image name Editing`}
                          modalMessage={`You're editing image (${image.name})`}
                          modalId={`edit-modal-${image.id}`}
                          onClick={() => handleEditName(image.id)}
                        >
                          <input
                            type="text"
                            placeholder="Type here  new name"
                            className="input"
                            value={newName}
                            onChange={(e) => {
                              setNewName(e.target.value);
                            }}
                          />{" "}
                        </ModalButton>
                        <button
                          onClick={() => {
                            handleResizing(image.id);
                          }}
                          className="bg-gray-800 text-white cursor-pointer px-2 rounded-md shadow-md "
                        >
                          <TbEdit className="inline-block mr-1" />
                          Resize
                        </button>
                        <ModalButton
                          buttonName={"Delete"}
                          button2Name={"Delete"}
                          className={"btn-error"}
                          modalTitle={"Warning"}
                          modalMessage={`Are you sure you want to delete image (${image.name}) ?`}
                          modalId={`delete-modal-${image.id}`}
                          onClick={() => handleDelete(image.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      )}
    </>
  );
}

const ModalButton = ({
  className,
  buttonName,
  modalMessage,
  modalTitle,
  modalId,
  button2Name,
  onClick,
  children,
}) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`btn btn-sm ${className}`}
        onClick={() => document.getElementById(modalId).showModal()}
      >
        {buttonName}
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{modalMessage}</p>
          {children}
          <div className="modal-action">
            <form method="dialog" className="[&>button]:mx-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error btn-sm">Cancel</button>
              <button className="btn btn-success btn-sm px-4" onClick={onClick}>
                {button2Name}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Gallery;
