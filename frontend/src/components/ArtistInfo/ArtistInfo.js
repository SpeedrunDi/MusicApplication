import React from 'react';
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {Link} from "react-router-dom";

const useStyles = makeStyles()(() => ({
  artistBlock: {
    margin: "0 auto 40px",
    cursor: "pointer"
  },
  artistName: {
    color: "green",
    textDecoration: "underline"
  }
}));

const ArtistInfo = ({artist}) => {
  const {classes} = useStyles();

  return (
    <Grid container alignItems="center" className={classes.artistBlock}>
      {artist.image && (
        <Grid item>
          <img src={artist.image} style={{width: "120px", height: "auto"}} alt={artist.name}/>
        </Grid>
      )}
      <Grid item>
        <Typography variant="h4" className={classes.artistName}>
          <Link to={`/artist/${artist._id}`}>
            {artist.name}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ArtistInfo;