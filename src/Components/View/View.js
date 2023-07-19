import React, { useEffect, useState, useContext } from "react";
import "./View.css";
import { PostContext } from "../../Store/PostContext";
import { FirebaseContext } from "../../Store/Context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function View() {
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userID } = postDetails;
        const userDocRef = doc(db, "users", userID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
