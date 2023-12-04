import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <nav>
        {/* <button
          onClick={() => {
            navigate(`/home`);
          }}
        >
          home
        </button>

        <button
          onClick={() => {
            navigate(`/year/2022`);
          }}
        >
          2022
        </button>

        <button
          onClick={() => {
            navigate(`/year/2023`);
          }}
        >
          2023
        </button> */}
      </nav>
    </div>
  );
};

export default Header;
