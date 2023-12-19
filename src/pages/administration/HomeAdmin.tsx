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
import { barbarsAll } from "../../mock/barbers";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext.tsx";

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
  p: 4,
  borderRadius: "5px",
};

function HomeAdmin() {
  const [barbars, setBarbars] = useState(barbarsAll);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [years, setYears] = useState<number | null>(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleNewBarber = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      phone == "" ||
      password == "" ||
      !years
    ) {
      console.log("unesita sva polja");
    } else {
      console.log(firstName, lastName, phone, email, years);
      console.log(barbars);
      setBarbars((b) => [
        ...b,
        { firstName, lastName, phone, email, years, id: barbars.length + 1 },
      ]);
    }
  };

  const deleteBarber: deleteBarberType = (e, id) => {
    e.preventDefault();
    const filterBarbers = barbars.filter((b) => b.id != id);
    setBarbars(filterBarbers);
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
            <form className="flex space-y-4 flex-col bg-white md:w-96 md:h-max w-screen h-screen p-8 rounded-xl ">
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
              <div className="flex flex-row justify-between">
                <div className="mr-1 w-6/12">
                  <label>First name*</label>
                  <input
                    className="w-full border border-solid border-neutral-300 rounded-md h-10 pl-2"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="ml-1 w-6/12">
                  <label>Last name*</label>
                  <input
                    className="w-full border border-solid border-neutral-300 rounded-md h-10 pl-2"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>E-mail*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Phone*</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Years*</label>
                <input
                  type="tel"
                  value={years ? years : ""}
                  onChange={(e) => setYears(parseInt(e.target.value))}
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
              <button onClick={handleNewBarber}>Continue</button>
            </form>
          </div>
        </Box>
      </Modal>
      





      <div className="flex flex-row w-full justify-between mb-7">
        
        <div className=" p-2 cursor-pointer mb-3 w-max rounded-md hover:bg-stone-100" onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            className="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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







      {/* <div className="flex flex-row-reverse ">
        <button onClick={handleOpen} className="px-3">
          New Barber
        </button>
      </div> */}
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
            {barbars.map((barbar) => {
              return (
                <TableRow key={barbar.id}>
                  <TableCell align="center">{barbar.firstName}</TableCell>
                  <TableCell align="center">{barbar.lastName}</TableCell>
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
    </div>
  );
}

export default HomeAdmin;
