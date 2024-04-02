import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allScreams } from "../redux/actions";
import Scream from "../components/Scream";

const Home = () => {
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
              />
            </div>
          );
        })}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
