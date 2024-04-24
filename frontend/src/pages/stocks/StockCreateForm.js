import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/StockCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function StockCreateForm() {
  const [errors, setErrors] = useState({});

  const [stockData, setStockData] = useState({
    title: "",
    content: "",
    symbol: "",
    company_name: "",
    sector: "",
    order: "",
    order_date: "",
    order_price: "",
    quantity: "",
    chart: "",
    image: "",
  });
  const { title, company_name, symbol, sector, order, order_date, order_price, quantity, image, chart, content } = stockData;

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

  const handleChangeChart = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(chart);
      setStockData({
        ...stockData,
        chart: URL.createObjectURL(event.target.files[0]),
      });
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
      <Form.Group>
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          name="company_name"
          value={company_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Symbol</Form.Label>
        <Form.Control
          type="text"
          name="symbol"
          value={symbol}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sector</Form.Label>
        <Form.Control
          as="select"
          name="sector"
          value={sector}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Order</Form.Label>
        <Form.Control
          as="select"
          name="order"
          value={order}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Order Date</Form.Label>
        <Form.Control
          type="date"
          name="order_date"
          value={order_date}
          onChange={handleChange}
        />
      </Form.Group>
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
      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
        />
      </Form.Group>
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

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
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
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
          </Container>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {chart ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={chart} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="chart-upload"
                    >
                      Change the chart
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="chart-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload a chart"
                  />
                </Form.Label>
              )}

              <Form.File
                id="chart-upload"
                accept="image/*"
                onChange={handleChangeChart}
              />
            </Form.Group>
          </Container>
          <div className="d-md-none">{textFields}</div>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default StockCreateForm;