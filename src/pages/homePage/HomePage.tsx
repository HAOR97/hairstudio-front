import FooterHome from "../../components/FooterHome";
import NavbarHome from "../../components/NavbarHome";

function HomePage() {

  return (
    <div>      

      <NavbarHome current={"Home"} />
      <div className=" flex flex-col justify-center items-center gap-3">
        <img src="../../public/logo-barber.png" alt="Logo" />
        <span className=" text-2xl font-bold text-center">The first and oldest barbershop in town where older and modern cultures meet.</span>

        <span className="text-center w-3/4">A place where you can have your hair styled however you like – it's like a teleporter to the '80s, '60s, or even the future!</span>
      </div>

      <FooterHome />
    </div>
  );
}

export default HomePage;
