import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { ReactComponent as UploadIcon } from "../assets/upload.svg";
import Perks from "../components/Perks";

const PlacesPage = () => {
  let { action } = useParams();

  const [input, setInput] = useState({
    title: "",
    address: "",
    photoLink: "",
    photos: [],
    description: "",
    extra: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });
  const [perks, setPerks] = useState([]);

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
    e.preventDefault()
    await axios.post("/upload-photo", {link: input.photoLink})
  }
  console.log(action);
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
        <form className="mx-auto max-w-lg ">
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
            <button onClick={addPhotoLink} className="h-11 px-2 bg-third border border-gray-600 text-gray-300 rounded-2xl mb-2 ">
              Add&nbsp;Photo
            </button>
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-6 mb-2">
            <button className="py-4 bg-third border border-gray-600 text-gray-300 rounded-xl flex justify-center gap-2">
              <UploadIcon className="w-6 stroke-2" /> Upload
            </button>
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
          <Perks selected={perks} onChange={setPerks} />
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
                type="text"
                name="checkIn"
                value={input.checkIn}
                onChange={handleChange}
              />
            </div>
            <div>
              <h3>Check Out Time</h3>
              <input
                type="text"
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
