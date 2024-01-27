import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { TableSortLabel } from "@mui/material";
import { Reservations } from "../context/userContext";
import { startEndTime } from "../utils/convertDateFormat";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";

type BookingTablePropType = {
  reservations: Reservations[] | null;
  setReservations: React.Dispatch<React.SetStateAction<Reservations[] | null>>
  show: "frizer" | "user";
};


const BookingTable = ({ reservations,setReservations, show }: BookingTablePropType) => {
  
  const [loading,setLoading] = useState<boolean>(false)
  
  const deleteBooking = async (idBooking: number) => {
    setLoading(true)
    try {
      const respond = await fetch(
        `http://127.0.0.1:8000/api/booking/delete/${idBooking}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        );
        if (!respond.ok) {
          throw new Error();
        }
        
        setReservations(prevReservations => {
          if (prevReservations) {
            return prevReservations.filter(reservation => reservation.id !== idBooking);
          }
          return null; // handle the case where prevReservations is null
        });
        
        setLoading(false)
        
      } catch (err) {
        console.log("podeseno na null")
        setReservations(null)
        console.log(err);
        setLoading(false)
      }
    };
    
    return (
      <div className="my-7">
      {!reservations ? (
        <div className="font-bold text-lg text-center">
          Nemate jos nijednu rezervaciju!
        </div>
      ) : (
        <>
          <div className="font-bold text-lg text-center">Reservations:</div>
          <TableContainer className="text-center border rounded-lg mt-5">
            <Table>
              <TableHead>
                <TableRow className="font-medium">
                  <TableCell align="center">
                    <TableSortLabel>
                      <span className="font-bold">Date and Time</span>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <span className="font-bold">{show}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="font-bold">Delete</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((r) => {
                  return (
                    <TableRow key={r.id}>
                      <TableCell align="center">
                        {r.date} / {startEndTime(r.time)}
                      </TableCell>
                      <TableCell align="center">{r.name_frizOrUser}</TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => deleteBooking(r.id)}
                          className="px-5"
                        >
                          {!loading ?
                          "Delete"
                          :
                          <CircularProgress />
                        }
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default BookingTable;
