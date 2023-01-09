import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import Account from "../models/accounts";
import { createAccount, getAccountByUid } from "../services/terraBeans";
import AuthContext from "./AuthContext";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [bogey, setBogey] = useState<Account | null>(null);
  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        getAccountByUid(newUser.uid).then((res) => {
          if (res) {
            setUser(newUser);
            setAccount({
              uid: res.uid,
              email: res.email,
              photoURL: res.photoURL,
              displayName: res.displayName,
              uploadedPhotos: res.uploadedPhotos,
            });
          } else {
            //adding accounts
            createAccount({
              uid: newUser.uid,
              email: newUser.email || "",
              photoURL: newUser.photoURL || "",
              displayName: newUser.displayName || "",
              uploadedPhotos: [],
            }).then((response) => {
              setAccount(response);
            });
            //safe mode
            // setUser(null);
            // setAccount(null);
            // setBogey(res);
          }
        });
      } else {
        setUser(null);
        setAccount(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, account }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
