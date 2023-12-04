import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Account from "../models/accounts";
import { getAccountsByYear } from "../services/terraBeans";
import PhotoList from "./PhotoList";
import "./YearPhotos.css";

const YearPhotos = () => {
  const [yearAccounts, setYearAccounts] = useState<Account[]>([]);
  let year = useParams().year as string;
  useEffect(() => {
    getAccountsByYear(year).then((res) => {
      setYearAccounts(res);
    });
  }, [year]);
  return (
    <div className="YearPhotos">
      <ul>
        {yearAccounts.map((account) =>
          account?.uploadedPhotos.map((pic, i) => (
            <PhotoList key={`${pic.title} ${i}`} pic={pic} />
          ))
        )}
      </ul>
    </div>
  );
};

export default YearPhotos;
