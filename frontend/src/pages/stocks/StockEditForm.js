import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/StockCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function StockEditForm() {
  const [errors, setErrors] = useState({});

  const [stockData, setStockData] = useState({
    title: "",
    company_name: "",
    symbol: "",
    sector: "",
    order: "",
    order_date: "",
    order_price: "",
    quantity: "",
    content: "",
    image: "",
  });
  const {
    title,
    company_name,
    symbol,
    sector,
    order,
    order_date,
    order_price,
    quantity,
    content,
    image,
  } = stockData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/stocks/${id}/`);
        const { title, company_name, symbol, sector, order, order_date, order_price, quantity, content,  image, is_owner } = data;

        is_owner ? setStockData({ title, company_name, symbol, sector, order, order_date, order_price, quantity, content, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setStockData({
      ...stockData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setStockData({
        ...stockData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("company_name", company_name);
    formData.append("symbol", symbol);
    formData.append("sector", sector);
    formData.append("order", order);
    formData.append("order_date", order_date);
    formData.append("order_price", order_price);
    formData.append("quantity", quantity);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/stocks/${id}/`, formData);
      history.push(`/stocks/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          name="company_name"
          value={company_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.company_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Symbol</Form.Label>
        <Form.Control
          type="text"
          name="symbol"
          value={symbol}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.symbol?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Sector</Form.Label>
        <Form.Control
          as="select"
          name="sector"
          value={sector}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.sector?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Order</Form.Label>
        <Form.Control
          as="select"
          name="order"
          value={order}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.order?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Order Date</Form.Label>
        <Form.Control
          type="date"
          name="order_date"
          value={order_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.order_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Order Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          name="order_price"
          value={order_price}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.order_price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.quantity?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default StockEditForm;
