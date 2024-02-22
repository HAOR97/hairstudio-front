import FooterHome from "../../components/FooterHome";
import NavbarHome from "../../components/NavbarHome";

function AboutUs() {
  return (
    <div  
    // style={{
    //   background: 'url("../../public/AboutUsImgEdited.jpeg")',
    //   //fontFamily: "Papyrus, sans-serif",
    // }}
    className=" md:bg-[url(../../public/AboutUsImgEdited.jpeg)] md:h-screen bg-white  bg-cover bg-center w-full h-max ">
      <NavbarHome current="About"/>
      <section
        className="p-16 text-center"
      >
        <div className="text-6xl text-yellow-400 mb-10">About Us</div>
        <div className="text-2xl text-yellow-400 ">
          At Brica, we're more than just a place to get a
          haircut – we're a community hub where style meets camaraderie. Our
          team of experienced barbers is dedicated to providing top-notch
          grooming services while creating an inviting atmosphere for all our
          clients.
          <br></br>
          <br></br>
          Founded on the principles of quality, craftsmanship, and customer
          satisfaction, Brica prides itself on delivering
          exceptional grooming experiences tailored to each individual. Whether
          you're looking for a classic haircut, a stylish fade, or a traditional
          straight razor shave, our skilled barbers are here to bring your
          vision to life.
          <br></br>
          
        </div>
      </section>
      <FooterHome />
    </div>
  );
}

export default AboutUs;
