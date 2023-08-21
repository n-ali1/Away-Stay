import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import PhotoUpload from "../components/PhotoUpload";
import Perks from "../components/Perks";
import axios from "axios";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

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
  const [msg, setMsg] = useState({});
  const [redirect, setRedirect] = useState(false);

  let status = {};

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

  const addNewPlace = async (e) => {
    e.preventDefault()
    const placeData = input;
    if (Object.values(placeData).some((val, i) => val === "" && i !== 2 )) {
      status = { error: true, msg: "Please fill in all the feilds." };
    } else {
      try {
        const res = await axios.post("/places", placeData);
        console.log(res.data)
        setRedirect(true);
      } catch (error) {
        console.error(error);
        status = { error: true, msg: "Place entry not saved, please try again." };
      }
    }
    setMsg(status)
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  
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
        <form onSubmit={addNewPlace} className="mx-auto max-w-2xl ">
          {msg.error && (
            <div className="text-center py-2 mb-2 rounded-2xl bg-red-900 mx-auto">
              {msg.msg}
            </div>
          )}
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
          <PhotoUpload
            photoLink={input.photoLink}
            photoFiles={input.photos}
            onInput={setInput}
          />
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
          {msg.error && (
            <div className="text-center py-2 mb-2 rounded-2xl bg-red-900 mx-auto">
              {msg.msg}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
