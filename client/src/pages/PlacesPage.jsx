import { Link } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

import { ReactComponent as WifiIcon } from "../assets/wifi.svg";
import { ReactComponent as ParkIcon } from "../assets/parking.svg";
import { ReactComponent as ThumbIcon } from "../assets/thumb.svg";
import { ReactComponent as TvIcon } from "../assets/tv.svg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };
    getPlaces();
  }, []);

  console.log(places);

  const iconType = (type) => {
    if (type === "wifi") {
      return <WifiIcon />;
    } else if (type === "parking") {
      return <ParkIcon />;
    } else if (type === "tv") {
      return <TvIcon />;
    } else {
      return <ThumbIcon />;
    }
  };

  return (
    <div className="xl:px-20 px-10 mt-4">
      <AccountNav />
      <div className="mt-2 text-center">
        <Link
          className="py-2 px-4 bg-primary font-semibold text-black rounded-full inline-flex items-center gap-1"
          to="/account/places/new"
        >
          <PlusIcon className="w-6 stroke-2" />
          Add
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={index} className="w-full bg-third rounded-xl flex gap-2">
              <img
                className="h-60 w-80 object-cover rounded-s-lg"
                src={"http://localhost:3000/routes/uploads/" + place.photos[0]}
              />
              <div className="grid grid-flow-col gap-4 py-2 px-4">
                <div className="flex flex-col gap-2 border-e border-second pr-4">
                  <div className="text-lg">
                    {place.title}
                    <div className="text-sm">{place.address}</div>
                  </div>
                  <div className="line-clamp-3 ">{place.desc}</div>
                  <div className="flex justify-evenly items-center my-auto">
                    <span className>Perks</span>
                    {place.perks.map((perk, index) => (
                      <label
                        key={index}
                        className="flex flex-col items-center text-lg border border-second w-20 py-3 rounded-2xl"
                      >
                        {iconType(perk)}
                        <span>{perk}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="w-32 flex flex-col justify-evenly">
                  <button className="primary">View</button>
                  <button className="primary">Edit</button>
                  <button className="primary">Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
