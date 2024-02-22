import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.js";
import RegisterPage from "./pages/bookingPages/RegisterPage.js";
import LoginPage from "./pages/bookingPages/LoginPage.js";
import BookingLayot from "./pages/bookingPages/BookingLayout.tsx";
import BookingServicePage from "./pages/bookingPages/BookingServicePage.tsx";
import BookingStaffPage from "./pages/bookingPages/BookingStaffPage.tsx";
import BookingTimePage from "./pages/bookingPages/BookingTimePage.tsx";
import BookingConfirmPage from "./pages/bookingPages/BookingConfirmPage.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { BookingContextProvider } from "./context/bookingContext.tsx";
import HomeAdmin from "./pages/administration/HomeAdmin.tsx";
import HomeBarber from "./pages/administration/HomeBarber.tsx";
import LoginAdministration from "./pages/administration/LoginAdministration.tsx";
import ContactUS from "./pages/homePage/ContactUS.tsx";
import AboutUs from "./pages/homePage/AboutUs.tsx";

function App(){


  return (
    <>
      <BookingContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUS />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={
              <LoginPage />} />
            <Route path="/booking" element={<BookingLayot />}>
              <Route index element={<BookingServicePage />} />
              <Route path="/booking/staff" element={<BookingStaffPage />} />
              <Route path="/booking/time" element={<BookingTimePage />} />
              <Route path="/booking/confirm" element={<BookingConfirmPage />} />
            </Route>
            <Route path="/administration" >
              <Route index element={<LoginAdministration />} />
              <Route path="/administration/staff" element={<HomeBarber />} />
              <Route path="/administration/admin" element={<HomeAdmin />} />
            </Route> 
          </Routes>
        </UserContextProvider>
      </BookingContextProvider>
    </>
  );
}

export default App;
