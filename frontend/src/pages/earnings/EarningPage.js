import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Earning from "./Earning";

function EarningPage() {
  const { id } = useParams();
  const [earning, setEarning] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: earning }] = await Promise.all([
          axiosReq.get(`/earnings/${id}`),
        ]);
        setEarning({ results: [earning] });
      } catch (err) {
        /* console.log(err); */
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="justify-content-center">
      <Col sm={10} md={7} lg={8}>
        <p></p>
        <Earning {...earning.results[0]} setEarnings={setEarning} earningPage />
      </Col>
    </Row>
  );
}

export default EarningPage;
