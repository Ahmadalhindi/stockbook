import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Stock from "./Stock";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/StocksPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function StocksPage({ message, filter = "" }) {
  const [stocks, setStocks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await axiosReq.get(`/stocks/?${filter}`);
        setStocks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchStocks();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {stocks.results.length ? (
              stocks.results.map((stock) => (
                <Stock key={stock.id} {...stock} setStocks={setStocks} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default StocksPage;