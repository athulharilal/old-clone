import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../Store/Context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore,  addDoc,collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const date = new Date();

  const handleSubmit = async () => {
    try {
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `/image/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress event
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          // Handle error
          console.error("Upload error: ", error);
          setUploadProgress(0); // Reset progress
        },
        async () => {
          // Handle successful upload
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at: ", downloadURL);

            const db = getFirestore(firebase);
            const userData = {
              name,
              category,
              price,
              url: downloadURL,
              userID: user.uid,
              createdAt: date.toDateString(),
            };

            // Add data to Firestore with auto-generated document ID
            await addDoc(collection(db, "products"), userData);
            console.log("Data added successfully!");

            navigate("/");
          } catch (error) {
            console.error("Error inserting data: ", error);
          } finally {
            // Reset the form or perform other actions as needed
            setName("");
            setCategory("");
            setPrice("");
            setImage(null);
            setUploadProgress(0); // Reset progress
          }
        }
      );
    } catch (error) {
      console.error("Error uploading file or adding data to Firestore:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <progress value={uploadProgress} max="100" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
