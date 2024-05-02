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
        console.log(earning);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Earning {...earning.results[0]} setEarnings={setEarning} earningPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default EarningPage;