import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EarningCreateForm() {
  const [errors, setErrors] = useState({});

  const [earningData, setEarningData] = useState({
    ticker: "",
    earning_date: "",
  });
  const { ticker, earning_date } = earningData;

  const history = useHistory();

  const handleChange = (event) => {
    setEarningData({
      ...earningData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("ticker", ticker);
    formData.append("earning_date", earning_date);

    try {
      const { data } = await axiosReq.post("/earnings/", formData);
      history.push(`/earnings/${data.id}`);
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
        <Form.Label>Ticker</Form.Label>
        <Form.Control
          type="text"
          name="ticker"
          value={ticker}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.ticker?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Earning date</Form.Label>
        <Form.Control
          type="date"
          name="earning_date"
          value={earning_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.earning_date?.map((message, idx) => (
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
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        {/* Form fields for small and larger screens */}
        <Col sm={10} md={7} lg={6}>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EarningCreateForm;