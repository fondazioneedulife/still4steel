import { Button} from "react-bootstrap";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import "./Navbar.css"; // Se vuoi personalizzare con CSS

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar d-flex justify-content-between ">
      <div className="d-flex justify-content-start p-3">
        <Button variant="light" onClick={() => navigate(-1)}>
        <IoReturnUpBack size={30} />
        </Button>
      </div>

      {/* Logo centrale */}
      <div className="mx-auto">
        {/* <img src="/logoNavbar.png" alt="Logo Centrale" height="50" /> */}
      </div>

    </nav>
  );
}

export default Navbar;
