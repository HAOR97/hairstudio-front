import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterHome() {
  return (
    <div className="bg-black mt-auto static md:fixed md:bottom-0 text-white px-20 py-5 flex justify-between  w-screen gap-10">
      <div className="gap-10 flex ">
        <div className="flex flex-col  gap-4">
          <span>Bulevar Despota Stefana 28</span>
          <span>064 5783-235</span>
        </div>
        <div className="flex flex-col  gap-4">
          <span>Monday-Friday: 10AM - 7PM</span>
          <span>Saturday: 10Am - 6PM</span>
          <span>Sunday: CLOSED</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <a href="https://www.instagram.com/">
          <InstagramIcon className=" hover:text-yellow-400" />
        </a>
        @All Right Reserved.
      </div>
    </div>
  );
}
