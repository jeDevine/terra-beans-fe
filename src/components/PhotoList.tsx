import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Photo from "../models/photo";
import "./PhotoList.css";

interface Props {
  pic: Photo;
}

const PhotoList = ({ pic }: Props) => {
  const { account } = useContext(AuthContext);
  const isVideo = (pic: any): boolean => {
    console.log(pic);
    return pic.url.match(/\.mov/i);
  };
  return (
    <li className="PhotoList">
      <p>{pic.title}</p>

      {isVideo(pic) ? (
        <video src={pic.url} height={340} controls></video>
      ) : (
        <img src={pic.url} alt="uploaded photo" />
      )}
    </li>
  );
};

export default PhotoList;
