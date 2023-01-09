import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Photo from "../models/photo";
import "./PhotoList.css";

interface Props {
  pic: Photo;
}

const PhotoList = ({ pic }: Props) => {
  const { account } = useContext(AuthContext);
  return (
    <li className="PhotoList">
      <p>{pic.title}</p>

      <img src={pic.url} alt="uploaded photo" />
    </li>
  );
};

export default PhotoList;
