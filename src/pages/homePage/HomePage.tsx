import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <span>Home page</span>
      <Link to={"/booking"}>
        <button>Reserved</button>
      </Link>
    </div>
  );
}

export default HomePage;
