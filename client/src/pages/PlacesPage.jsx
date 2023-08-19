import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { ReactComponent as UploadIcon } from "../assets/upload.svg";

const PlacesPage = () => {
  let { action } = useParams();

  const [input, setInput] = useState({
    title: "",
    address: "",
    photoLink: "",
    photos: [],
    description: "",
    perks: [],
    extra: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  const inputHeader = (text) => <h2 className="text-2xl">{text}</h2>;
  const inputDesc = (text) => <p className="text-sm text-gray-400">{text}</p>;
  const inputInfo = (header, desc) => (
    <>
      {inputHeader(header)}
      {inputDesc(desc)}
    </>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const addPhotoLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-photo/link", {
      link: input.photoLink,
    });
    setInput((prevInput) => ({
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
    setInput((prevInput) => ({
      ...prevInput,
      photos: [...prevInput.photos, ...filenames],
    }));
  };

  return (
    <div>
      {action !== "new" && (
        <div className="mt-2 text-center">
          <Link
            className="py-2 px-4 bg-primary font-semibold text-black rounded-full inline-flex items-center gap-1"
            to="/account/places/new"
          >
            <PlusIcon className="w-6 stroke-2" />
            Add
          </Link>
        </div>
      )}
      {action === "new" && (
        <form className="mx-auto max-w-2xl ">
          {inputInfo("Title", "Add a short and concise title")}
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            placeholder="Title, e.g. My Lovely Apartment"
          />
          {inputInfo("Address", "Add the full address of your place")}
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
            placeholder="Address, e.g. My Lovely Apartment"
          />
          {inputInfo("Photos", "Add photos of your place, more is better!")}
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="photoLink"
              value={input.photoLink}
              onChange={handleChange}
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
            {input.photos.length > 0 &&
              input.photos.map((photo, index) => (
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
          {inputInfo("Description", "Add a full description of your place")}
          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-third mb-1 py-2 px-3 rounded-2xl text-white placeholder:text-gray-300"
            placeholder="Description, e.g. My Lovely Apartment"
          />
          {inputInfo("Perks", "Select all that apply")}
          <Perks selected={input.perks} onChange={setInput} />
          {inputInfo("Extra Information", "Add rules and things to know")}
          <textarea
            type="text"
            name="extra"
            value={input.extra}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-third mb-1 py-2 px-3 rounded-2xl text-white placeholder:text-gray-300"
            placeholder="Description, e.g. My Lovely Apartment"
          />
          {inputInfo(
            "Max Guests, Check in & Out Times",
            "Add guest limit and checking in & out times"
          )}
          <div className="mt-1 grid grid-cols-3 gap-2">
            <div>
              <h3>Max Guests</h3>
              <input
                type="number"
                name="guests"
                value={input.guests}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div>
              <h3>Check In Time</h3>
              <input
                type="datetime-local"
                name="checkIn"
                value={input.checkIn}
                onChange={handleChange}
              />
            </div>
            <div>
              <h3>Check Out Time</h3>
              <input
                type="datetime-local"
                name="checkOut"
                value={input.checkOut}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
