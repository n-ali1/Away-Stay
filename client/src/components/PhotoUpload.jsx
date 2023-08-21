/* eslint-disable react/prop-types */
import { ReactComponent as UploadIcon } from "../assets/upload.svg";
import axios from "axios";

const PhotoUpload = ({ photoLink, photoFiles, onInput }) => {
  const addPhotoLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-photo/link", {
      link: photoLink,
    });
    onInput((prevInput) => ({
      ...prevInput,
      photoLink: "",
      photos: [...prevInput.photos, filename],
    }));
  };

  const uploadPhoto = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axios.post("/upload-photo/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    onInput((prevInput) => ({
      ...prevInput,
      photos: [...prevInput.photos, ...filenames],
    }));
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="photoLink"
          value={photoLink}
          onChange={(e) =>
            onInput((prevInput) => ({
              ...prevInput,
              photoLink: e.target.value,
            }))
          }
          placeholder="Add using a link"
        />
        <button
          onClick={addPhotoLink}
          className="h-11 px-2 bg-third border border-gray-600 text-gray-300 rounded-2xl mb-2 "
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 mb-2 gap-2">
        {photoFiles.length > 0 &&
          photoFiles.map((photo, index) => (
            <div key={index}>
              <img
                className="h-36 w-full rounded-2xl object-cover"
                src={"http://localhost:3000/routes/uploads/" + photo}
              />
            </div>
          ))}
        <label className="h-36 cursor-pointer py-4 xl:px-2 bg-third border border-gray-600 text-gray-300 rounded-xl flex justify-center items-center gap-2">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <UploadIcon className="w-6 stroke-2" /> Upload
        </label>
      </div>
    </>
  );
};

export default PhotoUpload;
