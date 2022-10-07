import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

import defaultImage from '../../assets/default.jpg';
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(() => ({
  albumBlock: {
    margin: "0 auto 40px",
    position: "relative"
  },
  Unpublished: {
    position: "absolute",
    right: "0",
    top: "0",
    background: "black",
    opacity: "0.3",
    padding: "5px",
    borderRadius: "10px"
  },
  albumName: {
    marginBottom: "12px !important",
    color: "green",
  }
}));

const AlbumItem = ({user, album, loading, onPublishAlbum, onDeleteAlbum}) => {
  const {classes} = useStyles();

  let image = defaultImage;

  if (album.image) {
    image = apiUrl + '/' + album.image;
  }

  return (
    <Grid container className={classes.albumBlock}>
      {
        !album.isPublished &&
        <Box
          className={classes.Unpublished}
        >
          <Typography variant="span" color="white">
            Unpublished
          </Typography>
        </Box>
      }
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
      {
        user && user.role === 'admin' &&
        <Grid item xs={12} paddingY="10px">
          {
            album.isPublished ?
              <ButtonWithProgress
                fullWidth
                variant="contained"
                color="error"
                loading={loading}
                disabled={loading}
                onClick={onDeleteAlbum}
              >
                Delete
              </ButtonWithProgress>
              : <ButtonWithProgress
                fullWidth
                variant="contained"
                color="success"
                loading={loading}
                disabled={loading}
                onClick={onPublishAlbum}
              >
                Publish
              </ButtonWithProgress>
          }
        </Grid>
      }
    </Grid>
  );
};

export default AlbumItem;