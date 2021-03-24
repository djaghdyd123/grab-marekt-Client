import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

function ProductPage() {
  const { id } = useParams(); // destructuring

  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(
        `https://3e442f63-277c-4fb1-bac7-8b5f93490b18.mock.pstmn.io/products/${id}`
      )
      .then(function (result) {
        setProduct(result.data);

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
        <img src={"/" + product.imageUrl} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductPage;
