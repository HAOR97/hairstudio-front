import FooterHome from "../../components/FooterHome";
import NavbarHome from "../../components/NavbarHome";
interface MailtoProps {
  email: string;
  subject?: string;
  body?: string;
  children: React.ReactNode;
}

const Mailto: React.FC<MailtoProps> = ({
  email,
  subject = "",
  body = "",
  children,
}) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return (
    <a className="text-yellow-600" href={`mailto:${email}${params}`}>
      {children}
    </a>
  );
};

function ContactUS() {
  return (
    <div className="flex flex-col">
      <NavbarHome current={"Contact"} />

      <div className="flex flex-col pb-10 gap-5 mt-5 md:justify-around md:flex-row md:m-28">
        <div className=" md:w-3/6 max-w-xl h-full">
          <iframe
            className="shadow-2xl rounded-2xl w-5/6 m-auto"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5050.592972758134!2d20.460062567518186!3d44.81323435629271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab110fc8e91%3A0x9f48223e13ec9bda!2z0JHRg9C70LXQstCw0YAg0LTQtdGB0L_QvtGC0LAg0KHRgtC10YTQsNC90LAgMjgsINCR0LXQvtCz0YDQsNC0!5e0!3m2!1ssr!2srs!4v1708455958939!5m2!1ssr!2srs"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
        <div className=" md:w-3/6 max-w-xl">
          <div className=" pb-5 shadow-2xl rounded-2xl w-5/6 h-full m-auto border-0 ">
            <div className="flex flex-col gap-2 text-sm">
              <div className="text-xl flex flex-col ml-10 mt-5">
                <span className="text-3xl font-bold border-b-2 border-black w-fit mb-5">
                  Contact Us
                </span>
                <span>Bulevar Despota Stefana 28 , Belgrade</span>
                <span>11000</span>
                <span>Serbia</span>
                <span className="my-4">064 5783-235</span>
                <Mailto
                  email="beuty@gmail.com"
                  subject="Hello & Welcome"
                  body="Hello world!"
                >
                  beuty@gmail.com
                </Mailto>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}

export default ContactUS;
