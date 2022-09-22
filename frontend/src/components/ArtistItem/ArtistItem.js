import React from 'react';
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

import notImage from '../../assets/image-not-found.png';

const useStyles = makeStyles()(() => ({
  artistBlock: {
    margin: "0 auto 40px"
  },
  artistName: {
    color: "green",
    textDecoration: "underline"
  }
}));

const ArtistItem = ({artist}) => {
  const {classes} = useStyles();

  let image = notImage;

  if (artist.image) {
    image = apiUrl + '/uploads/' + artist.image;
  }

  return (
    <Grid container alignItems="center" className={classes.artistBlock}>
      <Grid item marginRight="40px" component={Link} to={`/artists/${artist._id}`}>
        <img src={image} style={{width: "120px", height: "auto"}} alt={artist.name}/>
      </Grid>
      <Grid item>
        <Typography variant="h4" component={Link} to={`/artists/${artist._id}`} className={classes.artistName}>
          {artist.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ArtistItem;