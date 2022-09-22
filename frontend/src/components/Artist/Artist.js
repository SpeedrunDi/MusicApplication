import React from 'react';
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";

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

const Artist = ({artist}) => {
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
          {artist.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Artist;