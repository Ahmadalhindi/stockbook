import React from "react";
import styles from "../../styles/Stock.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Stock = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    bulls_count,
    bull_id,
    bears_count,
    bear_id,
    title,
    content,
    company_name,
    symbol,
    sector,
    order,
    order_date,
    order_price,
    quantity,
    image,
    updated_at,
    stockPage,
    setStocks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/stocks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/stocks/${id}/`);
      history.goBack();
    } catch (err) {
      /* console.log(err); */
    }
  };

  const handleBull = async () => {
    try {
      if (bear_id) {
        await axiosRes.delete(`/bears/${bear_id}/`);
        setStocks((prevStocks) => ({
          ...prevStocks,
          results: prevStocks.results.map((stock) => {
            return stock.id === id
              ? { ...stock, bears_count: stock.bears_count - 1, bear_id: null }
              : stock;
          }),
        }));
      }
      const { data } = await axiosRes.post("/bulls/", { stock: id });
      setStocks((prevStocks) => ({
        ...prevStocks,
        results: prevStocks.results.map((stock) => {
          return stock.id === id
            ? { ...stock, bulls_count: stock.bulls_count + 1, bull_id: data.id }
            : stock;
        }),
      }));
    } catch (err) {
      /* console.log(err); */
    }
  };

  const handleUnbull = async () => {
    try {
      await axiosRes.delete(`/bulls/${bull_id}/`);
      setStocks((prevStocks) => ({
        ...prevStocks,
        results: prevStocks.results.map((stock) => {
          return stock.id === id
            ? { ...stock, bulls_count: stock.bulls_count - 1, bull_id: null }
            : stock;
        }),
      }));
    } catch (err) {
      /* console.log(err); */
    }
  };

  const handleBear = async () => {
    try {
      if (bull_id) {
        await axiosRes.delete(`/bulls/${bull_id}/`);
        setStocks((prevStocks) => ({
          ...prevStocks,
          results: prevStocks.results.map((stock) => {
            return stock.id === id
              ? { ...stock, bulls_count: stock.bulls_count - 1, bull_id: null }
              : stock;
          }),
        }));
      }
      const { data } = await axiosRes.post("/bears/", { stock: id });
      setStocks((prevStocks) => ({
        ...prevStocks,
        results: prevStocks.results.map((stock) => {
          return stock.id === id
            ? { ...stock, bears_count: stock.bears_count + 1, bear_id: data.id }
            : stock;
        }),
      }));
    } catch (err) {
      /* console.log(err); */
    }
  };

  const handleUnbear = async () => {
    try {
      await axiosRes.delete(`/bears/${bear_id}/`);
      setStocks((prevStocks) => ({
        ...prevStocks,
        results: prevStocks.results.map((stock) => {
          return stock.id === id
            ? { ...stock, bears_count: stock.bears_count - 1, bear_id: null }
            : stock;
        }),
      }));
    } catch (err) {
      /* console.log(err); */
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
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && stockPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/stocks/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {symbol && <Card.Title className="text-center">{symbol}</Card.Title>}
        {company_name && <Card.Text className="text-center">Company name: {company_name}</Card.Text>}
        {sector && <Card.Text className="text-center">Sector: {sector}</Card.Text>}
        {order && <Card.Text className="text-center">Order: {order}</Card.Text>}
        {order_date && <Card.Text className="text-center">Order date: {order_date}</Card.Text>}
        {order_price && <Card.Text className="text-center">Order price: {order_price}</Card.Text>}
        {quantity && <Card.Text className="text-center">Quantity: {quantity}</Card.Text>}
      </Card.Body>
      <Card.Body>
        {content && <Card.Text className="text-left">Content: {content}</Card.Text>}
      </Card.Body>
      <Card.Body>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't bull your own stocks!</Tooltip>}
            >
              <i className="far fa-circle-up" />
            </OverlayTrigger>
          ) : bull_id ? (
            <span onClick={handleUnbull}>
              <i className={`fas fa-circle-up ${styles.Trend}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleBull}>
              <i className={`far fa-circle-up ${styles.TrendOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to bull stocks!</Tooltip>}
            >
              <i className="far fa-circle-up" />
            </OverlayTrigger>
          )}
          {bulls_count}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't bear your own stocks!</Tooltip>}
            >
              <i className="far fa-circle-down" />
            </OverlayTrigger>
          ) : bear_id ? (
            <span onClick={handleUnbear}>
              <i className={`fas fa-circle-down ${styles.Trend}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleBear}>
              <i className={`far fa-circle-down ${styles.TrendOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to bear stocks!</Tooltip>}
            >
              <i className="far fa-circle-down" />
            </OverlayTrigger>
          )}
          {bears_count}
          <Link to={`/stocks/${id}`}>
            <i className="fa-solid fa-comments-dollar" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Stock;