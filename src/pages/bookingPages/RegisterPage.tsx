import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import InputRegister from "../../components/inputRegister";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  surname: string;
  flag: string;
  phone: string;
  email: string;
  password: string;
};

function RegisterPage() {
  const [values, setValues] = useState<User>({
    name: "",
    surname: "",
    flag: "user",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters!",
      label: "Username",
      pattern: "^.{3,16}$",
      required: true,
    },
    {
        id: 3,
        name: "email",
        type: "email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
    },
    {
        id: 4,
        name: "phone",
        type: "tel",
        errorMessage: "It should be a valid phone!",
        label: "Phone",
        required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      autoComplete: "on",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

       let result = await fetch("http://127.0.0.1:8000/api/singin", {
         method: "POST",
         body: JSON.stringify(values),
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
         },
       });
       result = await result.json();
       localStorage.setItem("user-info", JSON.stringify(result));
       if (result.status == 200) {
         navigate("/login");
       }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen flex justify-center items-center rounded">
        <form onSubmit={handleSubmit} className="flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl ">
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
            <InputRegister key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <Link to={"/login"}>
            <span className="text-blue-700 text-sm"> Imate nalog?</span>
          </Link>
          <button className="">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
