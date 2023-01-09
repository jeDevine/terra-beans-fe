import axios from "axios";
import { User } from "firebase/auth";
import Account from "../models/accounts";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const getAccounts = async (): Promise<Account[]> => {
  return await axios
    .get(`${baseUrl}/home`, {
      params: {},
    })
    .then((response) => response.data);
};

export const createAccount = async (account: Account): Promise<Account> => {
  return await axios
    .post(`${baseUrl}/home`, account)
    .then((response) => response.data);
};

export const getAccountByUid = async (uid: string): Promise<Account> => {
  return await axios
    .get(`${baseUrl}/home/${uid}`, {
      params: {},
    })
    .then((response) => response.data);
};

export const addPhoto = async (account: Account): Promise<Account> => {
  return await axios
    .put(`${baseUrl}/home/${account.uid}`, account)
    .then((response) => response.data);
};
