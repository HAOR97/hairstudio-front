import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import RegisterPage from "./pages/bookingPages/RegisterPage.js";
import LoginPage from "./pages/bookingPages/LoginPage.js";
import BookingLayot from "./pages/bookingPages/BookingLayout.tsx";
import BookingServicePage from "./pages/bookingPages/BookingServicePage.tsx";
import BookingStaffPage from "./pages/bookingPages/BookingStaffPage.tsx";
import BookingTimePage from "./pages/bookingPages/BookingTimePage.tsx";
import BookingConfirmPage from "./pages/bookingPages/BookingConfirmPage.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { BookingContextProvider } from "./context/bookingContext.tsx";
import RolePage from "./pages/RolePage.tsx"
import LoginBarber from "./pages/berberPages/LoginBarber.tsx";
import LoginAdmin from "./pages/adminPages/LoginAdmin.tsx";
import HomeAdmin from "./pages/adminPages/HomeAdmin.tsx";
import HomeBarber from "./pages/berberPages/HomeBarber.tsx";
import { Navigate } from "react-router-dom";
//promenjeno u githubu
//promena 2 u githubu

function App() {
  const loggedIn = localStorage.getItem("isLoggedIn")


  return (
    <>
      <BookingContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={
              //loggedIn ?  <Navigate to="/booking" />:
              <LoginPage />} />
            <Route path="/booking" element={<BookingLayot />}>
              <Route index element={<BookingServicePage />} />
              <Route path="/booking/staff" element={<BookingStaffPage />} />
              <Route path="/booking/time" element={<BookingTimePage />} />
              <Route path="/booking/confirm" element={<BookingConfirmPage />} />
            </Route>
            <Route path="/role" >
              <Route index element={<RolePage />} />
              <Route path="/role/barber/login" element={<LoginBarber />} />
              <Route path="/role/barber/home" element={<HomeBarber />} />
              <Route path="/role/admin/login" element={<LoginAdmin />} />
              <Route path="/role/admin/home" element={<HomeAdmin />} />
            </Route> 
          </Routes>
        </UserContextProvider>
      </BookingContextProvider>
    </>
  );
}

export default App;
