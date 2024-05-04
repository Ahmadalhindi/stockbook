import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Earning from "./Earning";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/StocksPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function EarningsPage({ message, filter = "" }) {
  const [earnings, setEarnings] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await axiosReq.get(
          `/earnings/?${filter}search=${query}`
        );
        setEarnings(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEarnings();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p></p>
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
            placeholder="Search:  ticker, user name"
          />
        </Form>

        {hasLoaded ? (
          <>
            {earnings.results.length ? (
              <InfiniteScroll
                children={earnings.results.map((earning) => (
                  <Earning
                    key={earning.id}
                    {...earning}
                    setEarnings={setEarnings}
                  />
                ))}
                dataLength={earnings.results.length}
                loader={<Asset spinner />}
                hasMore={!!earnings.next}
                next={() => fetchMoreData(earnings, setEarnings)}
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
        <p></p>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default EarningsPage;
