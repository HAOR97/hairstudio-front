import { Link } from "react-router-dom";
import "../style/navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function NavbarHome({ current }: { current: string }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((state) => !state);
  };

  return (
    <div className="bg-black p-3 h-20 flex items-center flex-row-reverse shrink-0">
      <div id="navbar" className={!open ? "w-full flex justify-between gap-8 md:px-28":"active w-full flex justify-between gap-8"}>
        <div id="navbar2" className="flex gap-8">
          <Link
            to={"/"}
            className={
              current == "Home"
                ? "text-white text-2xl border-b-2 border-white"
                : "text-white text-2xl"
            }
          >
            Home
          </Link>
          <Link
            to={"/aboutus"}
            className={
              current == "About"
                ? "text-white text-2xl border-b-2 border-white"
                : "text-white text-2xl"
            }
          >
            About Us
          </Link>
          <Link
            to={"/contact"}
            className={
              current == "Contact"
                ? "text-white text-2xl border-b-2 border-white"
                : "text-white text-2xl"
            }
          >
            Contact
          </Link>
        </div>
        <div>
          <Link className="p-0" to={"/booking"}>
            <button className=" bg-white hover:bg-yellow-400 text-black p-2 flex align-middle text-center">
              Make appoiment
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row-reverse" onClick={handleClick} id="mobile">
        {!open ? (
          <MenuIcon style={{ color: "white" }} />
        ) : (
          <CloseIcon style={{ color: "white" }} />
        )}
      </div>
    </div>
  );
}
