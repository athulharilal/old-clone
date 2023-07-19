import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { FirebaseContext } from "../../Store/Context";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext); // Update the context variable name

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        const uid = user.uid;

        const userData = {
          id: user.uid,
          username: userName,
          phone: phone,
        };

        // Access Firestore instance from FirebaseContext
        const db = getFirestore(firebase);

        // Insert data into Firestore
        setDoc(doc(db, "users", uid), userData)
          .then(() => {
            console.log("Data inserted successfully!");
          })
          .catch((error) => {
            console.error("Error inserting data: ", error);
          });

        // Update user profile display name
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then((displayName) => {
            console.log(displayName,"User profile updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating user profile: ", error);
          });

        // Continue with navigation or any other logic
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error creating user:", error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
