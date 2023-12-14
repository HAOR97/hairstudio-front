import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { TableSortLabel } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { terminsTest } from "../../mock/barberTermins";
import dayjs from "dayjs";
import Profile from "../../components/Profile";

const DEFAULT_ORDERBY = "time";

function HomeBarber() {
  const [active, setActive] = useState(true);
  const [termi] = useState(terminsTest);
  const [selectDate, setSelectDate] = useState(dayjs());
  const [orderBy] = useState(DEFAULT_ORDERBY);
  const [order, setOrder] = useState("asc");
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Smith",
    phone: "555-5678",
    email: "jane.smith@example.com",
    years: 25,
    id: 2,
  });

  const navChange = (now: boolean) => {
    if (!now === active) {
      const changeActive = !active;
      setActive(changeActive);
    }
  };
  const handleDatePicker = (date) => {
    setSelectDate(date);
  };

  const handleOrder = () => {
    if (order == "asc") {
      const newOrder = "desc";
      setOrder(newOrder);
    } else {
      const newOrder = "asc";
      setOrder(newOrder);
    }
  };

  const parseTime = (time) => {
    console.log(time);
    const [hours, minutes] = time.split(":");
    return new Date(2000, 0, 1, hours, minutes);
  };

  const handleSort = () => {
    let sortedTimes;

    if (order === "asc") {
      sortedTimes = termi.termins.sort(
        (a, b) => parseTime(a.time) - parseTime(b.time)
      );
    } else {
      sortedTimes = termi.termins.sort(
        (a, b) => parseTime(b.time) - parseTime(a.time)
      );
    }
    console.log(sortedTimes);
    //setTermi({...termi,sortedTimes})
  };

  useEffect(() => {
    handleSort;
    console.log(order);
  }, [order]);

  return (
    <div>
      <nav>
        <ul className="p-5 flex flex-row gap-4">
          <li
            onClick={() => navChange(true)}
            className={
              active ? "cursor-pointer" : " cursor-pointer text-gray-400"
            }
          >
            Terms
          </li>
          <li
            onClick={() => navChange(false)}
            className={
              !active ? "cursor-pointer" : " cursor-pointer text-gray-400"
            }
          >
            Profile
          </li>
        </ul>
      </nav>

      <div className="p-5 max-w-7xl justify-center mx-auto gap-5">
        {active ? (
          <>
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={selectDate}
                    onChange={handleDatePicker}
                    disablePast={true}
                    className="w-full"
                    label="Select date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <TableContainer className="text-center border rounded-lg mt-5">
              <Table>
                <TableHead>
                  <TableRow className="font-medium">
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "time"}
                        direction={orderBy === "time" ? order : "asc"}
                        onClick={handleOrder}
                      >
                        <span className="font-bold">Time</span>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <span className="font-bold">Service</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="font-bold">Customer</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="font-bold">Delete</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {termi.termins.map((term, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{term.time}</TableCell>
                        <TableCell align="center">{term.service}</TableCell>
                        <TableCell align="center">{term.customer}</TableCell>
                        <TableCell align="center">
                          <button className="p-3">Delete</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Profile profil={profile} setProfile={setProfile} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeBarber;
