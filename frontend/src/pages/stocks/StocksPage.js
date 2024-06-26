import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Select from "react-select";

import Stock from "./Stock";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/StocksPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
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

  const currentUser = useCurrentUser();

  // Options for sector selection
  const sectorOptions = [
    { value: "information technology", label: "Information Technology" },
    { value: "health", label: "Health" },
    { value: "financials", label: "Financials" },
    { value: "communication services", label: "Communication Services" },
    { value: "industrials", label: "Industrials" },
    { value: "consumer staples", label: "Consumer Staples" },
    { value: "energy", label: "Energy" },
    { value: "utilities", label: "Utilities" },
    { value: "real estate", label: "Real Estate" },
    { value: "materials", label: "Materials" },
  ];
  
  const [selectedSector, setSelectedSector] = useState(null);

  // Function to handle sector change
  const handleSectorChange = (selectedOption) => {
    setSelectedSector(selectedOption);
    setSector(selectedOption ? selectedOption.value : "");
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/stocks/?${filter}search=${query}&sector=${sector}`
        );
        setStocks(data);
        setHasLoaded(true);
      } catch (err) {
        /* console.log(err); */
      }
    };

    // Setting a timer to prevent too frequent API calls
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchStocks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, sector, currentUser]);

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
            aria-label="Search by stock"
            placeholder="Search by stock symbol, company name, tiltle, user, ...etc"
          />
          <Select
            className={`${styles.SelectSector} Select`}
            options={[{ value: "", label: "All Sectors" }, ...sectorOptions]}
            value={selectedSector}
            onChange={handleSectorChange}
            aria-label="Select sector"
            placeholder="Select sector..."
          />
        </Form>

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
      {/* Right column - visible only on large screens */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p></p>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default StocksPage;
