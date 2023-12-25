import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useNavigate } from "react-router-dom";
import InputRegister from "../../components/InputRegister";
import { inputsNewUser as inputs } from "../../mock/InputsNewUser";
import { CircularProgress } from "@mui/material";

export type UserType = {
  id:number;
  name: string;
  surname: string;
  flag: string;
  phone: string;
  email: string;
  smena?: string;
  password: string;
  id_salon?: number;
};

function RegisterPage() {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [values, setValues] = useState<UserType>({
    id:1,
    name: "",
    surname: "",
    flag: "user",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingFetch(true)
    try {
      const respond = await fetch("http://127.0.0.1:8000/api/singin", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!respond.ok) {
        if (respond.status < 500 && respond.status > 400) {
          setError(true);
          setErrorText(
            "Something information is wrong or the email already exists !"
            );
          }
          if (respond.status >= 500) {
            setError(true);
            setErrorText("Something is wrong with server !");
          }
          setLoadingFetch(false)
          
        } else {
          setLoadingFetch(false)
          const result = await respond.json();
          localStorage.setItem("user-info", JSON.stringify(result));
          if (result.status == 200) {
            navigate("/login");
          }
        }
      } catch (err) {
      setLoadingFetch(false)
      console.log(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen flex justify-center items-center rounded">
        <form
          onSubmit={handleSubmit}
          className={loadingFetch ? "flex space-y-4 flex-col pointer-events-none bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl ":"flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl "}
        >
          <div className="flex flex-row justify-between mb-4">
            <label className="text-2xl">Create account</label>
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
          {inputs.map((input) => (
            <InputRegister key={input.id} {...input} onChange={onChange} />
          ))}
          {error && <span className="text-red-500 text-sm ">{errorText}</span>}
          <div>
            <span className="text-sm"> Imate nalog?</span>
            <Link to={"/login"}>
              <span className="text-blue-700 text-sm"> Ulogujte se ovde!</span>
            </Link>
          </div>

          <button className={loadingFetch ? "bg-zinc-600 ":""}>
            {loadingFetch ? <CircularProgress className="p-2" /> : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
