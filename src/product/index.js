import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/config.js";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams(); // destructuring

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);

        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [product, setProduct] = useState(null);

  useEffect(function () {
    getProduct();
  }, []);
  if (product === null) {
    return <h1>상품정보 로딩중입니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가발생하였습니다. ${error.message}`);
      });
  };
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
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldOut === 1 ? true : false}
        >
          바로 구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
