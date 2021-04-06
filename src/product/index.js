import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/config.js";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams(); // destructuring

  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);

        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (product === null) {
    return <h1>상품정보 로딩중입니다...</h1>;
  }
  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY/MM/DD")}
        </div>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
