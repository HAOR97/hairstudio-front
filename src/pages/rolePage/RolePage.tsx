import { Link } from "react-router-dom";

Link;
function RolePage() {
  return (
    <div className="flex justify-center items-center text-center min-h-screen">
      <div className="flex flex-col gap-2">
        <Link to={"/role/barber/login"}>
          <button className="w-64 px-3">Barber</button>
        </Link>
        <Link to={"/role/admin/login"}>
          <button className="w-64 px-3">Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default RolePage;
