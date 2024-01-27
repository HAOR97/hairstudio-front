import { Link } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CircularProgress } from "@mui/material";

function LoginAdministration() {
  const { setUser } = useContext(UserContext);
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const navigate = useNavigate();

  type loginType = {
    email: string;
    password: string;
  };

  const fetchLogin = useCallback(
    async (data: loginType) => {
      try {
        const respond = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (!respond.ok) {
          setError(true);
          throw new Error();
        } else {
          const result = await respond.json();
          if (result.dataUser[0].flag == "frizer") {
            localStorage.setItem("admin-info", JSON.stringify(data));
            localStorage.setItem("isLoggedInAdmin", "true");
            setUser(result.dataUser[0]);
            setLoadingFetch(false)
            navigate("/administration/staff");
          } else if (result.dataUser[0].flag == "admin") {
            localStorage.setItem("admin-info", JSON.stringify(data));
            localStorage.setItem("isLoggedInAdmin", "true");
            setUser(result.dataUser[0]);
            setLoadingFetch(false)
            navigate("/administration/admin");
          } else {
            setError(true);
            setLoadingFetch(false)
            throw new Error();
          }
        }
      } catch (err) {
        setLoadingFetch(false)
        console.log(err);
      }
    },
    [navigate, setUser]
  );

  useEffect(() => {
    if (localStorage.getItem("isLoggedInAdmin")) {
      setLoadingFetch(true)
      fetchLogin(JSON.parse(`${localStorage.getItem("admin-info")}`));
    }
  }, [fetchLogin]);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    fetchLogin({ email: mail, password: password });
  };

  return loadingFetch ? (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center rounded">
      <form className="flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl">
        <div className="flex flex-row justify-between mb-4">
          <label className="text-2xl">Log in</label>
          <Link to={"/"}>
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
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <span className="text-red-500 text-sm ">
            Wrong E-mail or password!
          </span>
        )}
        <button onClick={handleLogin} className="">
          Continue
        </button>
      </form>
    </div>
  );
}

export default LoginAdministration;
