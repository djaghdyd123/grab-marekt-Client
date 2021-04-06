import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/config.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace(`/`);
      })
      .catch((error) => {
        console.log(error);
        message.error(`에러가 발생했습니다.${error.message}`);
      });
  };

  // Upload 하면 Onchage가 불려지며 아래 함수가 호출, useState로 리 랜더링 된다.
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      console.log(imageUrl);
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">이미지</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-image" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholders">
                <img src="/images/icons/camera.png" />
                <span>{`${imageUrl}`}</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자명</div>}
          rules={[{ required: true, message: "판매자명을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력하세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품명칭</div>}
          rules={[{ required: true, message: "상품명을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품명을 입력하세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품가격</div>}
          rules={[{ required: true, message: "가격을 입력해주세요." }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품정보</div>}
          rules={[{ required: true, message: "상품을 소개해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            MaxLength={300}
            placeholder="상품 정보를 입력해주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
