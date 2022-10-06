import React from 'react';
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

import defaultImage from '../../assets/default.jpg';

const useStyles = makeStyles()(() => ({
  albumBlock: {
    margin: "0 auto 40px"
  },
  albumName: {
    marginBottom: "12px !important",
    color: "green",
  }
}));

const AlbumItem = ({album}) => {
  const {classes} = useStyles();

  let image = defaultImage;

  if (album.image) {
    image = apiUrl + '/' + album.image;
  }

  return (
    <Grid container className={classes.albumBlock}>
      <Grid item marginRight="40px" component={Link} to={`/albums/${album._id}`}>
        <img src={image} style={{width: "120px", height: "auto"}} alt=''/>
      </Grid>
      <Grid item>
        <Typography variant="h6" className={classes.albumName} component={Link} to={`/albums/${album._id}`}>
          Title: {album.title}
        </Typography>
        <Typography>
          <strong>Release: </strong>
          {album.release}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AlbumItem;