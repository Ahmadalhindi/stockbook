import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Stock from "../stocks/Stock";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileStocks, setProfileStocks] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileStocks }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/stocks/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileStocks(profileStocks);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.stocks_count}</div>
              <div>stocks</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileStocks = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s stocks</p>
      <hr />
      {profileStocks.results.length ? (
        <InfiniteScroll
          children={profileStocks.results.map((stock) => (
            <Stock key={stock.id} {...stock} setStocks={setProfileStocks} />
          ))}
          dataLength={profileStocks.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileStocks.next}
          next={() => fetchMoreData(profileStocks, setProfileStocks)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted any stock yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileStocks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;