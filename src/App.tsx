import { useContext } from "react";
import "./App.css";
import Main from "./components/Main";
import AuthContext from "./context/AuthContext";
import { signInWithGoogle, signOut, storage } from "./firebaseConfig";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import YearPhotos from "./components/YearPhotos";
import Header from "./components/Header";

function App() {
  const { account } = useContext(AuthContext);

  return (
    <div className="App">
      {account ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in</button>
      )}
      {!account && (
        <div>
          <p>
            Please log in to access Terra Beans! If you do not have a google
            account you will need one.
          </p>
        </div>
      )}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/year/:year" element={<YearPhotos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
