import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Modal,
  Box,
  TableBody,
} from "@mui/material";
//import { BarberType } from "../../context/userContext.tsx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.tsx";
import { UserType } from "../bookingPages/RegisterPage.tsx";
import { inputsNewUser as inputs } from "../../mock/InputsNewUser.tsx";
import InputRegister from "../../components/InputRegister.tsx";
import { BookingContext } from "../../context/bookingContext.tsx";


type deleteBarberType = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: number
) => void;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};


function HomeAdmin() {
  
  const {id_salon} = useContext(BookingContext)
  const flag = "frizer";
  const [values, setValues] = useState({
    name: "",
    surname: "",
    flag: flag,
    phone: "",
    email: "",
    smena: "prva",
    password: "",
    id_salon: id_salon,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, setUser, barbers, setBarbers } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/administration");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin-info");
    localStorage.removeItem("isLoggedInAdmin");
    setUser(null);
  };

  const deleteBarber: deleteBarberType = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      const respond = await fetch(
        `http://127.0.0.1:8000/api/AdminPanel/deleteBarbers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const result = await respond.json();
      if (result.status != 200) {
        throw new Error();
      }
      const filterBarbers = barbers?.filter((b) => b.id != id) || [];
      setBarbers(filterBarbers);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCreateNewStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values)
    try {
      const respond = await fetch(
        "http://127.0.0.1:8000/api/AdminPanel/create/barbers",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

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

        throw new Error();
      } else {
        const result = await respond.json();
        console.log(result.data)
        setBarbers((prevBarbers) => [...(prevBarbers || []), result.data]);
        setOpen(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 max-w-7xl justify-center mx-auto gap-5">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center items-center rounded">
            <form
              onSubmit={handleCreateNewStaff}
              className="flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl "
            >
              <div className="flex flex-row justify-end mb-4">
                <div onClick={handleClose} className="cursor-pointer p-0">
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
                </div>
              </div>
                <div className="text-center text-xl font-bold">New staff</div>
              {inputs.map((input) => (
                <InputRegister key={input.id} {...input} onChange={onChange} />
              ))}
              {error && (
                <span className="text-red-500 text-sm ">{errorText}</span>
              )}
              <button>Continue</button>
            </form>
          </div>
        </Box>
      </Modal>

      <div className="flex flex-row w-full justify-between mb-7">
        <div
          className=" p-2 cursor-pointer mb-3 w-max rounded-md hover:bg-stone-100"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </div>
        <h1 className="font-bold text-4xl">Admin</h1>
        <div
          className=" p-2 cursor-pointer mb-3 w-max rounded-md hover:bg-stone-100"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </div>
      {barbers && (
        <TableContainer className="text-center border rounded-lg mt-5">
          <Table>
            <TableHead>
              <TableRow className="font-medium">
                <TableCell align="center">
                  <span className="font-bold">Name</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold">Last Name</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold">email</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold">phone</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold">Delete</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barbers.map((barbar: UserType) => {
                return (
                  <TableRow key={barbar.id}>
                    <TableCell align="center">{barbar.name}</TableCell>
                    <TableCell align="center">{barbar.surname}</TableCell>
                    <TableCell align="center">{barbar.email}</TableCell>
                    <TableCell align="center">{barbar.phone}</TableCell>
                    <TableCell align="center">
                      <button
                        onClick={(e) => deleteBarber(e, barbar.id)}
                        className="p-3"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default HomeAdmin;
