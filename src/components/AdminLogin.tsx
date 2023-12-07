import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({userType} : string) {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/role/${userType}/home`);
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center rounded">
      <form className="flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl">
        <div className="flex flex-row justify-between mb-4">
          <label className="text-2xl">Log in</label>
          <Link to={"/role"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col">
          <label>E-mail*</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="">
          Continue
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
