import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/accounts";

interface AuthContextModel {
  user: User | null;
  account: Account | null;
}

const defaultValues: AuthContextModel = {
  account: null,
  user: null,
};

const AuthContext = createContext(defaultValues);

export default AuthContext;
