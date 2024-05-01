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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function StocksPage({ message, filter = "" }) {
  const [stocks, setStocks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/stocks/?${filter}search=${query}&sector=${sector}`
        );
        setStocks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchStocks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, sector]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            aria-label="Search by stock"
            placeholder="Search: stock symbol, company name, user, ...etc"
          />
        </Form>
        <Form.Control
          className="mr-sm-2"
          as="select"
          aria-label="Search by sector"
          placeholder="Sector"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
        >
          <option key="blankChoice" hidden value>
            {" "}
            Sector{" "}
          </option>
          <option>---------</option>
          <option>information technology</option>
          <option>health</option>
          <option>financials</option>
          <option>communication services</option>
          <option>industrials</option>
          <option>consumer staples</option>
          <option>energy</option>
          <option>utilities</option>
          <option>real estate</option>
          <option>materials</option>
        </Form.Control>

        {hasLoaded ? (
          <>
            {stocks.results.length ? (
              <InfiniteScroll
                children={stocks.results.map((stock) => (
                  <Stock key={stock.id} {...stock} setStocks={setStocks} />
                ))}
                dataLength={stocks.results.length}
                loader={<Asset spinner />}
                hasMore={!!stocks.next}
                next={() => fetchMoreData(stocks, setStocks)}
              />
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default StocksPage;
