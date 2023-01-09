import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut, storage } from "../firebaseConfig";
import Account from "../models/accounts";
import { addPhoto, getAccounts } from "../services/terraBeans";
import "./Main.css";
import PhotoList from "./PhotoList";

const Main = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [newPhotoURL, setNewPhotoURL] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  console.log(date);

  const { account } = useContext(AuthContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, "uploaded-photos/" + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot.ref.fullPath);
        getDownloadURL(snapshot.ref).then((url) => setNewPhotoURL(url));
      });
    }
    setOpenForm(false);
  }
  const formRef = useRef<HTMLFormElement>(null);
  function clearForm() {
    formRef.current?.reset();
  }
  useEffect(() => {
    if (account && newPhotoURL) {
      let newPhoto = { url: newPhotoURL, title, date };
      account.uploadedPhotos.push(newPhoto);
      console.log(account);
      addPhoto(account).then((res) => console.log(res));
    }
    setTitle("");
  }, [newPhotoURL]);

  useEffect(() => {
    getAccounts().then((res) => setAccountList(res));
  }, [account?.uploadedPhotos.length]);

  return (
    <div className="Main">
      {account && (
        <div>
          {!openForm && (
            <button onClick={() => setOpenForm(true)}>Add Photo</button>
          )}
          {openForm && (
            <form onSubmit={handleSubmit} ref={clearForm}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input ref={fileInputRef} type="file" />
              <button>submit</button>
            </form>
          )}
          <ul>
            {accountList.map((account) =>
              account?.uploadedPhotos.map((pic, i) => (
                <PhotoList key={`${pic.title} ${i}`} pic={pic} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
