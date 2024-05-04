import React from "react";
import styles from "../../styles/Stock.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Earning = (props) => {
  const {
    id,
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
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/earnings/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/earnings/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

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
            {is_owner && earningPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/stocks/${id}`}></Link>
      <Card.Body>
      {ticker && (
        <Card.Title className="text-center">
          <Link to={`/earnings/${id}`}>Ticker: {ticker}</Link>
        </Card.Title>
      )}
      {earning_date && <Card.Text>Earning date: {earning_date}</Card.Text>}
    </Card.Body>
    </Card>
  );
};

export default Earning;