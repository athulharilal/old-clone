import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../Store/Context";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../Store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate();



  const fetchProducts = async () => {
    try {
      const productsCollection = await getDocs(collection(db, "products"));
      const productsData = [];

      productsCollection.forEach((product) => {
        const data = product.data();
        productsData.push(data);
      });
      console.log(productsData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <div className="cards">
            {products.map((product) => {
              return (
                <div className="card"
                onClick={()=>{
                  setPostDetails(product)
                  navigate("/view");

                }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="card">
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src="../../../Images/R15V3.jpg" alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; 250000</p>
            <span className="kilometer">Two Wheeler</span>
            <p className="name"> YAMAHA R15V3</p>
          </div>
          <div className="date">
            <span>Tue May 04 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
