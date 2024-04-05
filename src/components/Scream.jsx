import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import { likeScream, unlikeScream } from "../redux/actions";
import MyButton from "../util/MyButton";
import { useSelector, useDispatch } from "react-redux";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 150,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

const Scream = ({
  userImage,
  userHandle,
  createdAt,
  body,
  classes,
  likeCount,
  commentCount,
  screamId,
}) => {
  const credentials = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  // console.log(
  //   credentials?.likes.find((e) => e.screamId === "mphY55wW3dr9C6jrXuZ"),
  //   "ESTO ES USER"
  // );

  const likedScream = () => {
    if (
      credentials?.likes &&
      credentials?.likes.find((like) => like.screamId === screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const token = localStorage.getItem("FBIdToken");

  const likeScreams = () => {
    dispatch(likeScream(screamId, token));
    window.location.reload();
  };

  const unlikeScreams = () => {
    dispatch(unlikeScream(screamId, token));
    window.location.reload();
  };

  dayjs.extend(relativeTime);

  const likeButton = !token ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScreams}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeScreams}>
      <FavoriteBorderIcon color="primary" />
    </MyButton>
  );

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary">
            {userHandle} {screamId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Like</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    </div>
  );
};

Scream.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Scream);
