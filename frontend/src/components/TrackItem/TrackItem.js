import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const TrackItem = ({user, track, loading, onPlayMusic, index, onDeleteTrack, onPublishTrack}) => {
  return (
    <Grid
      container
      position="relative"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="sm"
      border="1px solid black"
      borderRadius="20px"
      marginBottom="40px"
      padding="29px"
    >
      {
        !track.isPublished &&
        <Box
          position="absolute"
          right="29px"
          top="0"
          padding="5px"
          borderRadius="10px"
          sx={{background: "black", opacity: "0.3"}}
        >
          <Typography variant="span" color="white">
            Unpublished
          </Typography>
        </Box>
      }
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
        <Grid item xs={12} paddingTop="20px">
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