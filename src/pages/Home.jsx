import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allScreams } from "../redux/actions";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import PropTypes from "prop-types";

const styles = {};

const Home = ({ classes }) => {
  const screams = useSelector((state) => state.screams);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allScreams());
  }, [dispatch]);

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {screams.map((e) => {
          return (
            <div>
              <Scream
                key={e.screamsId}
                userImage={e.userImage}
                userHandle={e.userHandle}
                createdAt={e.createdAt}
                body={e.body}
                likeCount={e.likeCount}
                commentCount={e.commentCount}
                screamId={e.screamsId}
              />
            </div>
          );
        })}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
