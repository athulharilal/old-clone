import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext, FirebaseContext } from "./Store/Context";
// import { auth } from "../src/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./Store/PostContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import View from "./Components/View/View";

function App() {
  const { setUser } = useContext(AuthContext);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
