import React from 'react';
import {Grid, Typography} from "@mui/material";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const TrackItem = ({user, track, loading, onPlayMusic, index, onDeleteTrack, onPublishTrack}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      maxWidth="sm"
      border="1px solid black"
      borderRadius="20px"
      marginBottom="40px"
      padding="15px"
      onClick={onPlayMusic}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
        border="1px solid black"
        borderRadius="20px"
        padding="15px"
        sx={{cursor: "pointer"}}
        onClick={onPlayMusic}
      >
        <Grid item>
          <Typography variant="h5" marginRight="30px">
            <strong>{index}: </strong>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" marginRight="20px" textTransform="capitalize">
            {track.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography whiteSpace="nowrap">
            <strong>duration: </strong>
            {track.duration}
          </Typography>
        </Grid>
      </Grid>
      {
        user && user.role === 'admin' &&
        <Grid item xs={12} paddingY="20px">
          {
            track.isPublished ?
              <ButtonWithProgress
                fullWidth
                variant="contained"
                color="error"
                loading={loading}
                disabled={loading}
                onClick={onDeleteTrack}
              >
                Delete
              </ButtonWithProgress>
              : <ButtonWithProgress
                fullWidth
                variant="contained"
                color="success"
                loading={loading}
                disabled={loading}
                onClick={onPublishTrack}
              >
                Publish
              </ButtonWithProgress>
          }
        </Grid>
      }
    </Grid>
  );
};

export default TrackItem;