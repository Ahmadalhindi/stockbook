import React from "react";
import styles from "../../styles/Stock.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Earning = (props) => {
  const {
    owner,
    profile_id,
    profile_image,
    ticker,
    earning_date,
    updated_at,
    earningPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && earningPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {ticker && <Card.Title className="text-center">Ticker symbol:  {ticker}</Card.Title>}
        {earning_date && <Card.Text>Earning date:  {earning_date}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Earning;