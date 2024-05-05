import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";


import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EarningEditForm() {
  const [errors, setErrors] = useState({});

  const [earningData, setEarningData] = useState({
    ticker: "",
    earning_date: "",
  });
  const { ticker, earning_date } = earningData;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/earnings/${id}/`);
        const {
          ticker,
          earning_date,
          is_owner,
        } = data;

        is_owner
          ? setEarningData({
            ticker,
            earning_date,
            })
          : history.push("/");
      } catch (err) {
        /* console.log(err); */
      }
    };

    handleMount();
  }, [history, id]);

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
        await axiosReq.put(`/earnings/${id}/`, formData);
        history.push(`/earnings/${id}`);
      } catch (err) {
        /* console.log(err); */
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Ticker symbol</Form.Label>
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
        save
      </Button>
    </div>
  );
 
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        {/* Form fields for small and larger screens */}
        <Col sm={10} md={7} lg={6}>
          <Container className="py-2">{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EarningEditForm;