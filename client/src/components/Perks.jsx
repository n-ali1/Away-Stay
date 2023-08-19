/* eslint-disable react/prop-types */
import { ReactComponent as WifiIcon } from "../assets/wifi.svg";
import { ReactComponent as ParkIcon } from "../assets/parking.svg";
import { ReactComponent as ThumbIcon } from "../assets/thumb.svg";
import { ReactComponent as TvIcon } from "../assets/tv.svg";

const Perks = ({ selected, onChange }) => {
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    let perksArray = [];

    if (checked) {
      perksArray = [...selected, name];
      onChange((prevInput) => ({ ...prevInput, perks: perksArray }));
    } else {
      perksArray = [...selected.filter((unChecked) => unChecked !== name)];
      onChange((prevInput) => ({ ...prevInput, perks: perksArray }));
    }
  };

  return (
    <div className="my-2 grid grid-cols-3 xl:grid-cols-5 gap-2">
      <label className="flex flex-col items-center border rounded-2xl border-gray-600 bg-third">
        <WifiIcon />
        <span>Wi-Fi</span>
        <input type="checkbox" name="wifi" onChange={handleCheck} />
      </label>
      <label className="flex flex-col items-center border rounded-2xl border-gray-600 bg-third">
        <ParkIcon />
        <span>Parking</span>
        <input type="checkbox" name="parking" onChange={handleCheck} />
      </label>
      <label className="flex flex-col items-center border rounded-2xl border-gray-600 bg-third">
        <ThumbIcon />
        <span>Pets Allowed</span>
        <input type="checkbox" name="pets" onChange={handleCheck} />
      </label>
      <label className="flex flex-col items-center border rounded-2xl border-gray-600 bg-third">
        <ThumbIcon />
        <span>AC Available</span>
        <input type="checkbox" name="ac" onChange={handleCheck} />
      </label>
      <label className="flex flex-col items-center border rounded-2xl border-gray-600 bg-third">
        <TvIcon />
        <span>TV</span>
        <input type="checkbox" name="tv" onChange={handleCheck} />
      </label>
    </div>
  );
};

export default Perks;
