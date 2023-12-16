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

type BookingTablePropType = {
  reservations: Reservations[] | null;
  show: "frizer" | "user";
};

const BookingTable = ({ reservations, show }: BookingTablePropType) => {
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
              {reservations.map((r, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {r.date} / {startEndTime(r.time)}
                    </TableCell>
                    <TableCell align="center">{r[`id_${show}`]}</TableCell>
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
      )}
    </div>
  );
};

export default BookingTable;
